%Sem o findAll


:-dynamic melhor_sol_forte/2.


dfs_forte(Orig,Dest,Cam,S):-dfs2(Orig,Dest,[Orig],Cam,S,0).
dfs2(Dest,Dest,LA,Cam,S,S1):-!,reverse(LA,Cam),S is S1.
dfs2(Act,Dest,LA,Cam,S,Sfinal):-no(NAct,Act,_),(ligacao(NAct,NX,S1,S2);ligacao(NX,NAct,S1,S2)), Sfinal1 is Sfinal+S1+S2,
no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],Cam,S,Sfinal1).


plan_forte(Orig,Dest,LCaminho):-
get_time(Ti),
(caminho_mais_forte(Orig,Dest);true),
retract(melhor_sol_forte(LCaminho,_)),
get_time(Tf),
T is Tf-Ti,
write('Tempo de geracao da solucao:'),write(T),nl.

caminho_mais_forte(Orig,Dest):-
asserta(melhor_sol_forte(_,0)),
dfs_forte(Orig,Dest,LCaminho,Soma),
atualiza_caminho_forte(LCaminho,Soma),
fail.

atualiza_caminho_forte(LCaminho,SomaFinal):-
melhor_sol_forte(_,N),
SomaFinal > N,
retract(melhor_sol_forte(_,_)),
asserta(melhor_sol_forte(LCaminho,SomaFinal)).


%Com findAll


%mais seguro com findall
plan_forte_com_findAll(Orig,Dest,LCaminho):-
get_time(Ti),
 findall(Caminho,dfs_forte_com_findAll(Orig,Dest,Caminho),LCaminho),
 length(LCaminho,NLCam),get_time(Tf),
write(' Foram encontradas '), write(NLCam),write(' solucoes em '),
T is Tf-Ti,write(T),write(' segundos'),nl,
write(' Lista de Caminhos possiveis: '),nl,nl.


dfs_forte_com_findAll(Orig,Dest,Cam):-dfs2_forte_com_findAll(Orig,Dest,[Orig],Cam).
dfs2_forte_com_findAll(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2_forte_com_findAll(Act,Dest,LA,Cam):-no(NAct,Act,_),(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
no(NX,X,_),\+ member(X,LA),dfs2_forte_com_findAll(X,Dest,[X|LA],Cam).
