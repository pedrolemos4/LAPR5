% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).

% Relacao entre pedidos HTTP e predicados que os processam
:- http_handler('/lapr5', responde_ola, []).
:- http_handler('/register_user', register_user, []).
:- http_handler('/send_file_post', send_file_post, []).
%:- http_handler('/api/Jogadores', getJogadores, []).
%:- http_handler('/api/Perfis', getPerfis, []).

:- dynamic novo_jogador/2.
:- dynamic novo_perfil/3.
:- dynamic nova_relacao/3.
:- dynamic no/3.
:- dynamic ligacao/4.

% Criacao de servidor HTTP no porto 'Port'
server(Port) :-
        http_server(http_dispatch, [port(Port)]).

% Tratamento de 'http://localhost:5000/lapr5'
responde_ola(_Request) :-
        format('Content-type: text/plain~n~n'),
        format('Olá LAPR5!~n').

% MÉTODO GET: Tratamento de 'http://localhost:5000/register_user?name='José'&sex=male&birth_year=1975'
% ou http_client:http_get('http://localhost:5000/register_user?name=\'José\'&sex=male&birth_year=1975',X,[]).

% MÉTODO POST
% http_client:http_post('http://localhost:5000/register_user', form_data([name='José', sex=male, birth_year=1975]), Reply, []).
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



 %MÉTODO POST enviando um ficheiro de texto
 %http_client:http_post('http://localhost:5000/send_file_post', form_data([file=file('./teste.txt')]), Reply, []).

%comentar ou descomentar send_file_post?
send_file_post(Request) :-
http_parameters(Request,[ file(X,[])]),
    format('Content-type: text/plain~n~n'),
    format('Received: ~w~n',[X]).
