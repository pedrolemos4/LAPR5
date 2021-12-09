%mais seguro sem findall
no(1,ana,[natureza,pintura,musica,sw,porto]).
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,musica,carros,porto,moda]).
no(13,carlos,[natureza,musica,sw,futebol,coimbra]).
no(21,tomas,[natureza,musica,sw,futebol,coimbra]).
no(22,pedro,[natureza,musica,sw,futebol,coimbra]).
no(23,ze,[natureza,musica,sw,futebol,coimbra]).
no(31,joao,[natureza,musica,sw,futebol,coimbra]).


ligacao(1,11,10,8).
%==========================
ligacao(11,21,11,0).
ligacao(11,22,0,5).
ligacao(11,23,10,2).
%==========================
ligacao(12,21,10,2).
ligacao(12,22,10,8).
ligacao(12,23,10,5).
%==========================
ligacao(13,21,10,2).
ligacao(13,22,10,8).
ligacao(13,23,10,5).
%==========================
ligacao(21,31,10,0).
ligacao(22,31,5,2).
ligacao(23,31,4,4).
%==========================

:-dynamic melhor_sol_seguro/2.

dfs_seguro(Orig,Dest,Cam,MinForca, SomatorioForca,SomaFinal):-
           dfs2_seguro(Orig,Dest,[Orig],Cam,MinForca, SomatorioForca,SomaFinal).

dfs2_seguro(Dest,Dest,LA,Cam,_,Somatorio,SomaFinal):-!,reverse(LA,Cam), SomaFinal is Somatorio.

dfs2_seguro(Act,Dest,LA,Cam,MinForca,SomatorioForca,SomaFinal):-
    ((ligacao(Act,NX,Y,Z), Y >= MinForca, Z >= MinForca, Soma is Y+Z);(ligacao(NX,Act,A,B),
     A >= MinForca, B >= MinForca),Soma is A+B),
     \+ member(NX,LA),SomatorioForca1 is SomatorioForca+Soma,
    dfs2_seguro(NX,Dest,[NX|LA],Cam,MinForca,SomatorioForca1,SomaFinal).


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

dfs2_seguro_com_findall(Act,Dest,LA,Cam,MinForca):- ((ligacao(Act,NX,Y,Z), Y >= MinForca, Z >= MinForca);(ligacao(NX,Act,A,B), A >= MinForca, B >= MinForca)),\+ member(NX,LA),
    dfs2_seguro_com_findall(NX,Dest,[NX|LA],Cam,MinForca).
