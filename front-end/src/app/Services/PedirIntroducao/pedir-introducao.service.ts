import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { Introducao } from 'src/app/Models/Introducao';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PedirIntroducaoService {
  private readonly pedirIntroducaoUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJogadores(id: any): Observable<Jogador[]> {
    console.log(id);
    return this.http.get<Jogador[]>(this.pedirIntroducaoUrl + 'jogadores/GetPossiveisAmigos/' + id);
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.pedirIntroducaoUrl + 'jogadores/GetJogadorByPerfil/' + idPerfil);
  }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.pedirIntroducaoUrl + 'perfis/GetPerfilByEmail/' + email);
  }

  getPerfil(id: string): Observable<Perfil> {
    return this.http.get<Perfil>(this.pedirIntroducaoUrl + 'perfis/GetPerfil/' + id);
  }

  getPerfilJogador(id: string): Observable<Perfil> {
    return this.http.get<Perfil>(this.pedirIntroducaoUrl + 'jogadores/GetPerfilJogador/' + id);
  }

  getAmigosEmComum(id: string, idObj: string): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.pedirIntroducaoUrl + 'jogadores/GetAmigosEmComum/' + id + '/' + idObj);
  }

  pedirIntroducao(intro: Introducao): Observable<Introducao> {
    return this.http.post<Introducao>(this.pedirIntroducaoUrl + 'introducoes', intro);
  }
}
