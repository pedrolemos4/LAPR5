import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PedirIntroducaoService {
  private readonly pedirIntroducaoUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  pedirIntroducao(player: string){
    return this.http.post(this.pedirIntroducaoUrl + 'introducoes',player);
  }
}
