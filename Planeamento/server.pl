% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).

% Relacao entre pedidos HTTP e predicados que os processam
%:- http_handler('/api/Jogadores', getJogadores, []).
%:- http_handler('/api/Perfis', getPerfis, []).

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

%Cors
:- set_setting(http:cors, [*]).

% Criacao de servidor HTTP no porto 'Port'
server(Port) :-
        http_server(http_dispatch, [port(Port)]).

stop(Port):- http_stop_server(Port,_).

% Handlers
%:- http_handler('/api/AlgoritmoCaminhoSeguro', algoritmoSeguroHandler, []).
%:- http_handler('/api/CalcularTamanhoRede', calcularRedeHandler, []).
:- http_handler('/api/CaminhoMaisForte', caminhoForteHandler, []).
:- http_handler('/api/CheckTags', checkTagsHandler, []).
%:- http_handler('/api/SugerirConexoesTagsNivel', conexoesNivelHandler, []).

%algoritmoSeguroHandler(Request):-
%    cors_enable,
%    removerBaseConhecimento(),
%    carregaDados(),
%    http_parameters(Request,
%        [origId(Orig,[string]),
%         destId(Dest,[string]),
%         minLigacao(MinLigacao,[integer,between(0,100)])] ),

%    plan_seguro(Orig,Dest,LCaminho,Forca),
%    Reply=caminho_seguro_user_json(LCaminho,Forca),
%    prolog_to_json(Reply, JSONObject),
%    reply_json(JSONObject,[json_object]).

%calcularRedeHandler(Request):-
%    cors_enable,
%    removerBaseConhecimento(),
%    carregaDados(),
%    http_parameters(Request,
%        [origId(Orig,[string]),
%         destId(Dest,[string]),
%         minLigacao(MinLigacao,[integer,between(0,100)])] ),


%   caminho_seguro_unidirecional(Orig,Dest,MinLigacao,LCaminho,Forca),
%    Reply=caminho_seguro_user_json(LCaminho,Forca),
%    prolog_to_json(Reply, JSONObject),
%    reply_json(JSONObject,[json_object]).

checkTagsHandler(Request):-
    cors_enable(Request, [methods([get])]),
    removerBaseConhecimento(),
    carregaDados(),
    http_parameters(Request,
        [nTags(NTags,[string])]),

    plan_x_tags(NTags,Res),
    %Reply=caminho_seguro_user_json(LCaminho,Forca),
    prolog_to_json(Res, JSONObject),
    reply_json(JSONObject,[json_object]).

caminhoForteHandler(Request):-
    cors_enable(Request, [methods([get])]),
    removerBaseConhecimento(),
    carregaDados(),
    http_parameters(Request,
        [origId(Orig,[string]),
         destId(Dest,[string])]),


    plan_forte(Orig,Dest,LCaminho),
    prolog_to_json(LCaminho, JSONObject),
    reply_json(JSONObject,[json_object]).

%conexoesNivelHandler(Request):-
%    cors_enable,
%    removerBaseConhecimento(),
%    carregaDados(),
%    http_parameters(Request,
%        [origId(Orig,[string]),
%         destId(Dest,[string]),
%         minLigacao(MinLigacao,[integer,between(0,100)])] ),


%    caminho_seguro_unidirecional(Orig,Dest,MinLigacao,LCaminho,Forca),
%    Reply=caminho_seguro_user_json(LCaminho,Forca),
%    prolog_to_json(Reply, JSONObject),
%    reply_json(JSONObject,[json_object]).


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

carregaDados():-
    adicionaPerfis(),
    adicionaJogadores(),
    adicionaRelacoes(),
    adicionaLigacoes().


% Remover tudo da Base de Conhecimento
removerBaseConhecimento():-
        retractall(novo_jogador(_,_)),
        retractall(novo_perfil(_,_,_)),
        retractall(nova_relacao(_,_,_)),
        retractall(no(_,_,_)),
        retractall(ligacao(_,_,_,_)).
