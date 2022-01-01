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
export class VerForcaRelacaoService {

  private readonly url = environment.apiUrl;
  private readonly urlRel = environment.apiUrl + 'Relacoes';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores';

  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'perfis/GetPerfilByEmail/' + email);
  }

  getPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.url + 'Perfis/');
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.url + 'jogadores/GetJogadorByPerfil/' + idPerfil);
  }

  getPerfilJogador(id: string): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'jogadores/GetPerfilJogador/' + id);
  }

  getRelacoesJogador(jogadorId: any): Observable<Relacao[]> {
    return this.http.get<Relacao[]>(this.urlRel + '/GetRelacoesDoJogador/' + jogadorId);
  }
}
