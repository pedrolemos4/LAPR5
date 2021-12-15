import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { Relacao } from 'src/app/Models/Relacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagRelacaoUserService {
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

  getRelacoesJogador(jogadorId:any): Observable<Relacao[]> {
    return this.http.get<Relacao[]>(this.urlRel + '/GetRelacoesDoJogador/' + jogadorId);
  }

  getPerfilJogador(jogadorId:any): Observable<Perfil> {
    return this.http.get<Perfil>(this.urlJog + '/GetPerfilJogador/' + jogadorId);
  }
}
