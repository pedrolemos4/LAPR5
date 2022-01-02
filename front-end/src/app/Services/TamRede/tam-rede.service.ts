import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TamRedeService {

  private readonly url = environment.apiUrl;  // URL to web api
  private readonly urlPlan = environment.prologUrl;

  constructor(private http: HttpClient) { }
  
  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'perfis/GetPerfilByEmail/' + email);
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.url + 'jogadores/GetJogadorByPerfil/' + idPerfil);
  }

  getTamRede(IdJogador: any, Nivel: string): Observable<string> {
    const urlAux = this.urlPlan + '/api/CalcularTamanhoRede?idJog=' + IdJogador + '&nivel=' + Nivel;
    return this.http.get<string>(urlAux);
  }

  getDimensaoTotal(): Observable<string> {
    const urlAux = this.url + 'jogadores';
    return this.http.get<string>(urlAux);
  }
}
