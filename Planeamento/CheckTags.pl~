plan_x_tags(NTags,Res):-
findall(Tag,(no(_,_,LTags,_,_,_,_,_,_,_,_,_,_), member(Tag,LTags)),LTodosTagsRep),
removeRepetidos(LTodosTagsRep,ListaTags),
todas_combinacoes(NTags,ListaTags,ListaCombinacoes),
findall(X,no(X,_,_,_,_,_,_,_,_,_,_,_,_),Lista),
ListaAux = [],
comparar(ListaCombinacoes,Lista,ListaFinal,ListaAux,Res).

removeRepetidos([],[]):-!.
removeRepetidos([X|LTodosTagsRep],ListaTags):- member(X,LTodosTagsRep),!,removeRepetidos(LTodosTagsRep,ListaTags).
removeRepetidos([X|LTodosTagsRep],[X|ListaTags]):- removeRepetidos(LTodosTagsRep,ListaTags).

todas_combinacoes(X,LTags,LcombXTags):- findall(L,combinacao(X,LTags,L),LcombXTags).
combinacao(0,_,[]):- !.
combinacao(X,[Tag|L],[Tag|T]):- X1 is X-1, combinacao(X1,L,T).
combinacao(X,[_|L],T):- combinacao(X,L,T).

comparar([],_,_,ListaAux,ListaAux):-!.
comparar([Comb|ListaCombinacoes],Lista,ListaFinal,ListaAux,Res):-comparar1(Comb,Lista,ListaFinal,_),comparar(ListaCombinacoes,Lista,_,[Comb,ListaFinal|ListaAux],Res),!.
comparar1(_,[],[],_):-!.
comparar1(Comb,[Id|Lista],ListaFinal,_):- no(Id,_,ListaTags),intersection(Comb,ListaTags,LInter),length(LInter,TamFinal),length(Comb,TamComb),(TamFinal \== TamComb),!,comparar1(Comb,Lista,ListaFinal,_).
comparar1(Comb,[Id|Lista],[Id|ListaFinal],_):- comparar1(Comb,Lista,ListaFinal,_).








