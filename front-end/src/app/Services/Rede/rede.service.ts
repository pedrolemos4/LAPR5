import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedeService {

  private readonly url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJogadores(): Observable<Jogador[]> {
    //ir buscar os jogadores e as relacoes ao master data
    return this.http.get<Jogador[]>(this.url + 'Jogadores');
  }
}
