%mais seguro sem findall
:-dynamic melhor_sol_seguro/2.

dfs_seguro(Orig,Dest,Cam,MinForca, SomatorioForca,SomaFinal):- dfs2_seguro(Orig,Dest,[Orig],Cam,MinForca, SomatorioForca,SomaFinal).

dfs2_seguro(Dest,Dest,LA,Cam,_,Somatorio,SomaFinal):-!,reverse(LA,Cam), SomaFinal is Somatorio.

dfs2_seguro(Act,Dest,LA,Cam,MinForca,SomatorioForca,SomaFinal):- no(NAct,Act,_),
    ((ligacao(NAct,NX,Y,Z), Y >= MinForca, Z >= MinForca, Soma is Y+Z);(ligacao(NX,NAct,A,B), A >= MinForca, B >= MinForca), Soma is A+B), no(NX,X,_),\+ member(X,LA),SomatorioForca1 is SomatorioForca+Soma,
    dfs2_seguro(X,Dest,[X|LA],Cam,MinForca,SomatorioForca1,SomaFinal).


plan_seguro(Orig,Dest,LCaminho,MinForca):-
get_time(Ti),
(melhor_caminho_seguro(Orig,Dest,MinForca);true),
retract(melhor_sol_seguro(LCaminho,_)),
get_time(Tf),
T is Tf-Ti,
write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_seguro(Orig,Dest,MinForca):-
asserta(melhor_sol_seguro(_,0)),
dfs_seguro(Orig,Dest,LCaminho,MinForca,0,Soma),
atualiza_melhor_seguro(LCaminho,Soma),
fail.

atualiza_melhor_seguro(LCaminho,SomaFinal):-
melhor_sol_seguro(_,N),
SomaFinal > N,
retract(melhor_sol_seguro(_,_)),
asserta(melhor_sol_seguro(LCaminho,SomaFinal)).


%mais seguro com findall
plan_seguro_com_findall(Orig,Dest,LCaminho,MinForca):-
get_time(Ti),
 findall(Caminho,dfs_seguro_com_findall(Orig,Dest,Caminho,MinForca),LCaminho),
 length(LCaminho,NLCam),get_time(Tf),
write(' Foram encontradas '), write(NLCam),write(' solucoes em '),
T is Tf-Ti,write(T),write(' segundos'),nl,
write(' Lista de Caminhos possíveis: '),nl,nl.


dfs_seguro_com_findall(Orig,Dest,Cam,MinForca):- dfs2_seguro_com_findall(Orig,Dest,[Orig],Cam,MinForca).

dfs2_seguro_com_findall(Dest,Dest,LA,Cam,_):-!,reverse(LA,Cam).

dfs2_seguro_com_findall(Act,Dest,LA,Cam,MinForca):- no(NAct,Act,_),
    ((ligacao(NAct,NX,Y,Z), Y >= MinForca, Z >= MinForca);(ligacao(NX,NAct,A,B), A >= MinForca, B >= MinForca)), no(NX,X,_),\+ member(X,LA),
    dfs2_seguro_com_findall(X,Dest,[X|LA],Cam,MinForca).