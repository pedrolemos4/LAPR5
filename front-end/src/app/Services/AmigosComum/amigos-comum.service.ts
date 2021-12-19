import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil } from 'src/app/Models/Perfil';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jogador } from 'src/app/Models/Jogador';
import { Relacao } from 'src/app/Models/Relacao';

@Injectable({
  providedIn: 'root'
})
export class AmigosComumService {

  private readonly url = environment.apiUrl;
  private readonly relacoesUrl = environment.apiUrl + 'Relacoes/';

  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'perfis/GetPerfilByEmail/' + email);
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.url + 'jogadores/GetJogadorByPerfil/' + idPerfil);
  }

  getRelacoesJogador(id: any): Observable<Relacao[]> {
    return this.http.get<Relacao[]>(this.relacoesUrl + 'GetRelacoesDoJogador/' + id);
  }

  getJogadorById(id: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.url + 'jogadores/GetJogador/' + id);
  }

  getPerfilById(id: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'perfis/GetPerfil/' + id);
  }

}


