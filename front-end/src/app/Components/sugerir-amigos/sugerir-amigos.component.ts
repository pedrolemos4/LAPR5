import { Component, OnInit } from '@angular/core';
import { SugerirAmigosService } from 'src/app/Services/sugerir-amigos/sugerir-amigos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sugerir-amigos',
  templateUrl: './sugerir-amigos.component.html',
  styleUrls: ['./sugerir-amigos.component.css']
})
export class SugerirAmigosComponent implements OnInit {

  nNiveis: number;
  emailCurrentUser: string | undefined = '';
  pedirNivel: FormGroup;
  lista: string[] = [];
  aux: string[] = [];
  aux1: string[] = [];


  constructor(private formBuilder: FormBuilder, private sugerirAmigosService: SugerirAmigosService, private toastr: ToastrService) {

    this.pedirNivel = this.formBuilder.group({
      numeroNiveis: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.nNiveis = this.pedirNivel.controls['numeroNiveis'].value;
    document.getElementById("textoSugestoes").style.display = "none";
  }

  onSubmitNivel(): void {
    this.nNiveis = this.pedirNivel.controls['numeroNiveis'].value;
    document.getElementById("textoSugestoes").style.display = "block";
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.sugerirAmigosService.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      this.sugerirAmigosService.getJogador(Perfil.id).subscribe(Jogador => {
        this.sugerirAmigosService.getAmigosSugeridos(Jogador.id, this.nNiveis).subscribe(ListaAux => {
          this.aux1 = Object.values(ListaAux);
          this.aux = Object.values(this.aux1);
          this.aux.forEach((element: any) => {
            this.sugerirAmigosService.getJogadorById(element).subscribe(Jogador => {
              this.sugerirAmigosService.getPerfilById(Jogador.perfilId).subscribe(PerfilAux => {
                this.lista.push(PerfilAux.email);
              });
            });
          });
        });
      });
    });
  }

}
