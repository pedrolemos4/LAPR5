import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { Relacao } from 'src/app/Models/Relacao';
import { TagRelacaoUserService } from 'src/app/Services/TagRelacaoUser/tag-relacao-user.service';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-tag-relacao-user',
  templateUrl: './tag-relacao-user.component.html',
  styleUrls: ['./tag-relacao-user.component.css']
})
export class TagRelacaoUserComponent implements OnInit {
  @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;

  options: CloudOptions = {
    width: 0.9,
    height: 200,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3,
      delay: 0.3
    },
    realignOnResize: true
  };
  
  listTags: string[] = new Array<string>();
  listTagsAux: string[] = new Array<string>();
  listRelacoes: Relacao[] = new Array<Relacao>();
  listAmigosAux: string[] = new Array<string>();
  listAmigos: Perfil[] = new Array<Perfil>();

  emailUser: string = '';
  perfilUser!: Perfil;
  idPerfilUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: string = '';
  data: CloudData[] = [{
    text: '',
    weight: 2,
    color: '#ffaaee',
    link: null,
    rotate: null
  }];
  dict = {};
  
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
          Relacoes.forEach(element => {
            var aux = element.tags;
            aux.forEach(tag => {
              this.listTagsAux.push(tag);
            })
          });
          // passar lista de listas para string
          var lista = this.listTagsAux.join(",");
  
          // passar string para lista
          var lista1 = lista.split(",");
          lista1.forEach(element => {
            if (this.listTags.includes(element) == false) {
              this.listTags.push(element);
              this.dict[element] = 0;
            }
            var x = this.dict[element];
            this.dict[element] = x + 1;
          });
          for (let key in this.dict) {
            var color: string = this.generateRandomCode();
            this.putOnCloud(key, this.dict[key], color);
            
          }
        });
      });
    });
  }

  putOnCloud(texto: any, peso: any, color1: any){
    var x: CloudData = {
      text: texto,
      weight: peso,
      color: color1,
      link: null,
      rotate: null
    };
    this.data.push(x);
  }

  generateRandomCode() {
    var myRandomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return myRandomColor;
  }

  reDraw() {
    this.tagCloudComponent.reDraw();
  }

  logClicked(clicked: CloudData){
    this.listAmigosAux = new Array<string>();
    this.listAmigos = new Array<Perfil>();
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
              if (relacao.tags.includes(clicked.text)) {
                this.tagRelacaoUserService.getPerfilJogador(relacao.jogador2).subscribe(Perfil => {
                  if(this.listAmigosAux.indexOf(Perfil.email) <= -1){
                    this.listAmigosAux.push(Perfil.email);
                    this.listAmigos.push(Perfil);
                  }
                })
              }
            }
            this.listTagsAux.pop(); 
          });
        });
      });
    });
    this.listAmigos = [];
  }
}
