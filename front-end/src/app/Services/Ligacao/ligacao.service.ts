import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Ligacao } from 'src/app/Models/Ligacao';
import { Perfil } from 'src/app/Models/Perfil';
import { Relacao } from 'src/app/Models/Relacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LigacaoService {

  private readonly ligacoesUrl = environment.apiUrl + 'Ligacoes'; // URL to web api
  private readonly perfilUrl = environment.apiUrl + 'Perfis/';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores';
  private readonly relacoesUrl = environment.apiUrl + 'Relacoes/';

  constructor(private http: HttpClient) { }

  getPerfilByNome(nome: string): Observable<Perfil>{
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByNome/' + nome);
  }

  getPerfilByPais(pais: string): Observable<Perfil[]>{
    return this.http.get<Perfil[]>(this.perfilUrl + 'GetPerfilByPais/' + pais);
  }

  getPerfilByEmail(email: string): Observable<Perfil> {
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getPerfilAtual(email: any): Observable<Perfil>{
    console.log(email);
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getJogadorAtual(perfil: any): Observable<Jogador>{
    return this.http.get<Jogador>(this.jogadorUrl + '/GetJogadorByPerfil/' + perfil);
  }

  getRelacao(arg0: string | null, id: any): Observable<Relacao> {
    return this.http.get<Relacao>(this.relacoesUrl + 'GetRelacaoComDoisIds/' + arg0 + '/' + id);
  }

  getRelacoes(id: any): Observable<Relacao[]> {
    return this.http.get<Relacao[]>(this.relacoesUrl + 'GetRelacoesDoJogador/' + id);
  }

  registoLigacao(ligacao: Ligacao): Observable<Ligacao> {
    let bodystr = JSON.stringify(ligacao);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',        
      })
    };
    console.log(bodystr);
    return this.http.post<Ligacao>(this.ligacoesUrl, bodystr, httpOptions);
  }
}
