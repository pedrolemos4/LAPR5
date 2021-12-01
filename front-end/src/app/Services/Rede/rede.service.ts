import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Relacao } from 'src/app/Models/Relacao';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedeService {

  private readonly perfilUrl = environment.apiUrl + 'Perfis/';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores/';
  private readonly relacaoUrl = environment.apiUrl + 'Relacoes/';
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJogadores(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.url + 'Jogadores');
  }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getJogadorAtual(perfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.jogadorUrl + 'GetJogadorByPerfil/' + perfil);
  }

  getPerfil(id: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.jogadorUrl + 'GetPerfilJogador/' + id)
  }

  getRelacao(id: any): Observable<Relacao []> {
    return this.http.get<Relacao []>(this.relacaoUrl + 'GetRelacoesDoJogador/' + id);
  }
}
