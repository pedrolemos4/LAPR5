import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Ligacao } from 'src/app/Models/Ligacao';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';

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

}
