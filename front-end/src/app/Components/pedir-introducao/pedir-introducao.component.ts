import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedirIntroducaoService } from 'src/app/Services/PedirIntroducao/pedir-introducao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { Introducao } from 'src/app/Models/Introducao';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pedir-introducao',
  templateUrl: './pedir-introducao.component.html',
  styleUrls: ['./pedir-introducao.component.css']
})
export class PedirIntroducaoComponent implements OnInit {

  selectedJogadorObjetivo: string = '';
  selectedJogadorIntrodutorio: string = '';
  pedirIntroForm: FormGroup;
  playersList: Jogador[] = [];
  perfilList: Perfil[] = [];
  amigosEmComumPerfilList: Perfil[] = [];
  emailList: string[] = [];
  emailAmigosEmComum: string[] = [];
  amigosEmComum: Jogador[] = [];
  nome: string = '';
  email: string = '';
  emailCurrentUser: string | undefined = '';
  perfilCurrentUser!: Perfil;
  idPerfilCurrentUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: any = '';
  idPerfilJogObjetivo: any;
  idJogObjetivo: any = '';
  idPerfilJogIntro: any = '';
  idJogIntrodutorio: any = '';
  amigosEmComumIdList: string[] = [];
  estadoIntro: string = 'Em_Aprovacao';

  constructor(private formBuilder: FormBuilder, private pedirIntroducaoService: PedirIntroducaoService, private toastr: ToastrService, private router: Router) {
    this.pedirIntroForm = this.formBuilder.group({
      player: '',
      mensagem: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    document.getElementById("mensagem1").style.display = "none";
    document.getElementById("mensagem2").style.display = "none";
    document.getElementById("mensagem3").style.display = "none";
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.pedirIntroducaoService.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      this.perfilCurrentUser = Perfil;
      this.idPerfilCurrentUser = Perfil.id;
      this.pedirIntroducaoService.getJogador(this.idPerfilCurrentUser).subscribe(Response => {
        this.currentUser = Response;
        this.idCurrentUser = this.currentUser.id;

        this.pedirIntroducaoService.getJogadores(this.idCurrentUser).subscribe(Response => {
          this.playersList = Response;
          this.playersList.forEach((element: any) => {
            this.perfilList.push(element.perfilId);
          })

          this.perfilList.forEach((id: any) => {
            this.pedirIntroducaoService.getPerfil(id).subscribe(Perfil => {
              this.emailList.push(Perfil.email);
            })

          });
        });
      });
    });
  }



  selectJogadorObjetivo(event: any) {
    document.getElementById("mensagem1").style.display = "block";
    this.selectedJogadorObjetivo = event.target.value;
    try {
      this.pedirIntroducaoService.getPerfilAtual(this.selectedJogadorObjetivo).subscribe(Response => {
        this.idPerfilJogObjetivo = Response.id;
        this.pedirIntroducaoService.getJogador(this.idPerfilJogObjetivo).subscribe(Jogador => {
          this.idJogObjetivo = Jogador.id;
          this.pedirIntroducaoService.getAmigosEmComum(this.currentUser.id, this.idJogObjetivo).subscribe(Amigos => {
            this.amigosEmComum = Amigos;
            this.amigosEmComum.forEach((element: any) => {
              this.amigosEmComumIdList.push(element.id);
            });
            this.amigosEmComumIdList.forEach((element: any) => {
              this.pedirIntroducaoService.getPerfilJogador(element).subscribe(Perfil => {
                this.amigosEmComumPerfilList.push(Perfil.id);
                this.emailAmigosEmComum.push(Perfil.email);
              });
            });
          });
        });

      });
    } catch (error) {
      //if (error.status >= 400) {
      this.toastr.error("Servi??os Indispon??veis", undefined, { positionClass: 'toast-bottom-left' });
      //} else {
      //  console.log(error);
      //}
    }
  }

  selectJogadorIntrodutorio(event: any) {
    document.getElementById("mensagem2").style.display = "block";
    document.getElementById("mensagem3").style.display = "block";
    this.selectedJogadorIntrodutorio = event.target.value;
    this.pedirIntroducaoService.getPerfilAtual(this.selectedJogadorIntrodutorio).subscribe(Response => {
      this.idPerfilJogIntro = Response.id;
      this.pedirIntroducaoService.getJogador(this.idPerfilJogIntro).subscribe(Jogador => {
        this.idJogIntrodutorio = Jogador.id;
      });
    });
  }

  onSubmit() {
    this.pedirIntroducaoService.pedirIntroducao({
      id: '',
      jogadorInicial: this.idCurrentUser, //id do jogador logado 
      jogadorIntrodutor: this.idJogIntrodutorio, //id do amigoemcomum
      jogadorObjetivo: this.idJogObjetivo,  //id do this.selectedJogadorObjetivo
      estadoIntroducao: this.estadoIntro,
      textoIntroducao: this.pedirIntroForm.controls['mensagem'].value// mensagem da ui
    } as Introducao).subscribe({
      next: () => {
        this.toastr.success('Pedido realizado com sucesso!', undefined, { positionClass: 'toast-bottom-left' });
        this.router.navigateByUrl('/home');
      }
    });
  }
}
