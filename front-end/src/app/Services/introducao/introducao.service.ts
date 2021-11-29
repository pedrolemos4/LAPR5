import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Introducao } from 'src/app/Models/Introducao';
import { Jogador } from 'src/app/Models/Jogador';
import { Relacao } from 'src/app/Models/Relacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntroducaoService {

  private readonly url = environment.apiUrl + 'Introducoes';
  private readonly urlPer = environment.apiUrl + 'Perfis';
  private readonly urlJog = environment.apiUrl + 'Jogadores';
  private readonly urlRel = environment.apiUrl + 'Relacoes';

  constructor(private http: HttpClient) { }

  getPerfilByEmail(email:string): Observable<any> {
    return this.http.get(this.urlPer + '/GetPerfilByEmail/' + email);
  }

  getJogadorByPerfil(perfilId:any): Observable<Jogador> {
    return this.http.get<Jogador>(this.urlJog + '/GetJogadorByPerfil/' + perfilId);
  }

  getIntroducoesAprovarRejeitar(jogadorId:any): Observable<Introducao[]> {
    return this.http.get<Introducao[]>(this.url + '/GetIntroducoesAprovarRejeitar/' + jogadorId);
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
