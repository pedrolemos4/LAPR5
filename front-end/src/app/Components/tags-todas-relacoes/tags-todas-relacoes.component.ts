import { Component, OnInit, ViewChild } from '@angular/core';
import { Relacao } from 'src/app/Models/Relacao';
import { TagsTodasRelacoesService } from 'src/app/Services/TagsTodasRelacoes/tags-todas-relacoes.service';
import { CloudData, CloudOptions, TagCloudComponent } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-tags-todas-relacoes',
  templateUrl: './tags-todas-relacoes.component.html',
  styleUrls: ['./tags-todas-relacoes.component.css']
})
export class TagsTodasRelacoesComponent implements OnInit {
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

  data: CloudData[] = [{
    text: '',
    weight: 2,
    color: '#ffaaee',
    link: null,
    rotate: null
  }];
  dict = {};

  listTags: string[] = new Array<string>();
  listaAux: string[] = new Array<string>();
  listaRelacoes: string[][] = new Array<string[]>();
  listaVerificar: string[] = new Array<string>();

  constructor(private service: TagsTodasRelacoesService) {

  }

  ngOnInit(): void {
    const targetDiv3 = document.getElementById("mostrarTags");
    targetDiv3.style.display = "none";
    this.service.getRelacoes().subscribe(
      (res: any) => {
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

    this.service.getRelacoes().subscribe(Relacoes => {
      Relacoes.forEach((element: Relacao) => {
        if (element.tags.includes(clicked.text)) {
          this.service.getPerfilJogador(element.jogador1).subscribe(Perfil1 => {
            this.service.getPerfilJogador(element.jogador2).subscribe(Perfil2 => {
              if (!this.listaVerificar.includes(Perfil2.email + Perfil1.email)) {
                this.listaRelacoes.push([Perfil1.email, Perfil2.email]);
                this.listaVerificar.push(Perfil1.email + Perfil2.email);
              }
            });
          });
        }
      });
    });
    this.listaVerificar = [];
    this.listaRelacoes = [];
  }

  // ngOnInit(): void {
  //   document.getElementById("mensagem1").style.display = "none";
  //   this.service.getRelacoes().subscribe(Relacoes => {
  //     Relacoes.forEach((element: Relacao) => {
  //       this.service.getPerfilJogador(element.jogador1).subscribe(name1 => {
  //         this.service.getPerfilJogador(element.jogador2).subscribe(name2 => { //nao repetir relacoes
  //           var aux = name2.email + " - " + name1.email;
  //           if (!this.listaRelacoes.includes(aux)) {
  //             this.listaRelacoes.push(name1.email + " - " + name2.email);
  //           }
  //         });
  //       });
  //     });
  //   });
  // }

  // selectAmigo(event: any) {
  //   this.relacaoSelecionada = event.target.value;
  // }

  // onSubmit() {
  //   document.getElementById("mensagem1").style.display = "block";
  //   var split = this.relacaoSelecionada.split(" - ");
  //   this.service.getPerfilByEmail(split[0]).subscribe(Perfil1 => {
  //     this.service.getPerfilByEmail(split[1]).subscribe(Perfil2 => {
  //       this.service.getJogadorByPerfil(Perfil1.id).subscribe(Jogador1 => {
  //         this.service.getJogadorByPerfil(Perfil2.id).subscribe(Jogador2 => {
  //           this.service.getRelacaoEntreJogadores(Jogador1.id, Jogador2.id).subscribe(Relacao => {
  //             if (Relacao.tags.length > 0) {
  //               this.tagsRelacao = Relacao.tags;
  //             } else {
  //               this.tagsRelacao.push("Não existem tags");
  //               this.toastr.error("Não foram encontradas tags na relação selecionada.");
  //             }
  //           });
  //         });
  //       });
  //     });
  //   });
  // }

}
