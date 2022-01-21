import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/Models/Perfil';
import { Post } from 'src/app/Models/Post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsTodosJogadoresService {

  private readonly perfilUrl = environment.apiUrl + 'Perfis';
  private readonly postUrl = environment.masterDataPostsUrl + 'posts';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  getPerfilByEmail(email: any){
    return this.http.get<Perfil>(this.perfilUrl + '/GetPerfilByEmail/' + email);
  }
}
