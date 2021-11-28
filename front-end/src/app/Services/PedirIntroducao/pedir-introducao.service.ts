import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PedirIntroducaoService {
  private readonly pedirIntroducaoUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJogadores(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.pedirIntroducaoUrl + 'jogadores');
  }

  pedirIntroducao(player: string) {
    console.log(player);
    return this.http.post(this.pedirIntroducaoUrl + 'introducoes', player);
  }
}
