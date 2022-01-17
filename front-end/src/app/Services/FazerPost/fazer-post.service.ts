import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/Models/Post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FazerPostService {

  private readonly fazerPostUrl = environment.masterDataPostsUrl;

  constructor(private http: HttpClient) { }

  publicarPost(post: Post): Observable<Post>{
    let bodystr = JSON.stringify(post);
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Post>(this.fazerPostUrl + 'posts', post);
  }
}
