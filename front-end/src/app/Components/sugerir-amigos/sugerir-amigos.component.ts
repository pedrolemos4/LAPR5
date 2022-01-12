import { Component, OnInit } from '@angular/core';
import { SugerirAmigosService } from 'src/app/Services/sugerir-amigos/sugerir-amigos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/Models/Perfil';

@Component({
  selector: 'app-sugerir-amigos',
  templateUrl: './sugerir-amigos.component.html',
  styleUrls: ['./sugerir-amigos.component.css']
})
export class SugerirAmigosComponent implements OnInit {

  nNiveis: number;
  emailCurrentUser: string | undefined = '';
  idCurrentUser: string;
  pedirNivel: FormGroup;
  lista: string[] = new Array<string>();
  aux: string[] = new Array<string>();
  aux1: string[] = new Array<string>();


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
    this.lista = [];
    this.nNiveis = this.pedirNivel.controls['numeroNiveis'].value;
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.sugerirAmigosService.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      this.idCurrentUser = Perfil.id;
      this.sugerirAmigosService.getJogador(Perfil.id).subscribe(Jogador => {
        if (this.nNiveis > 1) {
          this.sugerirAmigosService.getAmigosSugeridos(Jogador.id, this.nNiveis).subscribe(ListaAux => {
            this.aux1 = Object.values(ListaAux);
            this.aux = Object.values(this.aux1);
            console.log(this.aux + " 46");
            console.log(this.aux.length + " 47");
            document.getElementById("textoSugestoes").style.display = "block";
            if (this.aux.length == 0) {
              this.sugerirAmigosService.getAllPerfis().subscribe(All => {
                All.forEach((element: Perfil) => {
                  if (element.id != this.idCurrentUser) {
                    this.lista.push(element.email);
                  }
                });
              });
              this.toastr.error("Todos os jogadores do sistema sugeridos. Selecione outro nível para basear os resultados em tags e nível.", undefined, { positionClass: 'toast-bottom-left' });
            } else {
              this.aux.forEach((element: any) => {
                console.log(element + " 51");
                this.sugerirAmigosService.getJogadorById(element).subscribe(Jogador => {
                  this.sugerirAmigosService.getPerfilById(Jogador.perfilId).subscribe(PerfilAux => {
                    this.lista.push(PerfilAux.email);
                  });
                });
              });
              this.toastr.success("Amigos sugeridos com base nas tags e nível listados.", undefined, { positionClass: 'toast-bottom-left' });
            }
          });
        }
      });
    });
  }

}
