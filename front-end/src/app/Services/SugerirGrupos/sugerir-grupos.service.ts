import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/Models/Perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SugerirGruposService {

  private readonly url =environment.apiUrl;
  private readonly urlPlan = environment.prologUrl;
  private readonly urlPerfil = environment.apiUrl + 'perfis';

  constructor(private http: HttpClient) { }

  getGrupos(nTags: any, nUsers: any,tagsObg: string[]){
    console.log(nTags);
    console.log(nUsers);
    console.log(tagsObg);
    if(tagsObg.toString() == ''){
      console.log("linha")
      let lista= JSON.stringify([]);
      return this.http.get<string[]>(this.urlPlan + '/api/SugerirGrupo?nTags='+nTags +'&nUsers=' + nUsers + '&tagsObg='+lista);
    }
    return this.http.get<string[]>(this.urlPlan + '/api/SugerirGrupo?nTags='+nTags +'&nUsers=' + nUsers + '&tagsObg=' +tagsObg);
  }

  getAllPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.urlPerfil);
  }

  alteraEstados(emailCurrentUser: string, valores: string, listaPretendida: string[], listaNaoDesejados: string[]) {
    return this.http.get<string[]>(this.urlPlan + '/api/CalculoNovosEstadosEsperancaAlivioMedoDececao?utilizador='+emailCurrentUser +'&listaSugerida=' + valores + '&listaPretendida=' +listaPretendida.toString()+ '&listaNaoDesejada=' +listaNaoDesejados.toString());
  }
}
