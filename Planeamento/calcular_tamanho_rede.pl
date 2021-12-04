% este m�todo ir� retorna o numero dos utilizadores que se encontram at�
% um determinado nivel
%
% o 1� predicado (rede) apenas pede o nome e o
% n�vel ao qual quer ver o predicado converte o nome para ID e chama o
% percorre_niveis
%
% dentro do 2o predicado (percorre_niveis):
% o 1� argumento corresponde ao ID do utilizador
% o 2� argumento corresponde a uma lista que contem os utilizadores que se encontram no nivel determinado no 2� argumento
% o 3� argumento corresponde ao nivel atual, relativamente ao grafo de relacoes, em que nos encontramos durante a pesquisa
% o 4� argumento corresponde ao nivel at� onde pretendemos fazer a pesquisa
% o 5� argumento correspode a uma lista que contem os utilizadores
% apenas do nivel atual
% o 6� argumento correspode a uma lista que contem
% os utilizadores at� ao nivel atual
% o 7� argumento corresponde � lista que retorna com os numeros dos
% utilizados at� ao nivel correspondente determinado no 3� argumento
rede(ID,Nivel):-percorre_niveis(ID,[ID],0,Nivel,[],[],Res),!,write(Res),nl,write('Tamanho da Rede: '),length(Res,Rede),write(Rede).

percorre_niveis(ID,[],NA,N,ListUsers,ListNiveis,Rede):-sort(ListUsers,ListUsers1),append(ListUsers1,ListNiveis,ListRes),sort(ListRes,ListRes1),
    NA1 is NA+1,((NA1==N,Rede = ListRes1);percorre_niveis(ID,ListUsers1,NA1,N,[],ListRes1,Rede)).
percorre_niveis(ID,[NUtilizador|ListNivel],NA,N,ListUsers,ListNiveis,ListRes):-findall(NX,((ligacao(NUtilizador,NX,_,_);
    ligacao(NX,NUtilizador,_,_)),NX\==ID), ListUserNivel),append(ListUserNivel,ListUsers,Lista),
    percorre_niveis(ID,ListNivel,NA,N,Lista,ListNiveis,ListRes).
