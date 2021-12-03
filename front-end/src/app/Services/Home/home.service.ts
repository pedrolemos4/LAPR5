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
export class HomeService {

  private readonly urlPer = environment.apiUrl + 'Perfis/';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores/';
  private readonly relacoesUrl = environment.apiUrl + 'Relacoes/';

  constructor(private http: HttpClient) { }

  getPerfilByEmail(email: string): Observable<Perfil> {
    return this.http.get<Perfil>(this.urlPer + 'GetPerfilByEmail/' + email);
  }

  getJogadorAtual(perfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.jogadorUrl + 'GetJogadorByPerfil/' + perfil);
  }

  getPerfil(id: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.jogadorUrl + 'GetPerfilJogador/' + id);
  }

  getRelacoesJogador(id: any): Observable<Relacao []>{
    return this.http.get<Relacao []>(this.relacoesUrl + 'GetRelacoesDoJogador/' + id);
  }
}
