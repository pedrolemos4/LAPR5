% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

%Cors
:- set_setting(http:cors, [*]).


:- dynamic novo_jogador/2.
:- dynamic novo_perfil/3.
:- dynamic nova_relacao/3.
:- dynamic no/3.
:- dynamic ligacao/4.

:-ensure_loaded("./AlgoritmoCaminhoSeguro.pl").
:-ensure_loaded("./calcular_tamanho_rede.pl").
:-ensure_loaded("./CaminhoMaisForte.pl").
:-ensure_loaded("./checktags.pl").
:-ensure_loaded("./SugerirConexoesTagsNivel.pl").


:-json_object objeto_json_tags(caminho:list(string)).

% Criacao de servidor HTTP no porto 'Port'
server(Port) :-
    removerBaseConhecimento(),
    carregaDados(),

    http_server(http_dispatch, [port(Port)]).

stop(Port):-
    http_stop_server(Port,_).

% Handlers
:- http_handler('/api/CaminhoMaisForte', caminhoForteHandler, []).
:- http_handler('/api/CheckTags', checkTagsHandler, []).


checkTagsHandler(Request):-
    cors_enable,
    http_parameters(Request,
    [nTags(NTags,[number])]),

    plan_x_tags(NTags,Res),
    format('Content-type: text/plain~n~n'),
    format('~w~n',[Res]).

caminhoForteHandler(Request):-
    cors_enable,
    http_parameters(Request,
        [origId(Orig,[string]),
         destId(Dest,[string])]),
    plan_forte(Orig,Dest,LCaminho),
    format('Content-type: text/plain~n~n'),
    format('~w~n',[LCaminho]).

obter_users_url("https://localhost:5001/api/Jogadores").
obter_perfis_url("https://localhost:5001/api/Perfis").
obter_relacoes_url("https://localhost:5001/api/Relacoes").


adicionaJogadores():-
    carregaJogadores(Data),
    parse_jogadores(Data).

carregaJogadores(Data) :-
    obter_users_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Data),
        close(In)
).

parse_jogadores([]).
parse_jogadores([H|List]):-
    asserta(novo_jogador(H.get(id),H.get(perfilId))),
    parse_jogadores(List).


adicionaPerfis():-
    carregaPerfis(Data),
    parse_perfis(Data).

carregaPerfis(Data) :-
    obter_perfis_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Data),
        close(In)
).

parse_perfis([]).
parse_perfis([H|List]):-
    asserta(novo_perfil(H.get(id),H.get(email),H.get(tags))),
    parse_perfis(List).

adicionaRelacoes():-
    carregaRelacoes(Data),
    parse_relacoes(Data).

carregaRelacoes(Data) :-
    obter_relacoes_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Data),
        close(In)).

parse_relacoes([]).
parse_relacoes([H|List]):-
    asserta(nova_relacao(H.get(jogador1),H.get(jogador2),H.get(forcaLigacao))),
    parse_relacoes(List).


carregaLigacoes([]):- !.
carregaLigacoes([Jogador1|Lista]):-
    nova_relacao(Jogador1,Jogador2,ForcaLigacao1),nova_relacao(Jogador2,Jogador1,ForcaLigacao2),
    asserta(ligacao(Jogador1,Jogador2,ForcaLigacao1,ForcaLigacao2)),carregaLigacoes(Lista).
carregaLigacao([_|Lista]):-carregaLigacoes(Lista).

adicionaLigacoes():- findall(Jogador1,nova_relacao(Jogador1,_,_),Lista),
                        carregaLigacao(Lista).

carrega_no([]):- !.
carrega_no([IdJ|Lista]):-novo_jogador(IdJ,IdP),
    novo_perfil(IdP,Email,Tags),
    asserta(no(IdJ,Email,Tags)),carrega_no(Lista).
carrega_no([_|Lista]):-carregaLigacoes(Lista).

adicionar_no():- findall(Jogador1,novo_jogador(Jogador1,_),Lista),
                        carrega_no(Lista).



carregaDados():-
    adicionaPerfis(),
    adicionaJogadores(),
    adicionar_no(),
    adicionaRelacoes(),
    adicionaLigacoes().


% Remover tudo da Base de Conhecimento
removerBaseConhecimento():-
        retractall(novo_jogador(_,_)),
        retractall(novo_perfil(_,_,_)),
        retractall(nova_relacao(_,_,_)),
        retractall(no(_,_,_)),
        retractall(ligacao(_,_,_,_)).










