% este método irá retorna o numero dos utilizadores que se encontram até
% um determinado nivel
%
% o 1º predicado (rede) apenas pede o nome e o
% nível ao qual quer ver o predicado converte o nome para ID e chama o
% percorre_niveis
%
% dentro do 2o predicado (percorre_niveis):
% o 1º argumento corresponde ao ID do utilizador
% o 2º argumento corresponde a uma lista que contem os utilizadores que se encontram no nivel determinado no 2º argumento
% o 3º argumento corresponde ao nivel atual, relativamente ao grafo de relacoes, em que nos encontramos durante a pesquisa
% o 4º argumento corresponde ao nivel até onde pretendemos fazer a pesquisa
% o 5º argumento correspode a uma lista que contem os utilizadores
% apenas do nivel atual
% o 6º argumento correspode a uma lista que contem
% os utilizadores até ao nivel atual
% o 7º argumento corresponde à lista que retorna com os numeros dos
% utilizados até ao nivel correspondente determinado no 3º argumento
rede(Nome,Nivel):-no(ID,Nome,_),percorre_niveis(ID,[ID],0,Nivel,[],[],Res),!,write(Res),nl,write('Tamanho da Rede: '),length(Res,Rede),write(Rede).

percorre_niveis(ID,[],NA,N,ListUsers,ListNiveis,Rede):-sort(ListUsers,ListUsers1),append(ListUsers1,ListNiveis,ListRes),sort(ListRes,ListRes1),
    NA1 is NA+1,((NA1==N,Rede = ListRes1);percorre_niveis(ID,ListUsers1,NA1,N,[],ListRes1,Rede)).
percorre_niveis(ID,[NUtilizador|ListNivel],NA,N,ListUsers,ListNiveis,ListRes):-findall(NX,((ligacao(NUtilizador,NX,_,_);
    ligacao(NX,NUtilizador,_,_)),NX\==ID), ListUserNivel),append(ListUserNivel,ListUsers,Lista),
    percorre_niveis(ID,ListNivel,NA,N,Lista,ListNiveis,ListRes).
