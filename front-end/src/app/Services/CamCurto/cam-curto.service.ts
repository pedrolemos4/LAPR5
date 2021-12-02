import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil } from 'src/app/Models/Perfil';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jogador } from 'src/app/Models/Jogador';


@Injectable({
  providedIn: 'root'
})
export class CamCurtoService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'perfis/GetPerfilByEmail/' + email);
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.url + 'jogadores/GetJogadorByPerfil/' + idPerfil);
  }

  getAmigos(idJog: any): Observable<Jogador[]>{
    return this.http.get<Jogador[]>(this.url + 'jogadores/GetAmigos/' + idJog);
  }

  getPerfilJogador(id: string): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'jogadores/GetPerfilJogador/' + id);
  }
}
