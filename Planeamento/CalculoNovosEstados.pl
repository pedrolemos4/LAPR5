calculaAlegriaAngustia(Utilizador,  NLikes, NDislikes, ValorNovoAlegria,ValorNovoAngustia):-no(_,Utilizador,_,Alegria,Angustia,_,_,_,_,_,_,_,_), NLikes > NDislikes,! , Diferenca is NLikes - NDislikes, calculaAumento(Diferenca, Alegria, ValorNovoAlegria),  calculaDiminuicao(Diferenca, Angustia, ValorNovoAngustia),!.
calculaAlegriaAngustia(Utilizador,  NLikes, NDislikes, ValorNovoAlegria,ValorNovoAngustia):-no(_,Utilizador,_,Alegria,Angustia,_,_,_,_,_,_,_,_), NLikes < NDislikes,! , Diferenca is NDislikes - NLikes, calculaDiminuicao(Diferenca, Alegria, ValorNovoAlegria),  calculaAumento(Diferenca, Angustia, ValorNovoAngustia),!.
calculaAlegriaAngustia(_,  _, _, ValorNovoAlegria,ValorNovoAngustia):- ValorNovoAlegria is 0.50, ValorNovoAngustia is 0.50.

calculaAumento(Diferenca, Alegria, ValorNovoAlegria):- (Diferenca < 200, Valor is Diferenca; Valor is 200), ValorNovoAlegria is (Alegria + (1 - Alegria) * (Valor / 200)).

calculaDiminuicao(Diferenca, Angustia, ValorNovoAngustia):- (Diferenca < 200, Valor is Diferenca; Valor is 200), ValorNovoAngustia is (Angustia * (1 - (Valor / 200))).


calculaEsperancaMedoAlivioDececao(Utilizador,ListaSugerida, ListaPretendida, ListaNaoDesejados, ValorNovoEsperanca, ValorNovoAlivio, ValorNovoMedo, ValorNovoDececao):-
no(_,Utilizador,_,_,_,Esperanca,Medo,Alivio,Dececao,_,_,_,_),
length(ListaPretendida, ContadorTotalPretendida), length(ListaNaoDesejados, ContadorTotalNaoDesejados),
intersection(ListaSugerida, ListaPretendida, ListaFinalPretendidos),
intersection(ListaSugerida, ListaNaoDesejados, ListaFinalNaoDesejados),
length(ListaFinalPretendidos, ContadorIncluidosPretendidos),
length(ListaFinalNaoDesejados, ContadorIncluidosNaoDesejados),
calcula(ContadorTotalPretendida, ContadorIncluidosPretendidos, QuocienteEsperanca),
calcula(ContadorTotalNaoDesejados, ContadorTotalNaoDesejados - ContadorIncluidosNaoDesejados,QuocienteAlivio),
calcula(ContadorTotalNaoDesejados, ContadorIncluidosNaoDesejados,QuocienteMedo),
calcula(ContadorTotalPretendida, ContadorTotalPretendida - ContadorIncluidosPretendidos, QuocienteDececao),
Media1 is ((QuocienteEsperanca + QuocienteDececao) / 2), Media2 is ((QuocienteAlivio + QuocienteMedo) / 2),
calculaNovaEmocao(Esperanca,Media1,QuocienteEsperanca,ValorNovoEsperanca),
calculaNovaEmocao(Alivio,Media2,QuocienteAlivio,ValorNovoAlivio),
calculaNovaEmocao(Medo,Media2,QuocienteMedo,ValorNovoMedo),
calculaNovaEmocao(Dececao,Media1,QuocienteDececao,ValorNovoDececao).


calcula(ContadorTotalEsperanca, ContadorIncluidosEsperanca, ValorNovoEsperanca):-
ValorNovoEsperanca is (ContadorIncluidosEsperanca / ContadorTotalEsperanca).

calculaNovaEmocao(Esperanca,Media1,QuocienteEsperanca,ValorNovoEsperanca):-
QuocienteEsperanca > Media1,!,
ValorNovoEsperanca is (Esperanca + (1 - Esperanca) * QuocienteEsperanca).
calculaNovaEmocao(Esperanca,Media1,QuocienteEsperanca,ValorNovoEsperanca):-
QuocienteEsperanca < Media1,!,
ValorNovoEsperanca is (Esperanca * (1 - QuocienteEsperanca)).
calculaNovaEmocao(Esperanca,_,_,ValorNovoEsperanca):-
ValorNovoEsperanca is Esperanca.
