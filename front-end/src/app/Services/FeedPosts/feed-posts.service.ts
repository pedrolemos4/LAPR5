import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/Models/Comentario';
import { Perfil } from 'src/app/Models/Perfil';
import { Post } from 'src/app/Models/Post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedPostsService {

  private readonly perfilUrl = environment.apiUrl + 'Perfis';
  private readonly postUrl = environment.masterDataPostsUrl;
  private readonly comentarPostUrl = environment.masterDataPostsUrl;

  constructor(private http: HttpClient) { }

  getAllPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.perfilUrl);
  }

  getPosts(email: string): Observable<Post[]> {
    const params = new HttpParams().append('param', email);
    return this.http.get<Post[]>(this.postUrl + 'posts/getPostsByEmail', { params });
  }

  getComentarioById(id: string): Observable<Comentario> {
    const params = new HttpParams().append('id', id);
    return this.http.get<Comentario>(this.comentarPostUrl + 'comentarios/getById', { params });
  }

  updateLikePost(post: Post): Observable<Post>{
    return this.http.put<Post>(this.postUrl + 'posts/updateLikes', post);
  }

  updateDislikePost(post: Post): Observable<Post>{
    return this.http.put<Post>(this.postUrl + 'posts/updateDislikes', post);
  }

}
