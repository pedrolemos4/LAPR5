import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil } from 'src/app/Models/Perfil';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jogador } from 'src/app/Models/Jogador';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class CamForteService {

  private readonly url = environment.apiUrl;
  private readonly urlPlan = 'http://localhost:4300';

  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'perfis/GetPerfilByEmail/' + email);
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.url + 'jogadores/GetJogadorByPerfil/' + idPerfil);
  }

  getAmigos(idJog: any): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.url + 'jogadores/GetAmigos/' + idJog);
  }

  getPerfilJogador(id: string): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'jogadores/GetPerfilJogador/' + id);
  }

  getCaminhoForte(id: any, id2: any) {
    const urlAux = this.urlPlan + '/api/CaminhoMaisForte?origId=' + id + '&destId=' + id2;
    return this.http.get<string[]>(urlAux);
  }

}
