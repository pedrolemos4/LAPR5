import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/Models/Perfil';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AmigosComumService } from 'src/app/Services/AmigosComum/amigos-comum.service';
import { Relacao } from 'src/app/Models/Relacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amigos-comum',
  templateUrl: './amigos-comum.component.html',
  styleUrls: ['./amigos-comum.component.css']
})
export class AmigosComumComponent implements OnInit {

  emailCurrentUser: string | undefined = '';
  emailAmigos: string[] = [];
  selectedAmigo: string = '';
  form: FormGroup;
  amigos: Perfil[] = [];
  listaAmigosComum: string[] = [];

  constructor(private service: AmigosComumService,private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    document.getElementById("mensagem").style.display = "none";
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.service.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      this.service.getJogador(Perfil.id).subscribe(Jogador => {
        this.service.getRelacoesJogador(Jogador.id).subscribe(Relacoes => {
          Relacoes.forEach((element: Relacao) => {
            var aux;
            if (Jogador.id != element.jogador1) {
              aux = element.jogador1;
            } else {
              aux = element.jogador2;
            }
            this.service.getJogadorById(aux).subscribe(Jogador => {
              this.service.getPerfilById(Jogador.perfilId).subscribe(PerfilAux => {
                this.emailAmigos.push(PerfilAux.email);
                this.amigos.push(PerfilAux);
              });
            });
          });
        });
      });
    });
  }

  selectAmigo(event: any) {
    this.selectedAmigo = event.target.value;
    document.getElementById("mensagem").style.display = "block";
  }

  onSubmit() {
    document.getElementById("mensagem1").style.display = "block";
    this.listaAmigosComum = [];
    this.service.getPerfilAtual(this.selectedAmigo).subscribe(Perfil => {
      this.service.getJogador(Perfil.id).subscribe(Jogador => {
        this.service.getRelacoesJogador(Jogador.id).subscribe(Relacoes => {
          Relacoes.forEach((element: Relacao) => {
            var aux;
            if (Jogador.id != element.jogador1) {
              aux = element.jogador1;
            } else {
              aux = element.jogador2;
            }
            this.service.getJogadorById(aux).subscribe(Jogador => {
              this.service.getPerfilById(Jogador.perfilId).subscribe(PerfilAux => {
                this.amigos.forEach((elemento: Perfil) => {
                  if (elemento.id == PerfilAux.id) {
                    this.listaAmigosComum.push(PerfilAux.email);
                  }
                });
              });
            });
          });
        });
      });
    });
  }

  return(){
    this.router.navigateByUrl("/ver_amigos_grupos");
  }

}
