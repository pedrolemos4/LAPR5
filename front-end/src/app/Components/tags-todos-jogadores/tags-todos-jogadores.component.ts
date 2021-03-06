import { Component, OnInit, ViewChild } from '@angular/core';
import { TagCloudComponent } from 'angular-tag-cloud-module';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { TagsTodosJogadoresService } from 'src/app/Services/TagsTodosJogadores/tags-todos-jogadores.service';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tags-todos-jogadores',
  templateUrl: './tags-todos-jogadores.component.html',
  styleUrls: ['./tags-todos-jogadores.component.css']
})
export class TagsTodosJogadoresComponent implements OnInit {
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
  listaAux: string[] = new Array<string>();
  listJogadores: string[] = new Array<string>();

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

  constructor(private tagsTodosJogadoresService: TagsTodosJogadoresService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const targetDiv3 = document.getElementById("mostrarTags");
    targetDiv3.style.display = "none";

    this.tagsTodosJogadoresService.getAllPosts().subscribe(
      (res: any) => {
        if (res.length == 0) {
          this.toastr.error("Não existem posts publicados", undefined, { positionClass: 'toast-bottom-left' });
        } else {
          res.forEach(element => {
            this.listaAux.push(element.tags);
          });
          // passar lista de listas para string
          var lista = this.listaAux.join(",");

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
        }
      }
    );

  }

  reDraw() {
    const targetDiv3 = document.getElementById("mostrarTags");
    targetDiv3.style.display = "none";
    this.tagCloudComponent.reDraw();
  }

  putOnCloud(texto: any, peso: any, color1: any) {
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
    var myRandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return myRandomColor;
  }

  logClicked(clicked: CloudData) {
    const targetDiv3 = document.getElementById("mostrarTags");
    targetDiv3.style.display = "block";
    this.tagsTodosJogadoresService.getAllPosts().subscribe(
      (res: any) => {
        res.forEach(element => {
          if (element.tags.includes(clicked.text)) {
            this.listJogadores.push(element);
          }
        });
      });
    this.listJogadores = [];
  }
}
