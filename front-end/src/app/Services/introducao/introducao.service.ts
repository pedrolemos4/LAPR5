import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Introducao } from 'src/app/Models/Introducao';
import { Relacao } from 'src/app/Models/Relacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntroducaoService {

  private readonly url = environment.apiUrl + 'Introducoes';
  private readonly urlRel = environment.apiUrl + 'Relacoes';

  constructor(private http: HttpClient) { }

  getIntroducoesPendentes(/*id do user atual*/): Observable<Introducao[]> {
    //ir buscar os jogadores e as relacoes ao master data
    return this.http.get<Introducao[]>(this.url + '/aprovar/' /* + id do user atual */).pipe(
        map((res:any) => res.id)
    );
  }

  aceitarIntroducao(estado:string): Observable<any> {
    return this.http.patch(this.url + '/patch/', estado);  
  }

  criarRelacao1(relacao:Relacao): Observable<Relacao> {
    return this.http.post<Relacao>(this.urlRel, relacao);
  }

  criarRelacao2(relacao:Relacao): Observable<Relacao> {
    return this.http.post<Relacao>(this.urlRel, relacao);
  }

  rejeitarIntroducao(estado:string): Observable<any> {
    return this.http.patch(this.url + '/patch/', estado);
  }
}
