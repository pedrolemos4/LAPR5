import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil } from 'src/app/Models/Perfil';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Introducao } from 'src/app/Models/Introducao';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPerfilByEmail(email:string): Observable<Perfil>{
    return this.http.get<Perfil>(this.url + 'Perfis/GetPerfilByEmail/' + email);
  }

  getJogadorByPerfil(perfilId:any): Observable<Jogador> {
    return this.http.get<Jogador>(this.url+ 'Jogadores/GetJogadorByPerfil/' + perfilId);
  }

  getPerfilJogador(jogId:any):Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'Jogadores/GetPerfilJogador/' + jogId);
  }

  getIntroducoesPendentes(jogadorId:any): Observable<Introducao[]> {
    return this.http.get<Introducao[]>(this.url + 'Introducoes/GetIntroducoesPorAprovar/' + jogadorId);
  } 

  patchIntroducao(introId:string, intro:Introducao): Observable<Introducao> {
    let bodystr = JSON.stringify(intro);
    console.log(intro);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',        
      })
    };
    console.log(introId);
    return this.http.patch<Introducao>(this.url + 'Introducoes/' + introId, bodystr, httpOptions);
  }

}
