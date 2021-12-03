% Base de Conhecimento

no(1,ana,[natureza,pintura,musica,sw,porto]).
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,musica,carros,porto,moda]).
no(13,carlos,[natureza,musica,sw,futebol,coimbra]).
no(14,daniel,[natureza,cinema,jogos,sw,moda]).
no(15,rui,[natureza,andebol,carros,aveiro]).
no(16,vitor,[natureza,bowling,motas,coimbra]).
no(17,timoteo,[natureza,bowling,motas,coimbra]).
no(18,bargallo,[natureza,bowling,motas,coimbra]).
no(21,eduardo,[natureza,cinema,teatro,carros,coimbra]).
no(22,isabel,[natureza,musica,porto,lisboa,cinema]).
no(23,jose,[natureza,pintura,sw,musica,carros,lisboa]).
no(24,luisa,[natureza,cinema,jogos,moda,porto]).
no(25,edite,[natureza,teatro,musica,jogos,leiria]).
no(26,joana,[selva,cinema,paddle,livros,albufeira]).
no(27,jorge,[natureza,bowling,motas,coimbra]).
no(28,alexandre,[natureza,bowling,motas,coimbra]).
no(31,maria,[natureza,pintura,musica,moda,porto]).
no(32,anabela,[natureza,cinema,musica,tecnologia,porto]).
no(33,andre,[natureza,carros,futebol,coimbra]).
no(34,catia,[natureza,musica,cinema,lisboa,moda]).
no(35,bernardo,[tenis,pintura,teatro,porto,moda]).
no(36,rafael,[karting,futebol,cinema,moda,leiria]).
no(37,goncalo,[natureza,bowling,motas,coimbra]).
no(38,tobias,[natureza,bowling,motas,coimbra]).
no(41,cesar,[natureza,teatro,tecnologia,futebol,porto]).
no(42,diogo,[natureza,futebol,sw,jogos,porto]).
no(43,ernesto,[natureza,teatro,carros,porto]).
no(44,isaura,[natureza,moda,tecnologia,cinema]).
no(45,luis,[natureza,motas,tecnologia,jogos,faro]).
no(46,madalena,[natureza,programacao,cinema,jogos,porto]).
no(47,petra,[natureza,bowling,motas,coimbra]).
no(48,jessica,[natureza,bowling,motas,coimbra]).
no(51,leandro,[bebida,mulheres,bemfica,petra,penafiel]).
no(52,pedro,[marinhas,futebol,suits,faculdade,povoa]).
no(53,bea,[boomer,ballet,sudoku,ruido,paredes]).
no(54,ze,[gamer,gatos,oculos,isep,gaia]).
no(55,tiago,[futebol,superbock,ads,isep,sjm]).
no(56,luisao,[natureza,sagres,feirense,feup,sjm]).
no(57,salome,[natureza,bowling,motas,coimbra]).
no(58,angelo,[natureza,bowling,motas,coimbra]).
no(61,augusto,[corrida,superbock,taboeira,isep,aveiro]).
no(62,daniela,[natureza,motas,musica,sw,porto]).
no(63,rodrigo,[natureza,carros,cinema,isep,aveiro]).
no(64,gil,[natureza,pintura,sw,musica,carros,porto]).
no(65,juliana,[natureza,moda,futebol,teatro,beja]).
no(66,alberto,[natureza,natacao,rugby,moda,braga]).
no(67,joao,[natureza,bowling,motas,coimbra]).
no(68,gasly,[natureza,bowling,motas,coimbra]).
no(71,paulo,[natureza,bowling,motas,coimbra]).
no(72,simba,[natureza,bowling,motas,coimbra]).
no(73,mufasa,[natureza,bowling,motas,coimbra]).
no(74,fernanda,[natureza,bowling,motas,coimbra]).
no(75,otavio,[natureza,bowling,motas,coimbra]).
no(76,taremi,[natureza,bowling,motas,coimbra]).
no(77,marchesin,[natureza,bowling,motas,coimbra]).
no(78,hamilton,[natureza,bowling,motas,coimbra]).
no(81,gilberto,[natureza,bowling,motas,coimbra]).
no(82,bruno,[natureza,bowling,motas,coimbra]).
no(83,bruna,[natureza,bowling,motas,coimbra]).
no(84,neymar,[natureza,bowling,motas,coimbra]).
no(85,carla,[natureza,bowling,motas,coimbra]).
no(86,miguel,[natureza,bowling,motas,coimbra]).
no(87,ollie,[natureza,bowling,motas,coimbra]).
no(88,jim,[natureza,bowling,motas,coimbra]).
no(200,sara,[natureza,moda,musica,sw,coimbra]).


%no(51,rodolfo,[natureza,musica,sw]).
%no(61,rita,[moda,tecnologia,cinema]).


ligacao(1,11,10,8).
ligacao(1,12,2,6).
ligacao(1,13,-3,-2).
ligacao(1,14,1,-5).
ligacao(1,15,5,2).
%==========================
ligacao(11,21,5,7).
ligacao(11,22,2,-4).
ligacao(11,23,-2,8).
ligacao(11,24,6,0).
ligacao(11,25,7,3).
%==========================
ligacao(12,21,10,2).
ligacao(12,22,10,8).
ligacao(12,23,10,5).
ligacao(12,24,10,5).
ligacao(12,25,10,5).
%==========================
ligacao(13,21,10,2).
ligacao(13,22,10,8).
ligacao(13,23,10,5).
ligacao(13,24,10,12).
ligacao(13,25,10,5).
%==========================
ligacao(14,21,10,2).
ligacao(14,22,10,8).
ligacao(14,23,10,5).
ligacao(14,24,10,12).
ligacao(14,25,10,12).
%==========================
ligacao(15,21,10,2).
ligacao(15,22,10,8).
ligacao(15,23,10,5).
ligacao(15,24,10,12).
ligacao(15,25,10,12).
%==========================
ligacao(21,31,10,2).
ligacao(21,32,5,5).
ligacao(21,33,5,10).
ligacao(21,34,10,0).
ligacao(21,35,10,0).
%==========================
ligacao(22,31,10,2).
ligacao(22,32,10,5).
ligacao(22,33,10,9).
ligacao(22,34,10,0).
ligacao(22,35,10,0).
%==========================
ligacao(23,31,0,5).
ligacao(23,32,10,4).
ligacao(23,33,5,5).
ligacao(23,34,10,0).
ligacao(23,35,10,0).
%==========================
ligacao(24,31,0,5).
ligacao(24,32,10,4).
ligacao(24,33,5,5).
ligacao(24,34,10,0).
ligacao(24,35,10,0).
%==========================
ligacao(25,31,0,5).
ligacao(25,32,10,4).
ligacao(25,33,5,5).
ligacao(25,34,10,0).
ligacao(25,35,10,0).
%==========================
ligacao(31,41,10,0).
ligacao(31,42,10,2).
ligacao(31,43,10,5).
ligacao(31,44,5,2).
%==========================
ligacao(32,41,10,5).
ligacao(32,42,10,2).
ligacao(32,43,10,5).
ligacao(32,44,5,2).
ligacao(32,45,5,2).
%==========================
ligacao(33,41,1,8).
ligacao(33,42,10,20).
ligacao(33,43,11,5).
ligacao(33,44,5,20).
ligacao(33,45,5,20).
%==========================
ligacao(34,41,5,8).
ligacao(34,42,10,2).
ligacao(34,43,10,5).
ligacao(34,44,5,2).
ligacao(34,45,5,2).
%==========================
ligacao(35,41,5,8).
ligacao(35,42,10,2).
ligacao(35,43,10,5).
ligacao(35,44,5,2).
ligacao(35,45,5,2).
%==========================
ligacao(41,51,5,8).
ligacao(41,52,10,2).
ligacao(41,53,10,5).
ligacao(41,54,5,2).
ligacao(41,55,5,2).
%==========================
ligacao(42,51,10,2).
ligacao(42,52,10,2).
ligacao(42,53,10,5).
ligacao(42,54,5,2).
ligacao(42,55,5,2).

%==========================
ligacao(43,51,10,5).
ligacao(43,52,10,2).
ligacao(43,53,10,5).
ligacao(43,54,5,2).
ligacao(43,55,5,2).

%==========================
ligacao(44,51,5,2).
ligacao(44,52,10,2).
ligacao(44,53,10,5).
ligacao(44,54,5,2).
ligacao(44,55,5,2).
%==========================
ligacao(45,51,5,2).
ligacao(45,52,10,2).
ligacao(45,53,10,5).
ligacao(45,54,5,2).
ligacao(45,55,5,2).
%==========================
ligacao(51,61,5,2).
ligacao(52,61,10,2).
ligacao(53,61,10,5).
ligacao(54,61,5,2).
ligacao(55,61,5,2).






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
atualiza_caminho_seguro(LCaminho,Soma),
fail.

atualiza_caminho_seguro(LCaminho,SomaFinal):-
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
