import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/app/Models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginUrl = environment.apiUrl + 'Jogadores/'; // URL to web api

  constructor(private http: HttpClient) {
  }

   login(loginForm: LoginUser) {
     console.log(loginForm);
     return this.http.post(this.loginUrl + 'Login', loginForm);
   }

}
