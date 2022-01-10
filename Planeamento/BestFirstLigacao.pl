percorre_niveisBFL(Numero,[],NivelAtual,Nivel, ListUtilizadores,ListaGuardaTodosNiveis, ListaARetornar):-  sort(ListUtilizadores,ListUtilizadores1),append(ListUtilizadores1,ListaGuardaTodosNiveis,ListaRes), sort(ListaRes,ListaRes1),NivelAtual1 is NivelAtual+1, ((NivelAtual1==Nivel,ListaARetornar = ListaRes1,!); percorre_niveisBFL(Numero,ListUtilizadores1,NivelAtual1,Nivel,[],ListaRes1,ListaARetornar)).

percorre_niveisBFL(Numero,[NUtilizador|ListaNivel],NivelAtual,Nivel, ListUtilizadores,ListaGuardaTodosNiveis,ListaARetornar):- findall(NX, ((ligacao(NUtilizador,NX,_,_,_,_);ligacao(NX,NUtilizador,_,_,_,_)), NX\==Numero), ListUtilizadoresNivel), append(ListUtilizadoresNivel,ListUtilizadores,Lista),
percorre_niveisBFL(Numero,ListaNivel,NivelAtual,Nivel,Lista,ListaGuardaTodosNiveis,ListaARetornar).

:-dynamic ligacao1/6.

% percorre_niveis para ter acesso a uma lista com os utilizadores que fazem parte da rede do utilizador origem
cria_novas_ligacoesBFL(Orig, NivelLimite, ListaUtilizadores):- percorre_niveisBFL(Orig,[Orig],0,NivelLimite,[],[],ListaUtilizadores).

% percorre lista de utilizadores da rede do utilizador origem, incluindo-0
% encontra uma lista de utilizadores com qual um certo utilizador(X) tem ligacao e percorremos essa lista com o predicado percorre_lista_ligacoes_possiveis
percorre_utilizadoresBFL([]):- !.
percorre_utilizadoresBFL([X|ListaUtilizadores]):-
    findall(Y,ligacao(X,Y,_,_,_,_),LigacoesDeX), percorre_lista_ligacoes_possiveisBFL(X,LigacoesDeX),
    percorre_utilizadoresBFL(ListaUtilizadores).

% percorre lista de amigos do utilizador X e faz um asserta de um novo facto(ligacao1)
percorre_lista_ligacoes_possiveisBFL(_,[]):-!.
percorre_lista_ligacoes_possiveisBFL(X,[Y|Lista]):- ligacao(X,Y,FX,FY,_,_), asserta(ligacao1(X,Y,FX,FY,_,_)), percorre_lista_ligacoes_possiveisBFL(X,Lista).


bestfsLig(Orig,Dest,NivelLimite,Cam,Custo):-
        cria_novas_ligacoesBFL(Orig, NivelLimite, ListaUtilizadores), percorre_utilizadoresBFL([Orig|ListaUtilizadores]),
        bestfs12Lig(Dest,[[Orig]],Cam,Custo,NivelLimite),
        retractall(ligacao1(_,_,_,_,_,_)).

bestfs12Lig(Dest,[[Dest|T]|_],Cam,Custo,_):-
	reverse([Dest|T],Cam),
	calcula_custoLig(Cam,Custo).

bestfs12Lig(Dest,[[Dest|_]|LLA2],Cam,Custo,NivelLimite):-
	!,
	bestfs12Lig(Dest,LLA2,Cam,Custo,NivelLimite).


bestfs12Lig(Dest,LLA,Cam,Custo,NivelLimite):-
	member1Lig(LA,LLA,LLA1),
	LA=[Act|_],length([X|LA],Contador),
	((Act==Dest,!,bestfs12Lig(Dest,[LA|LLA1],Cam,Custo,NivelLimite))
	 ;
	 (
	  findall((CX,[X|LA]),(Contador =< NivelLimite +1,(ligacao1(Act,X,FAct,FX,_,_);ligacao1(X,Act,FX,FAct,_,_)),
	  \+member(X,LA),CX is FAct + FX),Novos)),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custosLig(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  %write('LLA2='),write(LLA2),nl,
	  bestfs12Lig(Dest,LLA2,Cam,Custo,NivelLimite)
	 ).

member1Lig(LA,[LA|LAA],LAA).
member1Lig(LA,[_|LAA],LAA1):-member1Lig(LA,LAA,LAA1).

retira_custosLig([],[]).
retira_custosLig([(_,LA)|L],[LA|L1]):-retira_custosLig(L,L1).

calcula_custoLig([Act,X],C):-!,(ligacao1(Act,X,FAct,FX,_,_);ligacao1(X,Act,FX,FAct,_,_)),C is FAct + FX.
calcula_custoLig([Act,X|L],S):-calcula_custoLig([X|L],S1),
					(ligacao1(Act,X,C,F,_,_);ligacao1(X,Act,F,C,_,_)),S is S1+C+F.




/*no(1,ana,[tag,musica,jogos,teatro]).
no(2,joana,[natureza,jogos,teatro]).
no(3,joao,[pintura,jogos,teatro]).
no(4,pedro,[cinema,teatro]).
no(5,jose,[carros,moda,teatro]).
no(6,rui,[tag,cores,moda]).

ligacao(1,2,10,12,4,5).
ligacao(1,3,30,10,4,4).
ligacao(2,4,11,11,5,5).
ligacao(3,5,10,11,55,5).
ligacao(6,5,14,10,25,2).*/


