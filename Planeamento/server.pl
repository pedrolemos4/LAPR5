% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_ssl_plugin)).

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
:-ensure_loaded("./calcularTamanhoRede.pl").
:-ensure_loaded("./CaminhoMaisForte.pl").
:-ensure_loaded("./checktags.pl").
:-ensure_loaded("./SugerirConexoesTagsNivel.pl").
:-ensure_loaded("./FortalezaRede.pl").
:-ensure_loaded("./CaminhoMaisCurto.pl").


:-json_object objeto_json_tags(caminho:list(string)).
:-json_object objeto_json_rede(resultado:number).
:-json_object objeto_json_seguro(caminho_seguro:list(string)).
:-json_object objeto_json_fortaleza(resultado:number).

% Criacao de servidor HTTP no porto 'Port'
server(Port) :-
    http_server(http_dispatch, [port(Port),
				ssl([certificate_file('C:/Users/admin_Lapr5/21s5_di_52/Planeamento/socialaicert.crt'),
                                key_file('C:/Users/admin_Lapr5/21s5_di_52/Planeamento/socialaikey.key')])]).

stop(Port):-
    http_stop_server(Port,_).


% Handlers
:- http_handler('/api/CaminhoMaisForte', caminhoForteHandler, []).
:- http_handler('/api/CaminhoMaisCurto', caminhoCurtoHandler, []).
:- http_handler('/api/CheckTags', checkTagsHandler, []).
:- http_handler('/api/CalcularTamanhoRede', tamRedeHandler, []).
:- http_handler('/api/CaminhoMaisSeguro', caminhoSeguroHandler, []).
:- http_handler('/api/SugerirConexoes', sugerirConexoesHandler,[]).
:- http_handler('/api/FortalezaRede', fortalezaRedeHandler,[]).

sugerirConexoesHandler(Request):-
    cors_enable,
    removerBaseConhecimento(),!,
    carregaDados(),!,
    http_parameters(Request,
    [idNo(IdNo,[string]),
     nivel(N,[number])]),

    lista_utilizadores_com_tags_conexoes(IdNo,N,ListaFinal),
    Reply = objeto_json_tags(ListaFinal),
    prolog_to_json(Reply,JSONObject),
    reply_json(JSONObject,[json_object]).

checkTagsHandler(Request):-
    cors_enable,
    removerBaseConhecimento(),!,
    carregaDados(),!,
    http_parameters(Request,
    [nTags(NTags,[number])]),

    plan_x_tags(NTags,Res),
    Reply = objeto_json_tags(Res),
    prolog_to_json(Reply,JSONObject),
    reply_json(JSONObject,[json_object]).

caminhoForteHandler(Request):-
    cors_enable,
    removerBaseConhecimento(),!,
    carregaDados(),!,

    http_parameters(Request,
        [origId(Orig,[string]),
         destId(Dest,[string])]),
    plan_forte(Orig,Dest,LCaminho),
    Reply = objeto_json_tags(LCaminho),
    prolog_to_json(Reply,JSONObject),
    reply_json(JSONObject,[json_object]).

caminhoCurtoHandler(Request):-
    cors_enable,
    removerBaseConhecimento(),!,
    carregaDados(),!,

    http_parameters(Request,
        [origId(Orig,[string]),
         destId(Dest,[string])]),
    plan_minlig(Orig,Dest,LCaminho),
    Reply = objeto_json_tags(LCaminho),
    prolog_to_json(Reply,JSONObject),
    reply_json(JSONObject,[json_object]).


tamRedeHandler(Request):-
    cors_enable,
    removerBaseConhecimento(),!,
    carregaDados(),!,
    http_parameters(Request,
        [idJog(IdJogador,[string]),
         nivel(Nivel,[number])]),
    rede(IdJogador,Nivel,Tam),
    Reply = objeto_json_rede(Tam),
    prolog_to_json(Reply,JSONObject),
    reply_json(JSONObject,[json_object]).

caminhoSeguroHandler(Request):-
    cors_enable,
    removerBaseConhecimento(),!,
    carregaDados(),!,
    http_parameters(Request,
        [idOrig(IdOrig,[string]),
         idDest(IdDest,[string]),
         forcaMinima(Forca,[number])]),
    plan_seguro(IdOrig,IdDest,Caminho,Forca),
    Reply = objeto_json_seguro(Caminho),
    prolog_to_json(Reply,JSONObject),
    reply_json(JSONObject,[json_object]).

fortalezaRedeHandler(Request):-
    cors_enable,
    removerBaseConhecimento(),!,
    carregaDados(),!,
    http_parameters(Request,
        [numero(Numero,[string])]),
    fortaleza(Numero,SomaForcas),
    Reply = objeto_json_fortaleza(SomaForcas),
    prolog_to_json(Reply,JSONObject),
    reply_json(JSONObject,[json_object]).

obter_users_url("https://backendlapr5.azurewebsites.net/api/jogadores").
obter_perfis_url("https://backendlapr5.azurewebsites.net/api/perfis").
obter_relacoes_url("https://backendlapr5.azurewebsites.net/api/relacoes").



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
                        percorre_utilizadores(Lista).

percorre_utilizadores([]):- !.
percorre_utilizadores([X|ListaUtilizadores]):-
    findall(Y,nova_relacao(X,Y,_),LigacoesDeX), percorre_lista_ligacoes_possiveis(X,LigacoesDeX),
    percorre_utilizadores(ListaUtilizadores).

% percorre lista de amigos do utilizador X e faz um asserta de um novo facto(ligacao1)
percorre_lista_ligacoes_possiveis(_,[]):-!.
percorre_lista_ligacoes_possiveis(X,[Y|Lista]):- nova_relacao(X,Y,F1), nova_relacao(Y,X,F2),asserta(ligacao(X,Y,F1,F2)), percorre_lista_ligacoes_possiveis(X,Lista).


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
