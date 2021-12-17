import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsTodosJogadoresService {

  private readonly perfilUrl = environment.apiUrl + 'Perfis/';

  constructor(private http: HttpClient) { }

  getAllPerfis() {
    return this.http.get<Perfil[]>(this.perfilUrl);
  }
}
