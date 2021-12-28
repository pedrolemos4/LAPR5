:-dynamic melhor_sol_forte/2.


dfs_forte(Orig,Dest,Cam,S,NivelLimite):-dfs2(Orig,Dest,[Orig],Cam,S,0,NivelLimite).
dfs2(Dest,Dest,LA,Cam,S,S1,_):-!,reverse(LA,Cam),S is S1.
dfs2(Act,Dest,LA,Cam,S,Sfinal,NivelLimite):-no(NAct,Act,_),(ligacao(NAct,NX,S1,S2,_,_);ligacao(NX,NAct,S1,S2,_,_)), Sfinal1 is Sfinal+S1+S2,
no(NX,X,_),\+ member(X,LA), length([X|LA],Contador), Contador =< NivelLimite + 1, dfs2(X,Dest,[X|LA],Cam,S,Sfinal1,NivelLimite).


plan_forte(Orig,Dest,NivelLimite,LCaminho):-
(caminho_mais_forte(Orig,Dest,NivelLimite);true),
retract(melhor_sol_forte(LCaminho,_)).

caminho_mais_forte(Orig,Dest,NivelLimite):-
asserta(melhor_sol_forte(_,0)),
dfs_forte(Orig,Dest,LCaminho,Soma,NivelLimite),
atualiza_caminho_forte(LCaminho,Soma),
fail.

atualiza_caminho_forte(LCaminho,SomaFinal):-
melhor_sol_forte(_,N),
SomaFinal > N,
retract(melhor_sol_forte(_,_)),
asserta(melhor_sol_forte(LCaminho,SomaFinal)).