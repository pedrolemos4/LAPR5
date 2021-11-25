import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistoService {

  private readonly url = environment.apiUrl;  // URL to web api

  constructor(private httpClient: HttpClient) { }

  registo(jogador: Jogador): Observable<any> {
      return this.httpClient.post(this.url + 'jogadores', jogador);
  }

}
