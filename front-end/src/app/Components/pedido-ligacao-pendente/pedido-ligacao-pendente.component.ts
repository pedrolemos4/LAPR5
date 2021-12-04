import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoLigacaoPendenteService } from 'src/app/Services/PedidoLigacaoPendente/pedido-ligacao-pendente.service';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/Models/Perfil';
import { Ligacao } from 'src/app/Models/Ligacao';

@Component({
  selector: 'app-pedido-ligacao-pendente',
  templateUrl: './pedido-ligacao-pendente.component.html',
  styleUrls: ['./pedido-ligacao-pendente.component.css']
})
export class PedidoLigacaoPendenteComponent implements OnInit {

  editarPerfilForm: FormGroup;
  emailUser: string | undefined = '';
  id: any;
  Perfil!: Perfil;
  ListaLigacoesPendentes: string[] = [];

  constructor(private service: PedidoLigacaoPendenteService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.service.getPerfilAtual(this.emailUser).subscribe(Perfil => {
      this.service.getJogadorAtual(Perfil.id).subscribe(Jogador => {
        this.service.getListaLigacoesPendentes(Jogador.id).subscribe(ListaLigacoes => {
          ListaLigacoes.forEach((name: any) => {
            console.log(name);
            console.log(name.jogador1);
            if (name.jogador1 != Jogador.id) {
              try{
              this.service.getJogadorByIdJogador(name.jogador1).subscribe(PlayerAux => {
                console.log(PlayerAux.perfilId);
                this.service.getPerfilAtualId(PlayerAux.perfilId).subscribe(PerfilAux => {
                  this.ListaLigacoesPendentes.push(PerfilAux.nome + ". Texto Ligação: " + name.textoLigacao);
                });
              });
            }catch(error){
              console.log(error);
            }
            } else {
              this.service.getJogadorByIdJogador(name.jogador2).subscribe(PlayerAux1 => {
                this.service.getPerfilAtualId(PlayerAux1.perfilId).subscribe(PerfilAux1 => {
                  this.ListaLigacoesPendentes.push(PerfilAux1.nome + ". Texto Ligação: " + name.textoLigacao);
                });
              });
            }
          });
        });
      });
    });
  }

}
