import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FortalezaRedeService {

  private readonly perfilUrl = environment.apiUrl + 'Perfis/';
  private readonly jogadorUrl = environment.apiUrl + 'Jogadores';
  private readonly urlPlan = environment.prologUrl;

  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil>{
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getJogadorAtual(perfil: any): Observable<Jogador>{
    return this.http.get<Jogador>(this.jogadorUrl + '/GetJogadorByPerfil/' + perfil);
  }

  getFortalezaRede(id: any) {
    const urlAux = this.urlPlan + '/api/FortalezaRede?numero=' + id;
    console.log(urlAux);
    return this.http.get<string>(urlAux);
  }

}
