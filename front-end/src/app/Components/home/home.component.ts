import { Component, OnInit } from '@angular/core';
import { Ligacao } from 'src/app/Models/Ligacao';
import { Jogador } from 'src/app/Models/Jogador';
import { HomeService } from 'src/app/Services/Home/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  estadoLigacao: string = 'Pendente';
  numeroTags: number;
  selected: string = '';
  emailUser: string = '';
  idPerfilUser: string = '';
  pedirJogadorObjetivo: FormGroup;
  ntagsForm: FormGroup;
  container: any;
  showNames: string[] = [];

  nomes: string[] = [];
  constructor(private formBuilder: FormBuilder, private homeService: HomeService, private toastr: ToastrService) {
    this.pedirJogadorObjetivo = this.formBuilder.group({
    });
    this.ntagsForm = this.formBuilder.group({
      ntags: ['', Validators.required]
    });
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
    document.getElementById("mensagemPedido").style.display = "block";
  }

  ngOnInit(): void {
    this.numeroTags = this.ntagsForm.controls['ntags'].value;
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.homeService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      this.nomes.push(Perfil.nome);
      if (this.numeroTags <= Perfil.tags.length) {
        this.homeService.getJogadorAtual(Perfil.id).subscribe(Jogador => {
          this.homeService.getRelacoesJogador(Jogador.id).subscribe(result => {
            if (result.length > 0) {
              document.getElementById("card").style.display = 'none';
            }
          });
        });
      }
    });
  }

  onSubmitTags() {
    this.showNames = [];
    this.numeroTags = this.ntagsForm.controls['ntags'].value;
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.homeService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      if (this.numeroTags <= Perfil.tags.length) {
        this.homeService.getJogadorAtual(Perfil.id).subscribe(Jogador => {
          this.homeService.getRelacoesJogador(Jogador.id).subscribe(result => {
            if (result.length > 0) {
              document.getElementById("card").style.display = 'none';
            } else {
              this.homeService.getJogadoresSugeridos(this.numeroTags).subscribe(array => {
                var array1 = Object.values(array);
                var aux12 = array1[0];
                if (aux12.length > 0) {
                  for (var i = 0; i < aux12.length; i++) {
                    if (i % 2 != 0) {
                      var aux = aux12[i];
                      if (aux.includes(Perfil.email)) {
                        for (var k = 0; k < aux.length; k++) {
                          if (aux[k] != Perfil.email) {
                            this.showNames.push(aux[k]);
                          }
                        }
                      }
                    }
                  }
                } else {
                  this.toastr.error("Não existem tags em comum.", undefined, { positionClass: 'toast-bottom-left' });
                  this.homeService.getAllJogadores().subscribe(TodosJogadores => {
                    TodosJogadores.forEach((element: Jogador) => {
                      this.homeService.getPerfil(element.id).subscribe(Perfil1 => {
                        this.showNames.push(Perfil1.email);
                      });
                    });
                  });
                }
              });
            }
          });
        });
      } else {
        this.toastr.error("Insira o número de tags que seja igual ou menor ao número de tags que possui.", undefined, { positionClass: 'toast-bottom-left' });
      }
    });
  }

  onSubmitLigacao() {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    console.log(currentUser);
    this.homeService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      this.homeService.getJogadorAtual(Perfil.id).subscribe(Jogador => {
        this.homeService.getPerfilByEmail(this.selected).subscribe(PerfilNames => {
          this.homeService.getJogadorAtual(PerfilNames.id).subscribe(Jogador2 => {
            this.homeService.registoLigacao({
              id: '',
              textoLigacao: 'Pedido enviado por: ' + Perfil.nome + '.',
              estado: this.estadoLigacao,
              jogador1: Jogador2.id,
              jogador2: Jogador.id
            } as Ligacao).subscribe((result: any) => {
              console.log(result),
                this.toastr.success("Pedido de Ligação realizado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
            });
          });
        });
      });
    });
  }
}