bestfs1(Orig,Dest,Cam,Custo,Ligacoes):-
	bestfs12(Dest,[[Orig]],Cam,Custo,Ligacoes),!,
	write('Caminho='),write(Cam),nl.

bestfs12(Dest,[[Dest|T]|_],Cam,Custo,Ligacoes):-
	reverse([Dest|T],Cam),
	calcula_custo(Cam,Custo,Ligacoes).

bestfs12(Dest,[[Dest|_]|LLA2],Cam,Custo,Ligacoes):-
	!,
	bestfs12(Dest,LLA2,Cam,Custo,Ligacoes).


bestfs12(Dest,LLA,Cam,Custo,Ligacoes):-
	member1(LA,LLA,LLA1),
	LA=[Act|_],
	((Act==Dest,!,bestfs12(Dest,[LA|LLA1],Cam,Custo,Ligacoes))
	 ;
	 (
	  findall((C,[X|LA]),(ligacao(Act,X,FL1,FL2,FR1,FR2),C is (FL1+FL2)/2 + (FR1+FR2)/2,
	  \+member(X,LA)),Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  bestfs12(Dest,LLA2,Cam,Custo,Ligacoes)
	 )).

member1(LA,[LA|LAA],LAA).
member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

retira_custos([],[]).
retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

calcula_custo([Act,X],C,Ligacoes):-!,Ligacoes>0,ligacao(Act,X,FL1,FL2,FR1,FR2),FLM is (FL1+FL2)/2,FRT is (FR1+FR2)/2,
	FRT>=0,FRT<201,C is (FLM/2)+(25+(FRT/8)).
calcula_custo([Act,X],C,Ligacoes):-!,Ligacoes>0,ligacao(Act,X,FL1,FL2,FR1,FR2),FLM is (FL1+FL2)/2,FRT is (FR1+FR2)/2,
	FRT>(-201),C is (FLM/2)+(25-(abs(FRT)/8)).

calcula_custo([Act,X|L],S,Ligacoes):-Ligacoes1 is Ligacoes-1,calcula_custo([X|L],S1,Ligacoes1),ligacao(Act,X,FL1,FL2,FR1,FR2),
	FLM is (FL1+FL2)/2,FRT is (FR1+FR2)/2,FRT>0,FRT<201,S is S1+(FLM/2)+(25+(FRT/8)).
calcula_custo([Act,X|L],S,Ligacoes):-Ligacoes1 is Ligacoes-1,calcula_custo([X|L],S1,Ligacoes1),ligacao(Act,X,FL1,FL2,FR1,FR2),
	FLM is (FL1+FL2)/2,FRT is (FR1+FR2)/2,FRT>(-201),S is S1+(FLM/2)+(25-(abs(FRT)/8)).
	