import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/Services/Pedido/pedido.service';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';
import { Introducao } from 'src/app/Models/Introducao';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  perfilListAux: any[][] = new Array<any[]>();
  introducaoSelecionada: Introducao;
  introducaoForm: FormGroup;
  jogador:string = '';


  constructor(private formBuilder: FormBuilder,private router: Router, private toastr: ToastrService, private pedidoService: PedidoService) {
    this.introducaoForm = this.formBuilder.group({
      TextoIntroducao: ''
    });
  }

  ngOnInit(): void {
    const targetDiv3 = document.getElementById('cardPedido');
    targetDiv3.style.display = "none";
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
            this.pedidoService.getPerfilJogador(introducao.jogadorInicial).subscribe(Perfil => {
              this.pedidoService.getPerfilJogador(introducao.jogadorObjetivo).subscribe(Perfil1 => {
                this.perfilListAux.push([Perfil.email, Perfil1.email, introducao.textoIntroducao, introducao]);
              });
            });

          });
        });
      });
    });
  }

  aceitar(intro: Introducao, jogador: any) {
    const targetDiv2 = document.getElementById('container');
    targetDiv2.style.display = "none";
    const targetDiv3 = document.getElementById('cardPedido');
    targetDiv3.style.display = "block";
    this.introducaoSelecionada = intro;
    this.jogador = jogador;
  }

  rejeitar(intro: Introducao) {
    console.log(intro);
    this.pedidoService.patchIntroducao(intro.id, {
      id: intro.id,
      jogadorInicial: intro.jogadorInicial,
      jogadorIntrodutor: intro.jogadorIntrodutor,
      jogadorObjetivo: intro.jogadorObjetivo,
      estadoIntroducao: "Recusado",
      textoIntroducao: "Pedido Recusado"
    } as Introducao).subscribe({
      next: (result: any) => {
        console.log(result);
        this.toastr.success("Introdução rejeitada com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.toastr.error("Error: Service Unavailable", undefined, { positionClass: 'toast-bottom-left' });
      }
    });
  }

  onSubmit() {
    if (this.introducaoForm.controls['TextoIntroducao'].value != '') {
      this.pedidoService.patchIntroducao(this.introducaoSelecionada.id, {
        id: this.introducaoSelecionada.id,
        jogadorInicial: this.introducaoSelecionada.jogadorInicial,
        jogadorIntrodutor: this.introducaoSelecionada.jogadorIntrodutor,
        jogadorObjetivo: this.introducaoSelecionada.jogadorObjetivo,
        estadoIntroducao: "Pendente",
        textoIntroducao: this.introducaoForm.controls['TextoIntroducao'].value
      } as Introducao).subscribe({
        next: (result: any) => {
          console.log(result);
          this.toastr.success("Introdução aceite com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.toastr.error("Error: Service Unavailable", undefined, { positionClass: 'toast-bottom-left' });
        }
      });

    } else {
      this.toastr.error("Mensagem de Introdução é obrigatória.", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

  return(){
    const targetDiv3 = document.getElementById('cardPedido');
    targetDiv3.style.display = "none";
    const targetDiv2 = document.getElementById('container');
    targetDiv2.style.display = "block";
  }
}