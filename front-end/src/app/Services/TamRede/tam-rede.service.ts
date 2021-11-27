import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TamRedeService {

  private readonly url = environment.apiUrl;  // URL to web api

  constructor(private httpClient: HttpClient) { }
  
}
