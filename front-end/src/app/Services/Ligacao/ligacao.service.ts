import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LigacaoService {

  private readonly ligacoesUrl = environment.apiUrl + 'Ligacoes/'; // URL to web api
  private readonly perfilUrl = environment.apiUrl + 'Perfis/';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores';

  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil>{
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getJogadorAtual(perfil: any): Observable<Jogador>{
    return this.http.get<Jogador>(this.jogadorUrl + '/GetJogadorByPerfil/' + perfil);
  }
}
