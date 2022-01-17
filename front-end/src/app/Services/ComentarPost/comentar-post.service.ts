import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/Models/Comentario';
import { Post } from 'src/app/Models/Post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarPostService {

  private readonly comentarPostUrl = environment.masterDataPostsUrl;

  constructor(private http: HttpClient) { }

  obterPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.comentarPostUrl + 'posts');
  }

  adicionarComentario(comentario: any): Observable<Comentario>{
    let bodystr = JSON.stringify(comentario);
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(comentario);  
    return this.http.post<Comentario>(this.comentarPostUrl + 'comentarios/', comentario);
  }

  getComentarioById(id: string): Observable<Comentario> {
    const params = new HttpParams().append('id',id);
    return this.http.get<Comentario>(this.comentarPostUrl + 'comentarios/getById', {params});
  }
}