lista_utilizadores_com_tags_conexoes(NUtilizador,Nivel,ListaResTags,
ListaNUtilizadores,ListaFinal1):-
no(NUtilizador,_,ListaTags),
lista_todos_utilizadores(NUtilizador,ListaTodos),
lista_utilizadores_sem_ligacao(NUtilizador,[],ListaTodos,ListaFinal),
lista_tags_utilizador(ListaFinal,ListaTags,[],ListaResTags),
percorre_niveis(NUtilizador,[NUtilizador|[]],0,Nivel,[],[],ListaNUtilizadores),
intersection(ListaNUtilizadores,ListaResTags,ListaSemVerCaminho),
ver_caminhos(NUtilizador,ListaSemVerCaminho,ListaTags,[],ListaFinal1).


% para obter lista com todos os utilizadores na base de conhecimento excepto o Utilizador do 1º argumento
% 2º argumento retorna lista pretendida

lista_todos_utilizadores(Utilizador,ListaTodos):- findall(NX, (no(NX,_,_)), List) ,delete(List,Utilizador,ListaTodos).


% para obter lista de utilizadores com quem nao tem relacao
% o 1º argumento corresponde ao numero relativo ao utilizador
% o 2º argumento corresponde à lista onde vamos adicionar os utilizadores sem ligacao ao nosso utilizador inicial
% o 3º argumento corresponde à lista que contem todos os utilizadores da base de conhecimento
% o 4º argumento corresponde à lista que retorna completa com todos os utilizadores que o utilizador inicial nao tem ligacao da base de conhecimento
lista_utilizadores_sem_ligacao(_,ListaUtilizadores,[],ListaFinal):-!,
                                                   reverse(ListaUtilizadores,ListaFinal).
lista_utilizadores_sem_ligacao(NUtilizador,ListaUtilizadores,[NX|ListaTodos],ListaFinal):-((((ligacao(NUtilizador,NX,_,_));(ligacao(NX,NUtilizador,_,_))),
lista_utilizadores_sem_ligacao(NUtilizador,ListaUtilizadores,ListaTodos,ListaFinal));     lista_utilizadores_sem_ligacao(NUtilizador,[NX|ListaUtilizadores],ListaTodos,ListaFinal)).


% para comparar a lista de tags do utilizador com as tags dos possiveis amigos e adiciona a uma lista o utilizador se tiver pelo menos 1 tag em comum
% o 1º argumento corresponde à lista de utilizadores com quem o utilizador inicial nao tem relaçao
% o 2º argumento corresponde à lista de tags do utilizador inicial
% o 3º argumento corresponde à lista auxiliar onde vamos adicionar os utilizadores sem ligacao ao nosso utilizador inicial que tenham pelo menos 1 tag em comum
% o 4º argumento corresponde à lista que retorna completa com todos os utilizadores que o utilizador inicial nao tem ligacao e que tenha 1 tag em comum da base de conhecimento
lista_tags_utilizador([],_,ListaFinalUtilizadores,Lista):-
reverse(ListaFinalUtilizadores,Lista).
lista_tags_utilizador([Utilizador|ListaUtilizadores],ListaTags,ListaFinalUtilizadores,Lista):-no(Utilizador,_,Lista2), intersection(ListaTags,Lista2,ListaTagsRes), ((ListaTagsRes\==[],
lista_tags_utilizador(ListaUtilizadores,ListaTags,[Utilizador|ListaFinalUtilizadores],Lista));lista_tags_utilizador(ListaUtilizadores,ListaTags,ListaFinalUtilizadores,Lista)).


% retorna numero dos utilizadores que se encontram até um determinado nivel
% o 1º argumento corresponde ao numero do Utilizador inicial
% o 2º argumento corresponde a uma lista que contem os utilizadores que se encontram no nivel determinado no 2º argumento
% o 3º argumento corresponde ao nivel atual, relativamente ao grafo de relacoes, em que nos encontramos durante a pesquisa
% o 4º argumento corresponde ao nivel até onde pretendemos fazer a pesquisa
% o 5º argumento correspode a uma lista que contem todos os utilizadores apenas do nivel do 2º argumento
% o 6º argumento correspode a uma lista que contem todos os utilizadores até ao nivel do 2º argumento
% o 7º argumento corresponde à lista que retorna com os numeros dos utilizados até ao nivel correspondente determinado no 3º argumento
% findall retorna lista com utilizadores com conexao a um utilizador em especifico, verifica se o Utilizador
percorre_niveis(Numero,[],NivelAtual,Nivel,ListUtilizadores,ListaGuardaTodosNiveis,ListaARetornar):-  sort(ListUtilizadores,ListUtilizadores1),
append(ListUtilizadores1,ListaGuardaTodosNiveis,ListaRes),sort(ListaRes,ListaRes1),
NivelAtual1 is NivelAtual+1, ((NivelAtual1==Nivel,ListaARetornar = ListaRes1,!);
percorre_niveis(Numero,ListUtilizadores1,NivelAtual1,Nivel,[],ListaRes1,ListaARetornar)).
percorre_niveis(Numero,[NUtilizador|ListaNivel],NivelAtual,Nivel,ListUtilizadores,ListaGuardaTodosNiveis,ListaARetornar):-findall(NX,((ligacao(NUtilizador,NX,_,_);ligacao(NX,NUtilizador,_,_)),NX\==Numero),ListUtilizadoresNivel), append(ListUtilizadoresNivel,ListUtilizadores,Lista),
percorre_niveis(Numero,ListaNivel,NivelAtual,Nivel,Lista,ListaGuardaTodosNiveis,ListaARetornar).


% de forma a retornar caminho entre um ponto de origem e destino, neste caso entre o jogador inicial e o jogador objetivo
dfs(Orig,Dest,Cam):-dfs2(Orig,Dest,[Orig],Cam).
dfs2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2(NAct,Dest,LA,Cam):-(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
\+ member(NX,LA),dfs2(NX,Dest,[NX|LA],Cam).


% para retornar lista com os jogadores que pelo seu caminho tenham as mesmas tags que o jogador objetivo
% o 1º argumento corresponde ao numero relativo ao utilizador inicial
% o 2º argumento corresponde à lista de jogadores objetivos com os requisitos anteriores
% o 3º argumento corresponde à lista auxiliar para guardar os jogadores que queremos retornar
% o 4º argumento corresponde à lista que retorna completa com os jogadores
ver_caminhos(_,[],_,ListaAPreencher,ListaFinalResultante):-
ListaFinalResultante = ListaAPreencher.
ver_caminhos(NUtilizador,[NX|ListaSemVerCaminho],ListaTags,ListaAPreencher,ListaFinalResultante):- no(NX,_,Lista), intersection(Lista,ListaTags,ListaTagsRes),
findall(Cam,dfs(NX,NUtilizador,Cam),LCam), ver_caminhos2(LCam,NX,ListaTagsRes,[],ListaFinal1),((ListaFinal1\==[], ver_caminhos(NUtilizador,ListaSemVerCaminho,ListaTags,[NX|ListaAPreencher],ListaFinalResultante));ver_caminhos(NUtilizador,ListaSemVerCaminho,ListaTags,ListaAPreencher,ListaFinalResultante)).


% de forma a percorrer cada lista da lista de caminhos possiveis entre o jogador inicial e objetivo
ver_caminhos2([],_,_,ListaAPreencher,ListaFinal1):- ListaFinal1 = ListaAPreencher.
ver_caminhos2([Lista|LCam],NX,ListaTagsRes,ListaAPreencher,ListaFinal1):- ver_caminhos_aux(Lista,ListaTagsRes,[],ListaFinalAux), ((ListaFinalAux\==[],append(ListaAPreencher,[NX],ListaFinal1),!); (ListaFinal1=[], ver_caminhos2(LCam,NX,ListaTagsRes,[],ListaFinal1))).


% de forma a percorrer uma lista de caminhos para verificar se todos os elementos da lista, que corresponde ao caminho encontrado, têm as tags encontradas em comum do jogador objetivo
ver_caminhos_aux([],_,ListaAPreencher,ListaFinal1):- ListaFinal1 = ListaAPreencher.
ver_caminhos_aux([NX|Lista],ListaTagsRes,ListaAPreencher,ListaFinal1):- no(NX,_,ListaTags), intersection(ListaTagsRes,ListaTags,ListaRes), ((ListaRes==ListaTagsRes, ver_caminhos_aux(Lista,ListaTagsRes,[NX|ListaAPreencher],ListaFinal1));(ListaFinal1=[],!)).
