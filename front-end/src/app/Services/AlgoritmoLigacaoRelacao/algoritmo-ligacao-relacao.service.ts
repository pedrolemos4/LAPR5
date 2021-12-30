import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlgoritmoLigacaoRelacaoService {

  private readonly urlProlog = environment.prologUrl;
  private readonly url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getPerfis(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(this.url + 'perfis');
  }
 
  getPerfilAtualEmail(email: any): Observable<Perfil> {
    return this.httpClient.get<Perfil>(this.url + 'perfis/GetPerfilByEmail/' + email);
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.httpClient.get<Jogador>(this.url + 'jogadores/GetJogadorByPerfil/' + idPerfil);
  }

  getAmigos(idJog: any): Observable<Jogador[]> {
    return this.httpClient.get<Jogador[]>(this.url + 'jogadores/GetAmigos/' + idJog);
  }

  getPerfilJogador(id: string): Observable<Perfil> {
    return this.httpClient.get<Perfil>(this.url + 'jogadores/GetPerfilJogador/' + id);
  }

  getResultadosAlgoritmo(orig: any, dest: any, nivel: any): Observable<string[]> {
    const urlAux = this.urlProlog + '/api/ForcaLigacaoRelacao?orig=' + orig + '&dest=' + dest + '&nivelLimite=' + nivel;
    return this.httpClient.get<string[]>(urlAux);
  }
}
