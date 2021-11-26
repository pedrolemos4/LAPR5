import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private readonly perfilUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  editarPerfil(formData: any) {
    return this.http.put(this.perfilUrl + 'perfil',formData);
  }
}
