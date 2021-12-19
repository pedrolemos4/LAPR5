percorre_niveis(Numero,[],NivelAtual,Nivel, ListUtilizadores,ListaGuardaTodosNiveis, ListaARetornar):-  sort(ListUtilizadores,ListUtilizadores1),append(ListUtilizadores1,ListaGuardaTodosNiveis,ListaRes), sort(ListaRes,ListaRes1),NivelAtual1 is NivelAtual+1, ((NivelAtual1==Nivel,ListaARetornar = ListaRes1,!); percorre_niveis(Numero,ListUtilizadores1,NivelAtual1,Nivel,[],ListaRes1,ListaARetornar)).
percorre_niveis(Numero,[NUtilizador|ListaNivel],NivelAtual,Nivel, ListUtilizadores,ListaGuardaTodosNiveis,ListaARetornar):- findall(NX, ((ligacao(NUtilizador,NX,_,_);ligacao(NX,NUtilizador,_,_)), NX\==Numero), ListUtilizadoresNivel), append(ListUtilizadoresNivel,ListUtilizadores,Lista),
percorre_niveis(Numero,ListaNivel,NivelAtual,Nivel,Lista,ListaGuardaTodosNiveis,ListaARetornar).

:-dynamic ligacao1/4.

% percorre_niveis para ter acesso a uma lista com os utilizadores que fazem parte da rede do utilizador origem
cria_novas_ligacoes(Orig, NivelLimite, ListaUtilizadores):- percorre_niveis(Orig,[Orig],0,NivelLimite,[],[],ListaUtilizadores).

% percorre lista de utilizadores da rede do utilizador origem, incluindo-0
% encontra uma lista de utilizadores com qual um certo utilizador(X) tem ligacao e percorremos essa lista com o predicado percorre_lista_ligacoes_possiveis
percorre_utilizadores([]):- !.
percorre_utilizadores([X|ListaUtilizadores]):- 
    findall(Y,ligacao(X,Y,_,_),LigacoesDeX), percorre_lista_ligacoes_possiveis(X,LigacoesDeX),
    percorre_utilizadores(ListaUtilizadores).

% percorre lista de amigos do utilizador X e faz um asserta de um novo facto(ligacao1)
percorre_lista_ligacoes_possiveis(_,[]):-!.
percorre_lista_ligacoes_possiveis(X,[Y|Lista]):- ligacao(X,Y,FX,FY), asserta(ligacao1(X,Y,FX,FY)), percorre_lista_ligacoes_possiveis(X,Lista).


aStar(Orig,Dest,NivelLimite,Cam,Custo):- 
    cria_novas_ligacoes(Orig, NivelLimite, ListaUtilizadores), percorre_utilizadores([Orig|ListaUtilizadores]),
    lista_forcas([Orig|ListaUtilizadores],[],ListaForcas), ordem_decrescente(ListaForcas,ListaDecrescente), 
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo,ListaDecrescente,NivelLimite), 
    % necessário pois no inicio do predicado criamos o facto ligacao1 e se nao for feito o retractall, irao haver factos repetidos
    retractall(ligacao1(_,_,_,_)).

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_,_):- reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,ListaForcas,NivelLimite):-
LA=[Act|_],length([X|LA],Contador),
findall((CEX,CaX,[X|LA]),
(Dest\==Act, Contador =< NivelLimite + 1,(ligacao1(Act,X,FAct,FX);ligacao1(X,Act,FX,FAct)),\+ member(X,LA),
CaX is FAct + FX + Ca, estimativa([X|LA],ListaForcas,EstX),
CEX is CaX + EstX),Novos),
append(Outros,Novos,Todos),
write('Novos='),write(Novos),nl,
sort(Todos,TodosOrd), reverse(TodosOrd, Final),
write('Final='),write(Final),nl,
aStar2(Dest,Final,Cam,Custo,ListaForcas,NivelLimite).


% lista com todas as forças de ligaçao dos utilizadores na rede do utilizador inicial
lista_forcas([],ListaAuxiliar, ListaForcas):- ListaForcas = ListaAuxiliar.
lista_forcas([X|ListaUtilizadores],Lista, ListaForcas):- 
    findall(Y,ligacao1(X,Y,_,_),LigacoesDeX), percorre_lista_ligacoes_forca(X,LigacoesDeX,Lista,ListaAux), 
    lista_forcas(ListaUtilizadores,ListaAux, ListaForcas).

% acrescenta à Lista todas as somas das forças de ligacao de uma ligacao
percorre_lista_ligacoes_forca(_,[],ListaAuxiliar,Lista):- Lista = ListaAuxiliar.
percorre_lista_ligacoes_forca(X,[Y|ListaUtilizadores],ListaAuxiliar,Lista):- 
    ligacao1(X,Y,FX,FY), Soma is FX + FY, percorre_lista_ligacoes_forca(X,ListaUtilizadores,[Soma|ListaAuxiliar], Lista).

% ordena de forma decrescente uma lista
ordem_decrescente([H|List], Result) :- ordem_decrescente(List, Temp), insert_item(H, Temp, Result).
ordem_decrescente([], []).

insert_item(X, [H|List], [H|Result]) :- H > X, !, insert_item(X, List, Result).
insert_item(X, List, [X|List]).

estimativa(ListaCaminho,ListaForcas,Estimativa):-
length(ListaCaminho,Contador), Diferenca is Contador - 2,
altera_lista_forcas(ListaForcas,Diferenca,ListaFinal),
write('ListaFinal='),write(ListaFinal),nl,
set_estimativa(ListaFinal,Estimativa).

% modifica ListaFinal. Diferenca corresponde a um valor numerico que irá determinar o tamanho da lista Prefix.
% usando o append, a listaForcas já está determinada e Prefix e ListaFinal juntas tem que ser igual a ListaForcas
% desta forma, conseguimos retornar ListaFinal sem x elementos(Diferenca)
altera_lista_forcas(ListaForcas,Diferenca,ListaFinal):- length(Prefix, Diferenca), append(Prefix, ListaFinal, ListaForcas).

% estimativa é igual ao numero que se encontra na 1ª posicao da lista, que equivale ao maior valor da lista uma vez que esta está ordenada de forma decrescente
set_estimativa([X|_],Estimativa):- Estimativa is X.