import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagCloudPessoalService {

  private readonly perfilUrl = environment.apiUrl + 'Perfis/';

  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }
  
  getAllPerfis() {
    return this.http.get<Perfil[]>(this.perfilUrl);
  }
}
