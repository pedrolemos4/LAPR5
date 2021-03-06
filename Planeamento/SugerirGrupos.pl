:-ensure_loaded('./CheckTags.pl').

sugerir_grupos(NTags,NUtilizadores,TagsObrigatorias,GrupoMaior):-
    TagsAux = TagsObrigatorias,
    (TagsAux == ["[]"],TagsAux2 = [],!;(TagsAux2 = TagsObrigatorias)),
    plan_x_tags(NTags,ListaCheckTags),
    verificar_tags_obrigatorias(ListaCheckTags,UtilizadoresETags,[],TagsAux2,TagsAux2),
    verificar_utilizadores(UtilizadoresETags,NUtilizadores,[],GrupoMaior,0),!.
    %verificar_tags_obrigatorias(GrupoMaior,TagsObrigatorias,ListaFinal).

%verificar_utilizadores([],_,L,_):-verificar_utilizadores1(L).
verificar_utilizadores([],_,Aux,GrupoMaior,_):- GrupoMaior = Aux, !.
verificar_utilizadores([Utilizadores|ListaCheckTags],NUtilizadores,Aux,GrupoMaior,Maximo):-
   (contaUtilizadores(Utilizadores,NUtilizadores,N,0), (N > Maximo,Maximo1 is N,
    verificar_utilizadores(ListaCheckTags,NUtilizadores,Utilizadores,GrupoMaior,Maximo1)));
   (verificar_utilizadores(ListaCheckTags,NUtilizadores,Aux,GrupoMaior,Maximo)).

% contaUtilizadores1(Utilizadores,NUtilizadores,N,0):-contaUtilizadores(Utilizadores,NUtilizadores,N,0),!.

contaUtilizadores([],N,Final,C):- (C >= N, true, Final is C, !) ; (fail, !).
contaUtilizadores([_|Lista],N,ContadorFinal,Contador):- Contador1 is Contador + 1, contaUtilizadores(Lista,N,ContadorFinal,Contador1).

verificar_utilizadores1([]):-fail,!.
verificar_utilizadores1(_):-!.

verificar_tags_obrigatorias([],ListaFinal,Lista,_,_):- ListaFinal = Lista,!.
verificar_tags_obrigatorias([Tags,Utilizadores|Lista],ListaFinal,ListaPreencher,TagsObrigatorias,Aux):-
    (compara_tags(Tags,TagsObrigatorias),verificar_tags_obrigatorias(Lista,ListaFinal,[Utilizadores|ListaPreencher],TagsObrigatorias,Aux));
    (verificar_tags_obrigatorias(Lista,ListaFinal,ListaPreencher,Aux,Aux)).

compara_tags([],_):-!.
compara_tags(_,[]):-!.
compara_tags(ListaTagsCheckTags,[Tag|TagsObrigatorias]):-
	(compara_tags1(ListaTagsCheckTags,Tag),compara_tags(ListaTagsCheckTags,TagsObrigatorias));fail,!.

%2 parametro tags obrigatorias
compara_tags1([],_):-fail,!.
compara_tags1([Tag|_],Tag):- true,!.
compara_tags1([_|Tags],T):-compara_tags1(Tags,T).
