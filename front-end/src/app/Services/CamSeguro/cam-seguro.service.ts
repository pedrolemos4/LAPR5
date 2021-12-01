import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamSeguroService {

  private readonly url = environment.apiUrl + 'jogadores';  // URL to web api
  private readonly urlPer = environment.apiUrl + 'Perfis';

  constructor(private httpClient: HttpClient) { }

  getPerfilByEmail(email:string): Observable<any> {
    return this.httpClient.get(this.urlPer + '/GetPerfilByEmail/' + email);
  }

  getJogadorByPerfil(perfilId:any): Observable<Jogador> {
    return this.httpClient.get<Jogador>(this.url + '/GetJogadorByPerfil/' + perfilId);
  }

  getPerfilById(idJog: any): Observable<Perfil> {
    return this.httpClient.get<Perfil>(this.urlPer + '/GetPerfil/' + idJog);
  }

  getAmigosPossiveis(jogadorId:any): Observable<any> {
      return this.httpClient.get(this.url + '/GetPossiveisAmigos/' + jogadorId);
  }
}
