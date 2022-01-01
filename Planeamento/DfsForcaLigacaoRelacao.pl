:-dynamic melhor_sol_forte/2.


dfs_forteLR(Orig,Dest,Cam,S,NivelLimite):-dfs2LR(Orig,Dest,[Orig],Cam,S,0,NivelLimite).
dfs2LR(Dest,Dest,LA,Cam,S,S1,_):-!,reverse(LA,Cam),S is S1.
dfs2LR(Act,Dest,LA,Cam,S,Sfinal,NivelLimite):-no(NAct,Act,_),(ligacao(NAct,NX,FAct,FX,RX,RY);ligacao(NX,NAct,FX,FAct,RX,RY)),
converterLigacao(FX,FAct,F1), converterRelacao(RX,RY,R1),Sfinal1 is Sfinal +(F1 + R1)/2,
no(NX,X,_),\+ member(X,LA), length([X|LA],Contador), Contador =< NivelLimite + 1, dfs2(X,Dest,[X|LA],Cam,S,Sfinal1,NivelLimite).


plan_forteLR(Orig,Dest,NivelLimite,LCaminho):-
(caminho_mais_forteLR(Orig,Dest,NivelLimite);true),
retract(melhor_sol_forte(LCaminho,_)).

caminho_mais_forteLR(Orig,Dest,NivelLimite):-
asserta(melhor_sol_forte(_,0)),
dfs_forte(Orig,Dest,LCaminho,Soma,NivelLimite),
atualiza_caminho_forteLR(LCaminho,Soma),
fail.

atualiza_caminho_forteLR(LCaminho,SomaFinal):-
melhor_sol_forte(_,N),
SomaFinal > N,
retract(melhor_sol_forte(_,_)),
asserta(melhor_sol_forte(LCaminho,SomaFinal)).

/*converterLigacao(RX,RY,F):- F is RX + RY.
converterRelacao(FX,FY,F):- Aux is FX + FY + 200, F is (Aux*100)/400.


no(1,ana,[tag,musica,jogos,teatro]).
no(2,joana,[natureza,jogos,teatro]).
no(3,joao,[pintura,jogos,teatro]).
no(4,pedro,[cinema,teatro]).
no(5,jose,[carros,moda,teatro]).
no(6,rui,[tag,cores,moda]).

ligacao(1,2,10,12,4,5).
ligacao(1,3,30,10,4,4).
ligacao(2,4,11,11,5,5).
ligacao(3,5,10,11,55,5).
ligacao(6,5,14,10,25,2).
*/
