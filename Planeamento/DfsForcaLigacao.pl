:-dynamic melhor_sol_forte_ligacao/2.

dfs_forte_ligacao(Orig,Dest,Cam,S,NivelLimite,Op):-dfs2Ligacao(Orig,Dest,[Orig],Cam,S,0,NivelLimite,Op).
dfs2Ligacao(Dest,Dest,LA,Cam,S,S1,_,_):-!,reverse(LA,Cam),S is S1.
dfs2Ligacao(Act,Dest,LA,Cam,S,Sfinal,NivelLimite,Op):-Op==1,no(NAct,Act,_,_,Angustia1,_,Medo1,_,Dececao1,_,Remorsos1,_,Raiva1),
no(NX,X,_,_,Angustia2,_,Medo2,_,Dececao2,_,Remorsos2,_,Raiva2),
\+((Angustia1>0.5;Medo1>0.5;Dececao1>0.5;Remorsos1>0.5;Raiva1>0.5);(Angustia2>0.5;Medo2>0.5;Dececao2>0.5;Remorsos2>0.5;Raiva2>0.5)),
(ligacao(NAct,NX,S1,S2,_,_);ligacao(NX,NAct,S1,S2,_,_)), Sfinal1 is Sfinal+S1+S2,
no(NX,X,_,_,_,_,_,_,_,_,_,_,_),\+ member(X,LA), length([X|LA],Contador), Contador =< NivelLimite+1, dfs2Ligacao(X,Dest,[X|LA],Cam,S,Sfinal1,NivelLimite,Op).
dfs2Ligacao(Act,Dest,LA,Cam,S,Sfinal,NivelLimite,Op):-Op==2,no(NAct,Act,_,_,_,_,_,_,_,_,_,_,_),
(ligacao(NAct,NX,S1,S2,_,_);ligacao(NX,NAct,S1,S2,_,_)), Sfinal1 is Sfinal+S1+S2,
no(NX,X,_,_,_,_,_,_,_,_,_,_,_),\+ member(X,LA), length([X|LA],Contador), Contador =< NivelLimite+1, dfs2Ligacao(X,Dest,[X|LA],Cam,S,Sfinal1,NivelLimite,Op).

plan_forte_ligacao(Orig,Dest,NivelLimite,LCaminho,Soma,Op):-
(caminho_mais_forte_ligacao(Orig,Dest,NivelLimite,Soma,Op);true),
retract(melhor_sol_forte_ligacao(LCaminho,Soma)).

caminho_mais_forte_ligacao(Orig,Dest,NivelLimite,Soma,Op):-
asserta(melhor_sol_forte_ligacao(_,0)),
dfs_forte_ligacao(Orig,Dest,LCaminho,Soma,NivelLimite,Op),
atualiza_caminho_forte_ligacao(LCaminho,Soma),
fail.

atualiza_caminho_forte_ligacao(LCaminho,SomaFinal):-
melhor_sol_forte_ligacao(_,N),
SomaFinal > N,
retract(melhor_sol_forte_ligacao(_,_)),
asserta(melhor_sol_forte_ligacao(LCaminho,SomaFinal)).
