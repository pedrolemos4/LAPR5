import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedirIntroducaoService } from 'src/app/Services/PedirIntroducao/pedir-introducao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { Introducao } from 'src/app/Models/Introducao';
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
  estadoIntro : string = 'Pendente';

  constructor(private formBuilder: FormBuilder, private pedirIntroducaoService: PedirIntroducaoService, private router: Router) {
    this.pedirIntroForm = this.formBuilder.group({
      player: '',
      mensagem: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
          console.log(this.playersList);
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
    //update the ui
    this.selectedJogadorObjetivo = event.target.value;
    this.pedirIntroducaoService.getPerfilAtual(this.selectedJogadorObjetivo).subscribe(Response => {
      this.idPerfilJogObjetivo = Response.id;
      this.pedirIntroducaoService.getJogador(this.idPerfilJogObjetivo).subscribe(Jogador => {
        this.idJogObjetivo = Jogador.id;
        this.pedirIntroducaoService.getAmigosEmComum(this.currentUser.id, this.idJogObjetivo).subscribe(Amigos => {
          console.log(Amigos.length);
          console.log(Amigos.values().next().value);
          this.amigosEmComum = Amigos;
          console.log("Tamanho da lista de amigos: " + this.amigosEmComum.length);
          this.amigosEmComum.forEach((element: any) => {
            console.log(element.id);
            this.amigosEmComumIdList.push(element.id);
          });
          this.amigosEmComumIdList.forEach((element: any) => {
            this.pedirIntroducaoService.getPerfilJogador(element).subscribe(Perfil => {
              console.log(Perfil.id);
              console.log(Perfil.email);
              this.amigosEmComumPerfilList.push(Perfil.id);
              this.emailAmigosEmComum.push(Perfil.email);
            });
            console.log(this.emailAmigosEmComum);
          });
        });

      });



    });
  }

  selectJogadorIntrodutorio(event: any) {
    this.selectedJogadorIntrodutorio = event.target.value;
    this.pedirIntroducaoService.getPerfilAtual(this.selectedJogadorIntrodutorio).subscribe(Response => {
      this.idPerfilJogIntro = Response.id;
      this.pedirIntroducaoService.getJogador(this.idPerfilJogIntro).subscribe(Jogador => {
        this.idJogIntrodutorio = Jogador.id;
        console.log(this.idJogIntrodutorio);
      });
    });
  }

  onSubmit() {
    console.log("Linha 54" + this.emailList);
    console.log(this.selectedJogadorObjetivo);
    this.pedirIntroducaoService.pedirIntroducao({
      id: '',
      jogadorInicial: this.idCurrentUser, //id do jogador logado 
      jogadorIntrodutor: this.idJogIntrodutorio, //id do amigoemcomum
      jogadorObjetivo : this.idJogObjetivo,  //id do this.selectedJogadorObjetivo
      estadoIntroducao: this.estadoIntro,
      textoIntroducao: this.pedirIntroForm.controls['mensagem'].value// mensagem da ui
     } as Introducao).subscribe({
        next: () => {
          this.router.navigateByUrl('/perfil');
        }
      })
  }
}
