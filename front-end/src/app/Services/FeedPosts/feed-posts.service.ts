import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private readonly postUrl = environment.masterDataPostsUrl + 'posts';
  private readonly comentarPostUrl = environment.masterDataPostsUrl + 'comentarios';
  private readonly urlProlog = environment.prologUrl;

  constructor(private http: HttpClient) { }

  getAllPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.perfilUrl);
  }

  getPosts(email: string): Observable<Post[]> {
    const params = new HttpParams().append('param', email);
    return this.http.get<Post[]>(this.postUrl + '/getPostsByEmail', { params });
  }

  getComentarioById(id: string): Observable<Comentario> {
    const params = new HttpParams().append('id', id);
    return this.http.get<Comentario>(this.comentarPostUrl + '/getById', { params });
  }

  updateLikePost(post: Post): Observable<Post>{
    return this.http.put<Post>(this.postUrl + '/updateLikes', post);
  }

  updateDislikePost(post: Post): Observable<Post>{
    return this.http.put<Post>(this.postUrl + '/updateDislikes', post);
  }

  updateLikeComentario(comentario: any) {
    return this.http.put(this.comentarPostUrl + '/updateLikes', comentario);
  }

  updateDislikeComentario(comentario: Comentario) {
    return this.http.put<Comentario>(this.comentarPostUrl + '/updateDislikes', comentario);
  }

  adicionarComentario(comentario: any): Observable<Comentario>{
    let bodystr = JSON.stringify(comentario);
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Comentario>(this.comentarPostUrl + '/', comentario);
  }

  updateEstadosJogador(email: string, nLikes: any, nDislikes: any) {
    const urlAux = this.urlProlog + '/api/CalculoNovosEstadosLikesDislikes?utilizador=' + email + '&nLikes=' + nLikes + '&nDislikes=' + nDislikes;
    return this.http.get<string[]>(urlAux);
  }

}
