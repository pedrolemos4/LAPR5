percorre_niveis(Numero,[],NivelAtual,Nivel, ListUtilizadores,ListaGuardaTodosNiveis, ListaARetornar):-  sort(ListUtilizadores,ListUtilizadores1),append(ListUtilizadores1,ListaGuardaTodosNiveis,ListaRes), sort(ListaRes,ListaRes1),NivelAtual1 is NivelAtual+1, ((NivelAtual1==Nivel,ListaARetornar = ListaRes1,!); percorre_niveis(Numero,ListUtilizadores1,NivelAtual1,Nivel,[],ListaRes1,ListaARetornar)).
percorre_niveis(Numero,[NUtilizador|ListaNivel],NivelAtual,Nivel, ListUtilizadores,ListaGuardaTodosNiveis,ListaARetornar):- findall(NX, ((ligacao(NUtilizador,NX,_,_,_,_);ligacao(NX,NUtilizador,_,_,_,_)), NX\==Numero), ListUtilizadoresNivel), append(ListUtilizadoresNivel,ListUtilizadores,Lista),
percorre_niveis(Numero,ListaNivel,NivelAtual,Nivel,Lista,ListaGuardaTodosNiveis,ListaARetornar).

:-dynamic ligacao1/6.

% percorre_niveis para ter acesso a uma lista com os utilizadores que fazem parte da rede do utilizador origem
cria_novas_ligacoesBFL(Orig, NivelLimite, ListaUtilizadores):- percorre_niveis(Orig,[Orig],0,NivelLimite,[],[],ListaUtilizadores).

% percorre lista de utilizadores da rede do utilizador origem, incluindo-0
% encontra uma lista de utilizadores com qual um certo utilizador(X) tem ligacao e percorremos essa lista com o predicado percorre_lista_ligacoes_possiveis
percorre_utilizadoresBFL([]):- !.
percorre_utilizadoresBFL([X|ListaUtilizadores]):-
    findall(Y,ligacao(X,Y,_,_,_,_),LigacoesDeX), percorre_lista_ligacoes_possiveisBFL(X,LigacoesDeX),
    percorre_utilizadores(ListaUtilizadores).

% percorre lista de amigos do utilizador X e faz um asserta de um novo facto(ligacao1)
percorre_lista_ligacoes_possiveisBFL(_,[]):-!.
percorre_lista_ligacoes_possiveisBFL(X,[Y|Lista]):- ligacao(X,Y,FX,FY,_,_), asserta(ligacao1(X,Y,FX,FY,_,_)), percorre_lista_ligacoes_possiveisBFL(X,Lista).


bestfsLig(Orig,Dest,NivelLimite,Cam,Custo,Op):-
        cria_novas_ligacoesBFL(Orig, NivelLimite, ListaUtilizadores), percorre_utilizadoresBFL([Orig|ListaUtilizadores]),
        bestfs12Lig(Dest,[[Orig]],Cam,Custo,NivelLimite,Op),
        retractall(ligacao1(_,_,_,_,_,_)).

bestfs12Lig(Dest,[[Dest|T]|_],Cam,Custo,_,Op):-
	reverse([Dest|T],Cam),
	calcula_custoLig(Cam,Custo,Op).

bestfs12Lig(Dest,[[Dest|_]|LLA2],Cam,Custo,NivelLimite,Op):-
	!,
	bestfs12Lig(Dest,LLA2,Cam,Custo,NivelLimite,Op).


bestfs12Lig(Dest,LLA,Cam,Custo,NivelLimite,Op):-
	member1Lig(LA,LLA,LLA1),
	LA=[Act|_],length([X|LA],Contador),
	((Act==Dest,!,bestfs12Lig(Dest,[LA|LLA1],Cam,Custo,NivelLimite,Op))
	 ;
	 (
	  findall((CX,[X|LA]),(Contador =< NivelLimite +1,(ligacao1(Act,X,FAct,FX,_,_);ligacao1(X,Act,FX,FAct,_,_)),
	  \+member(X,LA),CX is FAct + FX),Novos)),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custosLig(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  %write('LLA2='),write(LLA2),nl,
	  bestfs12Lig(Dest,LLA2,Cam,Custo,NivelLimite,Op)
	 ).

member1Lig(LA,[LA|LAA],LAA).
member1Lig(LA,[_|LAA],LAA1):-member1Lig(LA,LAA,LAA1).

retira_custosLig([],[]).
retira_custosLig([(_,LA)|L],[LA|L1]):-retira_custosLig(L,L1).

calcula_custoLig([Act,X],C,Op):-Op==1,no(X,_,_,_,Angustia1,_,Medo1,_,Dececao1,_,Remorsos1,_,Raiva1),
    no(X,_,_,_,Angustia2,_,Medo2,_,Dececao2,_,Remorsos2,_,Raiva2),
    \+((Angustia1>0.5;Medo1>0.5;Dececao1>0.5;Remorsos1>0.5;Raiva1>0.5);(Angustia2>0.5;Medo2>0.5;Dececao2>0.5;Remorsos2>0.5;Raiva2>0.5)),
    (ligacao1(Act,X,FAct,FX,_,_);ligacao1(X,Act,FX,FAct,_,_)),C is FAct + FX.
calcula_custoLig([Act,X],C,Op):-Op==2,(ligacao1(Act,X,FAct,FX,_,_);ligacao1(X,Act,FX,FAct,_,_)),C is FAct + FX.

calcula_custoLig([Act,X|L],S,Op):-calcula_custoLig([X|L],S1,Op),Op==1,no(X,_,_,_,Angustia1,_,Medo1,_,Dececao1,_,Remorsos1,_,Raiva1),
    no(X,_,_,_,Angustia2,_,Medo2,_,Dececao2,_,Remorsos2,_,Raiva2),
    \+((Angustia1>0.5;Medo1>0.5;Dececao1>0.5;Remorsos1>0.5;Raiva1>0.5);(Angustia2>0.5;Medo2>0.5;Dececao2>0.5;Remorsos2>0.5;Raiva2>0.5)),
    (ligacao1(Act,X,C,F,_,_);ligacao1(X,Act,F,C,_,_)),S is S1+C+F.
calcula_custoLig([Act,X|L],S,Op):-calcula_custoLig([X|L],S1,Op),Op==2,(ligacao1(Act,X,C,F,_,_);ligacao1(X,Act,F,C,_,_)),S is S1+C+F.
