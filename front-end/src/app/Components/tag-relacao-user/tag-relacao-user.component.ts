import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { Relacao } from 'src/app/Models/Relacao';
import { TagRelacaoUserService } from 'src/app/Services/TagRelacaoUser/tag-relacao-user.service';

@Component({
  selector: 'app-tag-relacao-user',
  templateUrl: './tag-relacao-user.component.html',
  styleUrls: ['./tag-relacao-user.component.css']
})
export class TagRelacaoUserComponent implements OnInit {
  listTags: string[] = new Array<string>();
  listTagsAux: string[] = new Array<string>();
  listRelacoes: Relacao[] = new Array<Relacao>();
  listNomes: string[] = new Array<string>();

  emailUser: string = '';
  perfilUser!: Perfil;
  idPerfilUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: string = '';
  constructor(private router: Router, private toastr: ToastrService, private tagRelacaoUserService: TagRelacaoUserService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.tagRelacaoUserService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      this.perfilUser = Perfil;
      this.idPerfilUser = Perfil.id;
      this.tagRelacaoUserService.getJogadorByPerfil(this.idPerfilUser).subscribe(Response => {
        this.currentUser = Response;
        this.idCurrentUser = this.currentUser.id;
        this.tagRelacaoUserService.getRelacoesJogador(this.idCurrentUser).subscribe(Relacoes => {
          this.listRelacoes = Relacoes
          this.listRelacoes.forEach((relacao: any) => {
            this.listTagsAux.push(relacao.tags);
            var aux = this.listTagsAux[0];
            for(var i = 0; i < aux.length; i++){
              if(this.listTags.indexOf(aux[i]) <= -1){
                this.listTags.push(aux[i]);
              }
            }
            this.listTagsAux.pop();
          });
        });
      });
    });
  }
}
