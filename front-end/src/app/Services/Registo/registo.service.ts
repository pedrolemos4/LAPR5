import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getByEmail(email: any) {
    return this.httpClient.get<Perfil>(this.urlPerfil + '/GetPerfilByEmail/' + email);
  }

  getAllEmails() {
    return this.httpClient.get<string[]>(this.urlPerfil + '/GetAllEmails');
  }

   registoPerfil(perfil: Perfil): Observable<Perfil> {
    let bodystr = JSON.stringify(perfil);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',        
      })
    };
    console.log(bodystr);
     return this.httpClient.post<Perfil>(this.urlPerfil, bodystr, httpOptions);
   }

  registoJogador(jog:Jogador): Observable<Jogador> {
    let bodystr = JSON.stringify(jog);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',        
      })
    };
    return this.httpClient.post<Jogador>(this.urlJogador, bodystr, httpOptions);
  }
}
