import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/Services/Pedido/pedido.service';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';
import { Introducao } from 'src/app/Models/Introducao';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  emailCurrentUser: string | any = '';
  perfilUser!: Perfil;
  idPerfilUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: string = '';
  listIntroducoes: Introducao[] = [];
  perfilObjetivosList: string[] = [];
  perfilIniciaisList: string[] = [];
  



  constructor(private router: Router, private toastr: ToastrService, private pedidoService: PedidoService) {

  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    console.log(this.emailCurrentUser);
    this.pedidoService.getPerfilByEmail(this.emailCurrentUser).subscribe(Perfil => {
      this.perfilUser = Perfil;
      this.idPerfilUser = Perfil.id;
      console.log(this.idPerfilUser);
      this.pedidoService.getJogadorByPerfil(this.idPerfilUser).subscribe(Response => {
        this.currentUser = Response;
        this.idCurrentUser = this.currentUser.id;
        console.log(this.idCurrentUser);
        this.pedidoService.getIntroducoesPendentes(this.idCurrentUser).subscribe(Response => {
          this.listIntroducoes = Response;
          this.idCurrentUser = this.currentUser.id;
          console.log(this.idCurrentUser);

          this.listIntroducoes.forEach((introducao: any) => {
            this.pedidoService.getPerfilJogador(introducao.jogadorInicial).subscribe(Perfil =>{
              console.log(Perfil.email);
              this.perfilIniciaisList.push(Perfil.email);
            });
            this.pedidoService.getPerfilJogador(introducao.jogadorObjetivo).subscribe(Perfil =>{
              this.perfilObjetivosList.push(Perfil.email);
            });
          });
        });
      });
    });
  }

  aceitar(intro:Introducao){
    this.pedidoService.patchIntroducao(intro.id,{
      id: intro.id,
      jogadorInicial:intro.jogadorInicial,
      jogadorIntrodutor:intro.jogadorIntrodutor,
      jogadorObjetivo:intro.jogadorObjetivo,
      estadoIntroducao: "Pendente",
      textoIntroducao: "Mensagem"
    } as Introducao).subscribe({
      next: (result:any)=> {
        console.log(result);
        this.toastr.success("Introdução aceite com sucesso!",undefined,{positionClass: 'toast-bottom-left'});
        this.router.navigateByUrl('/home');
      },
      error:()=>{
        this.toastr.error("Error: Service Unavailable",undefined,{positionClass: 'toast-bottom-left'});
      }
    });
  }

  rejeitar(intro:Introducao){
    console.log(intro);
    this.pedidoService.patchIntroducao(intro.id,{
      id: intro.id,
      jogadorInicial: intro.jogadorInicial,
      jogadorIntrodutor: intro.jogadorIntrodutor,
      jogadorObjetivo: intro.jogadorObjetivo,
      estadoIntroducao: "Recusado",
      textoIntroducao: "Mensagem"
    } as Introducao).subscribe({
      next:(result : any) => {
        console.log(result);
        this.toastr.success("Introdução rejeitada com sucesso!",undefined,{positionClass: 'toast-bottom-left'});
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.toastr.error("Error: Service Unavailable",undefined,{positionClass: 'toast-bottom-left'});
      }
    });
  }

}