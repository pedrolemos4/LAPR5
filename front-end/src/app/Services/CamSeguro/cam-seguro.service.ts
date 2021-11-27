import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamSeguroService {

  private readonly url = environment.apiUrl;  // URL to web api

  constructor(private httpClient: HttpClient) { }

  getJogadoresNaoAmigos(/*id do user atual*/): Observable<any> {
      return this.httpClient.get(this.url + 'jogadores' /*,id do user atual*/);
  }
}
