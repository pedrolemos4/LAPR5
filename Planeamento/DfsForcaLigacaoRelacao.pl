:-dynamic melhor_sol_forte/2.


dfs_forteLR(Orig,Dest,Cam,S,NivelLimite,Op):-dfs2LR(Orig,Dest,[Orig],Cam,S,0,NivelLimite,Op).
dfs2LR(Dest,Dest,LA,Cam,S,S1,_,_):-!,reverse(LA,Cam),S is S1.
dfs2LR(Act,Dest,LA,Cam,S,Sfinal,NivelLimite,Op):-Op==1,no(NAct,Act,_,_,Angustia1,_,Medo1,_,Dececao1,_,Remorsos1,_,Raiva1),
no(NX,X,_,_,Angustia2,_,Medo2,_,Dececao2,_,Remorsos2,_,Raiva2),
\+((Angustia1>0.5;Medo1>0.5;Dececao1>0.5;Remorsos1>0.5;Raiva1>0.5);(Angustia2>0.5;Medo2>0.5;Dececao2>0.5;Remorsos2>0.5;Raiva2>0.5)),
(ligacao(NAct,NX,FAct,FX,RX,RY);ligacao(NX,NAct,FX,FAct,RX,RY)),
converterLigacao(FX,FAct,F1), converterRelacao(RX,RY,R1),Sfinal1 is Sfinal +(F1 + R1)/2,
no(NX,X,_,_,_,_,_,_,_,_,_,_,_),\+ member(X,LA),length([X|LA],Contador), Contador =< NivelLimite+1, dfs2LR(X,Dest,[X|LA],Cam,S,Sfinal1,NivelLimite,Op).
dfs2LR(Act,Dest,LA,Cam,S,Sfinal,NivelLimite,Op):-Op==2,no(NAct,Act,_,_,_,_,_,_,_,_,_,_,_),
(ligacao(NAct,NX,FAct,FX,RX,RY);ligacao(NX,NAct,FX,FAct,RX,RY)),
converterLigacao(FX,FAct,F1), converterRelacao(RX,RY,R1),Sfinal1 is Sfinal +(F1 + R1)/2,
no(NX,X,_,_,_,_,_,_,_,_,_,_,_),\+ member(X,LA),length([X|LA],Contador), Contador =< NivelLimite+1, dfs2LR(X,Dest,[X|LA],Cam,S,Sfinal1,NivelLimite,Op).


plan_forteLR(Orig,Dest,NivelLimite,LCaminho,Soma,Op):-
(caminho_mais_forteLR(Orig,Dest,NivelLimite,Soma,Op);true),
retract(melhor_sol_forte(LCaminho,Soma)).

caminho_mais_forteLR(Orig,Dest,NivelLimite,Soma,Op):-
asserta(melhor_sol_forte(_,0)),
dfs_forteLR(Orig,Dest,LCaminho,Soma,NivelLimite,Op),
atualiza_caminho_forteLR(LCaminho,Soma),
fail.

atualiza_caminho_forteLR(LCaminho,SomaFinal):-
melhor_sol_forte(_,N),
SomaFinal > N,
retract(melhor_sol_forte(_,_)),
asserta(melhor_sol_forte(LCaminho,SomaFinal)).

converterLigacao(RX,RY,F):- F is RX + RY.
converterRelacao(FX,FY,F):- Aux is FX + FY + 200, F is (Aux*100)/400.
