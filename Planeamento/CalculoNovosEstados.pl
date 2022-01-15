calculaAlegriaAngustia(Utilizador,  NLikes, NDislikes, ValorNovoAlegria,ValorNovoAngustia):-no(_,Utilizador,_,Alegria,Angustia,_,_,_,_,_,_,_,_), NLikes > NDislikes,! , Diferenca is NLikes - NDislikes, calculaAumento(Diferenca, Alegria, ValorNovoAlegria),  calculaDiminuicao(Diferenca, Angustia, ValorNovoAngustia),!.
calculaAlegriaAngustia(Utilizador,  NLikes, NDislikes, ValorNovoAlegria,ValorNovoAngustia):-no(_,Utilizador,_,Alegria,Angustia,_,_,_,_,_,_,_,_), NLikes < NDislikes,! , Diferenca is NDislikes - NLikes, calculaDiminuicao(Diferenca, Alegria, ValorNovoAlegria),  calculaAumento(Diferenca, Angustia, ValorNovoAngustia),!.
calculaAlegriaAngustia(_,  _, _, ValorNovoAlegria,ValorNovoAngustia):- ValorNovoAlegria is 0.50, ValorNovoAngustia is 0.50.

calculaAumento(Diferenca, Alegria, ValorNovoAlegria):- (Diferenca < 200, Valor is Diferenca; Valor is 200), ValorNovoAlegria is (Alegria + (1 - Alegria) * (Valor / 200)).

calculaDiminuicao(Diferenca, Angustia, ValorNovoAngustia):- (Diferenca < 200, Valor is Diferenca; Valor is 200), ValorNovoAngustia is (Angustia * (1 - (Valor / 200))).


calculaEsperancaMedoAlivioDececao(ListaSugerida, ListaEsperanca, ListaMedo, ValorNovoEsperancaAlivio, ValorNovoMedoDececao):- length(ListaEsperanca, ContadorTotalEsperanca), length(ListaMedo, ContadorTotalMedo), intersection(ListaSugerida, ListaEsperanca, ListaFinalEsperanca), intersection(ListaSugerida, ListaMedo, ListaFinalMedo), length(ListaFinalEsperanca, ContadorIncluidosEsperanca), length(ListaFinalMedo, ContadorIncluidosMedo), calcula(ContadorTotalEsperanca, ContadorIncluidosEsperanca, ValorNovoEsperancaAlivio), calcula(ContadorTotalMedo, ContadorIncluidosMedo, ValorNovoMedoDececao).

calcula(ContadorTotalEsperanca, ContadorIncluidosEsperanca, ValorNovoEsperanca):-  ValorNovoEsperanca is (ContadorIncluidosEsperanca / ContadorTotalEsperanca).

% sempre que o predicado dos grupos for chamado este também tem que ser chamado
%ListaIncluida altera valores orgulho e gratidao
%ListaImpedida altera valores remorsos e raiva

%denominador é tamanho da listaSugerida ou da lista da intersection?
calculaOrgulhoRemorsosGratidaoRaiva(ListaSugerida,ListaImpedida, ListaIncluida, ValorNovoOrgulhoGratidao, ValorNovoRemorsosRaiva):- length(ListaSugerida, ContadorTotal), intersection(ListaSugerida, ListaImpedida, ListaFinalImpedida), intersection(ListaSugerida, ListaIncluida, ListaFinalIncluida), length(ListaFinalImpedida, ContadorImpedidos), length(ListaFinalIncluida, ContadorIncluidos), calcula(ContadorTotal, ContadorIncluidos, ValorNovoOrgulhoGratidao), calcula(ContadorTotal, ContadorImpedidos, ValorNovoRemorsosRaiva).
