import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SugerirGruposService {

  private readonly url =environment.apiUrl;
  private readonly urlPlan = environment.prologUrl;

  constructor(private http: HttpClient) { }

  getGrupos(nTags: any, nUsers: any){
    console.log(nTags);
    console.log(nUsers);
  }
}
