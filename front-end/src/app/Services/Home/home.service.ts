import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Relacao } from 'src/app/Models/Relacao';
import { Perfil } from 'src/app/Models/Perfil';
import { Ligacao } from 'src/app/Models/Ligacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly urlPlan = 'http://localhost:4300';
  private readonly urlPer = environment.apiUrl + 'Perfis/';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores/';
  private readonly relacoesUrl = environment.apiUrl + 'Relacoes/';
  private readonly ligacoesUrl = environment.apiUrl + 'Ligacoes';

  constructor(private http: HttpClient) { }

  getAllJogadores():Observable<Jogador[]>{
    return this.http.get<Jogador[]>(this.jogadorUrl);
  }

  getPerfilByEmail(email: string): Observable<Perfil> {
    return this.http.get<Perfil>(this.urlPer + 'GetPerfilByEmail/' + email);
  }

  getJogadorAtual(perfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.jogadorUrl + 'GetJogadorByPerfil/' + perfil);
  }

  getPerfil(id: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.jogadorUrl + 'GetPerfilJogador/' + id);
  }

  getRelacoesJogador(id: any): Observable<Relacao[]> {
    return this.http.get<Relacao[]>(this.relacoesUrl + 'GetRelacoesDoJogador/' + id);
  }

  getJogadoresSugeridos(NTags: any): Observable<string[]> {
    const urlAux = this.urlPlan + '/api/CheckTags?nTags=' + NTags;
    return this.http.get<string[]>(urlAux);
  }

  registoLigacao(ligacao: Ligacao): Observable<Ligacao> {
    let bodystr = JSON.stringify(ligacao);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(bodystr);
    return this.http.post<Ligacao>(this.ligacoesUrl, bodystr, httpOptions);
  }
}
