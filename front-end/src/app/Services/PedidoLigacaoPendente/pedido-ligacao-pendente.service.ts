import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Ligacao } from 'src/app/Models/Ligacao';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';
import { Relacao } from 'src/app/Models/Relacao';

@Injectable({
  providedIn: 'root'
})
export class PedidoLigacaoPendenteService {

  private readonly url = environment.apiUrl + 'Ligacoes/';
  private readonly perfilUrl = environment.apiUrl + 'Perfis/';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores/';

  constructor(private http: HttpClient) { }

  getListaLigacoesPendentes(id: any): Observable<Ligacao[]> {
    return this.http.get<Ligacao[]>(this.url + 'GetLigacaoPendente/' + id);
  }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getPerfilAtualId(id: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfil/' + id);
  }

  getJogadorAtual(perfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.jogadorUrl + 'GetJogadorByPerfil/' + perfil);
  }

  getJogadorByIdJogador(id: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.jogadorUrl + 'GetJogador/' + id);
  }

  patchLigacao(id: string, ligacao: Ligacao): Observable<Ligacao> {
    let bodystr = JSON.stringify(ligacao);
    console.log(ligacao);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(id);
    return this.http.patch<Ligacao>(this.url + id, bodystr, httpOptions);
  }

  registoRelacao(perfil: Relacao): Observable<Relacao> {
    let bodystr = JSON.stringify(perfil);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(bodystr);
    return this.http.post<Relacao>(environment.apiUrl + 'Relacoes/', bodystr, httpOptions);
  }

}
