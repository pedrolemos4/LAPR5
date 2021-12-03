% Bibliotecas HTTP
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).
:- use_module(library(date)).
:- use_module(library(random)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


%% Nossos modules

:-ensure_loaded("./AlgoritmoCaminhoSeguro.pl").
:-ensure_loaded("./CalcularTamanhoRede.pl").
:-ensure_loaded("./checktags.pl").
:-ensure_loaded("./SugerirConexoesTagsNivel.pl").



% Objectos Json a receber no prolog
:- json_object caminho_seguro_user_json(caminho:list(string),forcaResultante:integer).




%% Base Conhecimento principal

:- dynamic no/3.
:- dynamic ligacao/4.



% Gerir servidor
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).


%Cors
:- set_setting(http:cors, [*]).



%Porta default para o server
default_server_port(4200).

%url da API

obter_players_url("https://localhost:5001/api/Jogadores").
obter_perfis_url("https://localhost:5001/api/Perfis").
obter_ligacoes_url("https://localhost:5001/api/Relacoes").

addClients():-
    obterJogadores(DataJogadores),
	obterPerfis(DataPerfis),
    parse_users(DataJogadores,DataPerfis,DataPerfis).

%% Obter users Registados (Data nao convertida)

obterJogadores(DataJogadores):-
    obter_players_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, DataJogadores),
        close(In)
).

obterPerfis(DataPerfis):-
	obter_perfis_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, DataPerfis),
        close(In)
).

%% Convertes Json de todos Users em Lista

parse_users([],_,_).
parse_users([H|ListJogadores], [P|_],ListaAux):- H.get(Perfil) == P.get(Id),
    asserta(no(H.get(id),P.get(email),P.get(tags))),
    parse_users(ListJogadores,ListaAux,ListaAux).
parse_users([H|ListJogadores], [_|ListaPerfis],ListaAux):- parse_users([H|ListJogadores],ListaPerfis, ListaAux).


%% Colocar as ligacoes da api dinamicamente no prolog
adicionarLigacoes():-
    obterLigacoes(Data),
    parse_ligacoes(Data).


obterLigacoes(Data):-
    obter_ligacoes_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [ cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Data),
        close(In)
).

parse_ligacoes([]).
parse_ligacoes([H|List]):-
    asserta(ligacao(H.get(oUser),H.get(dUser),H.get(connectionStrengthOUser),H.get(connectionStrengthDUser))),
    parse_ligacoes(List).


% Remover dados do sistema

removerBaseConhecimento():-
        retractall(no(_,_,_)),
        retractall(ligacao(_,_,_,_)).


% Handlers
:- http_handler('/api/arroz', obter_caminho_seguro_unidirecional_handler, []).
:- http_handler('/api/caminhoSeguroBidirecional', obter_caminho_seguro_bidirecional_handler, []).

obter_caminho_seguro_unidirecional_handler(_):-
    format('Content-type: text/plain~n~n'),
		format('Olá LAPR5!~n'),
	        prolog_to_json('Olá LAPR5!~n',JSONObject),
		reply_json(JSONObject, [json_object(dict)]).
    %cors_enable,
    %removerBaseConhecimento(),
    %carregar_dados_sistema(),
    %http_parameters(Request,
    %    [origId(Orig,[string]),
    %     destId(Dest,[string]),
    %     minLigacao(MinLigacao,[integer,between(0,100)])] ),
%
%
%    caminho_seguro_unidirecional(Orig,Dest,MinLigacao,LCaminho,Forca),
%    Reply=caminho_seguro_user_json(LCaminho,Forca),
%    prolog_to_json(Reply, JSONObject),
%    reply_json(JSONObject,[json_object]).

obter_caminho_seguro_bidirecional_handler(Request):-
    cors_enable,
    removerBaseConhecimento(),
    carregar_dados_sistema(),
    http_parameters(Request,
        [origId(Orig,[string]),
         destId(Dest,[string]),
         minLigacao(MinLigacao,[integer,between(0,100)])] ),

    caminho_seguro_bidirecional(Orig,Dest,MinLigacao,LCaminho,Forca),
    Reply=caminho_seguro_user_json(LCaminho,Forca),
    prolog_to_json(Reply, JSONObject),
    reply_json(JSONObject,[json_object]).



%MÃ©todos que carregam os dados para sistema
carregar_dados_sistema():-
    addClients(),
    adicionarLigacoes().

inicializar_server:-
    default_server_port(Port),
    startServer(Port),!,
    carregar_dados_sistema(),!.

:- inicializar_server.
