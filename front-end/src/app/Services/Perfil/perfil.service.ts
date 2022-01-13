import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Perfil } from 'src/app/Models/Perfil';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { Ligacao } from 'src/app/Models/Ligacao';
import { Relacao } from 'src/app/Models/Relacao';
import { Post } from 'src/app/Models/Post';
import { Comentario } from 'src/app/Models/Comentario';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private readonly perfilUrl = environment.apiUrl + 'Perfis/';
  private readonly ligacoesUrl = environment.apiUrl + 'Ligacoes/';
  private readonly jogadoresUrl = environment.apiUrl + 'Jogadores/';
  private readonly relacoesUrl = environment.apiUrl + 'Relacoes/';
  private readonly postUrl = environment.masterDataPostsUrl + 'posts/';
  private readonly comentarPostUrl = environment.masterDataPostsUrl + 'comentarios/';

  constructor(private http: HttpClient) {
  }

  patchTags(id: any, selected: Perfil): Observable<Perfil> {
    let bodystr = JSON.stringify(selected);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.patch<Perfil>(this.perfilUrl + id, bodystr, httpOptions);
  }

  editarPerfil(id: any, perfil: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(this.perfilUrl + id, perfil);
  }

  getPerfilAtual(email: any): Observable<Perfil> {
    return this.http.get<Perfil>(this.perfilUrl + 'GetPerfilByEmail/' + email);
  }

  getJogador(idPerfil: any): Observable<Jogador> {
    return this.http.get<Jogador>(this.jogadoresUrl + 'GetJogadorByPerfil/' + idPerfil);
  }

  getLigacoesJogador(idJogador: any): Observable<Array<Ligacao>> {
    return this.http.get<Array<Ligacao>>(this.ligacoesUrl + 'GetLigacaoJogador/' + idJogador);
  }

  getRelacoesDoJogador(idJogador: any): Observable<Array<Relacao>> {
    return this.http.get<Array<Relacao>>(this.relacoesUrl + 'GetRelacoesDoJogador/' + idJogador);
  }

  getPostsJogador(email: any): Observable<Post[]> {
    const params = new HttpParams().append('param', email);
    return this.http.get<Post[]>(this.postUrl + 'getPostsByEmail', { params });
  }

  deletePosts(idPost: any) {
    const params = new HttpParams().append('param', idPost);
    return this.http.delete<Post>(this.postUrl + 'delete', { params });
  }

  getComentariosJogador(email: any): Observable<Comentario[]> {
    const params = new HttpParams().append('param', email);
    return this.http.get<Comentario[]>(this.comentarPostUrl + 'getComentariosByAutor', { params });
  }

  deleteComentarios(idComentario: any) {
    const params = new HttpParams().append('param', idComentario);
    return this.http.delete(this.comentarPostUrl + 'delete', { params });
  }

  atualizaPostComentarios(idComentario: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put(this.postUrl + 'atualizaComments', { id: idComentario }, httpOptions);
  }

  deleteLigacao(id: string) {
    return this.http.delete(this.ligacoesUrl + id);
  }

  deleteJogador(id: string) {
    return this.http.delete(this.jogadoresUrl + id);
  }

  deletePerfil(id: string) {
    return this.http.delete(this.perfilUrl + id);
  }

  deleteRelacao(id: string) {
    return this.http.delete(this.relacoesUrl + id);
  }
}
