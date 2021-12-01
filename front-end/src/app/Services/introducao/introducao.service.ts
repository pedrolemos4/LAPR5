import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Introducao } from 'src/app/Models/Introducao';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { Relacao } from 'src/app/Models/Relacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntroducaoService {

  private readonly url = environment.apiUrl + 'Introducoes/';
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

  getPerfilJogador(jogId:any):Observable<Perfil> {
    return this.http.get<Perfil>(this.urlJog + '/GetPerfilJogador/' + jogId);
  }

  getIntroducoesAprovarRejeitar(jogadorId:any): Observable<Introducao[]> {
    return this.http.get<Introducao[]>(this.url + 'GetIntroducoesAprovarRejeitar/' + jogadorId);
  }

  criarRelacao1(relacao:Relacao): Observable<Relacao>{
    let bodystr = JSON.stringify(relacao);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    console.log(bodystr);
    return this.http.post<Relacao>(this.urlRel, bodystr, httpOptions);
  }

  criarRelacao2(relacao:Relacao): Observable<Relacao> {
    let bodystr = JSON.stringify(relacao);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<Relacao>(this.urlRel, bodystr, httpOptions);
  }

  patchIntroducao(introId:string, intro:Introducao): Observable<Introducao> {
    let bodystr = JSON.stringify(intro);
    console.log(intro);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',        
      })
    };
    console.log(introId);
    return this.http.patch<Introducao>(this.url + introId, bodystr, httpOptions);
  }
}
