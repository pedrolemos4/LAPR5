import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly urlPer = environment.apiUrl + 'Perfis';

  constructor(private http: HttpClient) { }

  getPerfilByEmail(email:string): Observable<any> {
    return this.http.get(this.urlPer + '/GetPerfilByEmail/' + email);
  }
}
