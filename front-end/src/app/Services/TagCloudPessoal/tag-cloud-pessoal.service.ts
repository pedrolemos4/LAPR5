import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/Models/Perfil';
import { Post } from 'src/app/Models/Post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagCloudPessoalService {

  private readonly perfilUrl = environment.apiUrl + 'Perfis/';
  private readonly postUrl = environment.masterDataPostsUrl + 'posts';
  constructor(private http: HttpClient) { }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getAllPerfis() {
    return this.http.get<Perfil[]>(this.perfilUrl);
  }

  getPosts(email: string): Observable<Post[]> {
    const params = new HttpParams().append('param', email);
    return this.http.get<Post[]>(this.postUrl + '/getPostsByEmail', { params });
  }
}
