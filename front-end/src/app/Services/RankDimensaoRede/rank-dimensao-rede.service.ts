import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Jogador } from 'src/app/Models/Jogador';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/Models/Perfil';

@Injectable({
  providedIn: 'root'
})
export class RankDimensaoRedeService {

  private readonly url = environment.apiUrl;
  private readonly urlPlan = environment.prologUrl;

  constructor(private http: HttpClient) { }

  getAllJogadores(){
    return this.http.get<Jogador[]>(this.url + 'Jogadores/');
  }

  
  getTamRede(IdJogador: any, Nivel: string): Observable<string> {
    const urlAux = this.urlPlan + '/api/CalcularTamanhoRede?idJog=' + IdJogador + '&nivel=' + Nivel;
    return this.http.get<string>(urlAux);
  }

  getPerfil(id:any) : Observable<Perfil>{
    return this.http.get<Perfil>(this.url+ 'Jogadores/GetPerfilJogador/' + id);
  }

}
