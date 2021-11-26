import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Introducao } from 'src/app/Models/Introducao';
import { Relacao } from 'src/app/Models/Relacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntroducaoService {

  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getIntroducoesPendentes(/*id do user atual*/): Observable<Introducao[]> {
    //ir buscar os jogadores e as relacoes ao master data
    return this.http.get<Introducao[]>(this.url + 'Introducoes');
  }

  aceitarIntroducao(relacao: Relacao, relacao2: Relacao, estado: string): Observable<any> {
    this.http.patch(this.url + 'introducao', estado);
    this.http.post(this.url + 'relacoes', relacao);
    return this.http.post(this.url + 'relacoes', relacao2);
  }

  rejeitarIntroducao(estado: string): Observable<any> {
    return this.http.patch(this.url + 'introducao', estado);
  }
}
