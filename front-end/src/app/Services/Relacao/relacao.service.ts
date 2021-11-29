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
export class RelacaoService {
  
  private readonly relacoesUrl = environment.apiUrl + 'Relacoes/'; // URL to web api
  private readonly perfilUrl = environment.apiUrl + 'Perfis/';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores';

  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil>{
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getJogadorAtual(perfil: any): Observable<Jogador>{
    return this.http.get<Jogador>(this.jogadorUrl + '/GetJogadorByPerfil/' + perfil);
  }

  getListRelacoes(currentUser: any) : Observable<Relacao[]>{
    return this.http.get<Relacao[]>(this.relacoesUrl + 'GetRelacoesDoJogador/' + currentUser);
  }

  getPerfilById(jogador2: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.jogadorUrl + '/GetPerfilJogador/' + jogador2);
  }

  getRelacao(arg0: string | null, id: any): Observable<Relacao> {
    return this.http.get<Relacao>(this.relacoesUrl + 'GetRelacaoComDoisIds/' + arg0 + '/' + id);
  }

  getRelacaoById(relId: string) : Observable<Relacao>{
    return this.http.get<Relacao>(this.relacoesUrl + 'GetRelacao/' + relId)
  }

  patchRelacao(id: any, selected: Relacao): Observable<Relacao> {
    return this.http.patch<Relacao>(this.relacoesUrl + id , selected);
  }

}
