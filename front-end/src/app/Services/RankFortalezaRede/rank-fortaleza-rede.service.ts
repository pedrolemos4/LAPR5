import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { environment } from 'src/environments/environment';
import { Perfil } from 'src/app/Models/Perfil';

@Injectable({
  providedIn: 'root'
})
export class RankFortalezaRedeService {

  private readonly apiUrl = environment.apiUrl;
  private readonly prologUrl = environment.prologUrl;

  constructor(private http: HttpClient) { }

  getAllJogadores(){
    return this.http.get<Jogador[]>(this.apiUrl + 'Jogadores/');
  }

  getFortalezaRede(id: any) {
    const urlAux = this.prologUrl + '/api/FortalezaRede?numero=' + id;
    return this.http.get<string>(urlAux);
  }

  getPerfil(id:any) : Observable<Perfil>{
    return this.http.get<Perfil>(this.apiUrl+ 'GetPerfilJogador/' + id);
  }

}
