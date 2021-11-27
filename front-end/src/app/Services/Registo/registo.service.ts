import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistoService {

  private readonly urlPerfil = environment.apiUrl + 'perfis';  // URL to web api
  private readonly urlJogador = environment.apiUrl + 'jogadores';

  constructor(private httpClient: HttpClient) { }

   registoPerfil(perfil: Perfil): Observable<Perfil> {
     return this.httpClient.post<Perfil>(this.urlPerfil, perfil);
   }

  registoJogador(jog:Jogador): Observable<Jogador> {
    return this.httpClient.post<Jogador>(this.urlJogador, jog);
  }
}
