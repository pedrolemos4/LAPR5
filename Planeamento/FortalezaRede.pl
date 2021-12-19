% ListaUtilizadores contem os utilizadores amigos de nivel 1
% ListaForcas contem forcas nessas ligacoes
fortaleza(Numero,SomaForcas):- percorre_niveis(Numero,[Numero],0,1,[],[],ListaUtilizadores), lista_forcas1(Numero,ListaUtilizadores,0,SomaForcas).

percorre_niveis(Numero,[],NivelAtual,Nivel, ListUtilizadores,ListaGuardaTodosNiveis, ListaARetornar):-  sort(ListUtilizadores,ListUtilizadores1),append(ListUtilizadores1,ListaGuardaTodosNiveis,ListaRes), sort(ListaRes,ListaRes1),NivelAtual1 is NivelAtual+1, ((NivelAtual1==Nivel,ListaARetornar = ListaRes1,!); percorre_niveis(Numero,ListUtilizadores1,NivelAtual1,Nivel,[],ListaRes1,ListaARetornar)).
percorre_niveis(Numero,[NUtilizador|ListaNivel],NivelAtual,Nivel, ListUtilizadores,ListaGuardaTodosNiveis,ListaARetornar):- findall(NX, ((ligacao(NUtilizador,NX,_,_);ligacao(NX,NUtilizador,_,_)), NX\==Numero), ListUtilizadoresNivel), append(ListUtilizadoresNivel,ListUtilizadores,Lista),
percorre_niveis(Numero,ListaNivel,NivelAtual,Nivel,Lista,ListaGuardaTodosNiveis,ListaARetornar).

lista_forcas1(_,[],SomaAuxiliar, SomaForcas):- SomaForcas is SomaAuxiliar.
lista_forcas1(Numero,[X|ListaUtilizadores],SomaAuxiliar, SomaForcas):- (ligacao(Numero,X,FNumero,FX);ligacao(X,Numero,FX,FNumero)), Soma is SomaAuxiliar + FNumero + FX, lista_forcas1(Numero,ListaUtilizadores,Soma, SomaForcas).