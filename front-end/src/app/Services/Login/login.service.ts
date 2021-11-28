import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginUrl = environment.apiUrl + 'Jogadores/'; // URL to web api

  constructor(private http: HttpClient) {
  }

   login(email: string, password:string) {
     console.log(email);
     return this.http.get(this.loginUrl + email + '/' + password);
   }

}
