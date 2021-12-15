import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil } from 'src/app/Models/Perfil';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jogador } from 'src/app/Models/Jogador';

@Injectable({
  providedIn: 'root'
})
export class SugerirAmigosService {

  private readonly url = environment.apiUrl;
  private readonly urlPlan = environment.prologUrl;

  constructor(private http: HttpClient) { }

  getAmigosSugeridos(id: any, nivel: any) {
    const urlAux = this.urlPlan + '/api/SugerirConexoes?idNo=' + id + '&nivel=' + nivel;  //http://localhost:4300/api/SugerirConexoes?idNo=113951b3-076b-4702-bba9-2b0dbe720e72&nivel=2
    return this.http.get<string[]>(urlAux);
  }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.url + 'perfis/GetPerfilByEmail/' + email);
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.url + 'jogadores/GetJogadorByPerfil/' + idPerfil);
  }
}
