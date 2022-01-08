import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoLigacaoPendenteService } from 'src/app/Services/PedidoLigacaoPendente/pedido-ligacao-pendente.service';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/Models/Perfil';
import { ToastrService } from 'ngx-toastr';
import { Ligacao } from 'src/app/Models/Ligacao';
import { Relacao } from 'src/app/Models/Relacao';

@Component({
  selector: 'app-pedido-ligacao-pendente',
  templateUrl: './pedido-ligacao-pendente.component.html',
  styleUrls: ['./pedido-ligacao-pendente.component.css']
})
export class PedidoLigacaoPendenteComponent implements OnInit {

  editarPerfilForm: FormGroup;
  emailUser: string | undefined = '';
  idJogador: any;
  Perfil!: Perfil;
  ListaLigacoesPendentes: string[] = [];
  tags1: string[] = new Array<string>();
  tags2: string[] = new Array<string>();
  selectPedido: string | any;
  idJogador2: string | any;
  LigacaoSelecionada: Ligacao;
  LigacoesPendentes: Ligacao[];

  constructor(private service: PedidoLigacaoPendenteService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.service.getPerfilAtual(this.emailUser).subscribe(Perfil => {
      this.tags1 = Perfil.tags;
      this.service.getJogadorAtual(Perfil.id).subscribe(Jogador => {
        this.idJogador = Jogador.id;
        this.service.getListaLigacoesPendentes(Jogador.id).subscribe(ListaLigacoes => {
          this.LigacoesPendentes = ListaLigacoes;
          ListaLigacoes.forEach((name: Ligacao) => {
            console.log(name);
            console.log(name.jogador1);
            if (name.jogador1 != Jogador.id) {
              this.service.getJogadorByIdJogador(name.jogador1).subscribe(PlayerAux => {
                console.log(PlayerAux.perfilId);
                this.service.getPerfilAtualId(PlayerAux.perfilId).subscribe(PerfilAux => {
                  this.ListaLigacoesPendentes.push(PerfilAux.email + ". Texto Ligação: " + name.textoLigacao);
                });
              });
            } else {
              this.service.getJogadorByIdJogador(name.jogador2).subscribe(PlayerAux1 => {
                this.service.getPerfilAtualId(PlayerAux1.perfilId).subscribe(PerfilAux1 => {
                  this.ListaLigacoesPendentes.push(PerfilAux1.email + ". Texto Ligação: " + name.textoLigacao);
                });
              });
            }
          });
        });
      });
    });
  }

  selectAmigo(event: any) {
    this.selectPedido = event.target.value;
    var aux = this.selectPedido.split(". Texto Ligação: ");
    this.service.getPerfilAtual(aux[0]).subscribe(Perfil => {
      this.tags1.forEach((element: any) => {
        if (Perfil.tags.includes(element)) {
          this.tags2.push(element);
        }
      });
      this.service.getJogadorAtual(Perfil.id).subscribe(Jogador2 => {
        this.idJogador2 = Jogador2.id;
        console.log(this.idJogador2);
        this.LigacoesPendentes.forEach((element: Ligacao) => {
          if (element.jogador1 == this.idJogador2 || element.jogador2 == this.idJogador2) {
            this.LigacaoSelecionada = element;
          }
        });
      });
    });
  }

  aceitar() {
    console.log(this.LigacaoSelecionada);
    this.service.patchLigacao(this.LigacaoSelecionada.id, {
      id: this.LigacaoSelecionada.id,
      textoLigacao: this.LigacaoSelecionada.textoLigacao,
      estado: 'Aceite',
      jogador1: this.LigacaoSelecionada.jogador1,
      jogador2: this.LigacaoSelecionada.jogador2
    } as Ligacao).subscribe({
      next: () => {
        // this.toastr.success('Ligação aceite com sucesso!', undefined, { positionClass: 'toast-bottom-left' });
        // this.router.navigateByUrl('/home');
      },
      // error: () => {
      //   this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
      // }

    });
    console.log(this.idJogador+ " 102");
    console.log(this.idJogador2 + " 103");
    if(this.tags2.length==0){
      this.tags2 = this.tags1;
    }
    this.service.registoRelacao({
      jogador1: this.idJogador,
      jogador2: this.idJogador2,
      id: '',
      tags: this.tags2,
      forcaRelacao: 50,
      forcaLigacao: 50
    } as Relacao).subscribe({
      next: () => {
        this.toastr.success('Relação foi criada com sucesso!', undefined, { positionClass: 'toast-bottom-left' });
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
      }

    });
    console.log(this.tags2+" === 121");
    this.service.registoRelacao({
      id: '',
      jogador1: this.idJogador2,
      jogador2: this.idJogador,
      tags: this.tags2,
      forcaRelacao: 0,
      forcaLigacao: 0
    } as Relacao);
  }

  rejeitar() {
    this.service.patchLigacao(this.LigacaoSelecionada.id, {
      id: this.LigacaoSelecionada.id,
      textoLigacao: this.LigacaoSelecionada.textoLigacao,
      estado: 'Recusado',
      jogador1: this.LigacaoSelecionada.jogador1,
      jogador2: this.LigacaoSelecionada.jogador2
    } as Ligacao).subscribe({
      next: () => {
        this.toastr.success('Ligação recusada com sucesso!', undefined, { positionClass: 'toast-bottom-left' });
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
      }

    });
  }

}
