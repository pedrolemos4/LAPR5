:-dynamic melhor_sol_minlig/2.

dfsCurto(Orig,Dest,Cam):-dfsCurto2(Orig,Dest,[Orig],Cam).
dfsCurto2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfsCurto2(Act,Dest,LA,Cam):-no(NAct,Act,_,_,_,_,_,_,_,_,_,_,_),(ligacao(NAct,NX,_,_,_,_);ligacao(NX,NAct,_,_,_,_)),
no(NX,X,_,_,_,_,_,_,_,_,_,_,_),\+ member(X,LA),dfsCurto2(X,Dest,[X|LA],Cam).


plan_minlig(Orig,Dest,LCaminho_minlig):-
               % get_time(Ti),
		(melhor_caminho_minlig(Orig,Dest);true),
		retract(melhor_sol_minlig(LCaminho_minlig,_)).
		%get_time(Tf),
		%T is Tf-Ti,
		%write('Tempo de geracao da solucao:'),write(T),nl,
		%write(LCaminho_minlig).

melhor_caminho_minlig(Orig,Dest):-
		asserta(melhor_sol_minlig(_,10000)),
		dfsCurto(Orig,Dest,LCaminho),
		atualiza_melhor_minlig(LCaminho),
		fail.

atualiza_melhor_minlig(LCaminho):-
		melhor_sol_minlig(_,N),
		length(LCaminho,C),
		C<N,retract(melhor_sol_minlig(_,_)),
		asserta(melhor_sol_minlig(LCaminho,C)).
