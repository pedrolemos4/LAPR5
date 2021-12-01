import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedirIntroducaoService } from 'src/app/Services/PedirIntroducao/pedir-introducao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
@Component({
  selector: 'app-pedir-introducao',
  templateUrl: './pedir-introducao.component.html',
  styleUrls: ['./pedir-introducao.component.css']
})
export class PedirIntroducaoComponent implements OnInit {

  selectedJogadorObjetivo: string = '';
  selectedJogadorIntrodutorio: string = '';
  pedirIntroForm: FormGroup;
  // public li: any;
  // public lis = [];
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
  idCurrentUser: string = '';
  idPerfilJogObjetivo: any;
  idJogObjetivo: string = '';
  amigosEmComumIdList: string[] = [];

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
            // console.log("99: " + this.amigosEmComumPerfilList.length);
            // this.amigosEmComumPerfilList.forEach((id: any) => {
            //   this.pedirIntroducaoService.getPerfil(id).subscribe(Perfil => {
            //     console.log(Perfil.email)
            //     this.emailAmigosEmComum.push(Perfil.email);
            //   });
            //   console.log("104: " + this.emailAmigosEmComum.length);
            // });
            console.log(this.emailAmigosEmComum);
          });
        });

      });



    });
  }

  selectJogadorIntrodutorio(event: any) {
    this.selectJogadorIntrodutorio = event.target.value;
  }

  getAmigosEmComum(selectedJogadorObjetivo: string) {
    //ir buscar o perfil através do email, ir buscar o id do jogObj e com o id do user logado ir buscar os amigos em comum
    //apresentar esses amigos na combo box
  }

  onSubmit() {
    console.log("Linha 54" + this.emailList);
    console.log(this.selectedJogadorObjetivo);
    this.pedirIntroducaoService.pedirIntroducao(/*{
      id : '',
      jogadorInicial : //id do jogador logado 
      jogadorIntrodutor : //id do amigoemcomum
      jogadorObjetivo :  //id do this.selectedJogadorObjetivo
      estado : this.estado
      mensagem : // mensagem da ui
     }*/this.email).subscribe({
      next: () => {
        console.log("SUCESSO");
        this.router.navigateByUrl('/homejogadores');
      }
    })
  }
}
