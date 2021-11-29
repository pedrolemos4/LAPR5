import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil } from 'src/app/Models/Perfil';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private readonly perfilUrl = environment.apiUrl + 'Perfis/';

  constructor(private http: HttpClient) {
  }

  getPerfilAtual(email: any): Observable<Perfil>{
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  editarPerfil(id: any,perfil: Perfil): Observable<Perfil> {
    /*const params = new HttpParams()
    .set('id',id)
    .set('perfil',perfil);*/
    return this.http.put<Perfil>(this.perfilUrl + id,perfil);
  }
}
