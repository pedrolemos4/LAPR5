import { Component, OnInit } from '@angular/core';
//import { RedeService } from 'src/app/Services/Rede/rede.service';
import { Jogador } from 'src/app/Models/Jogador';
//import Graph from 'graphology';

//const graph = new Graph();

@Component({
  selector: 'app-rede',
  templateUrl: './rede.component.html',
  styleUrls: ['./rede.component.css']
})
export class RedeComponent implements OnInit {

  jogadores: Jogador[] = [];

  //constructor(private redeService: RedeService) { }

  ngOnInit(): void {
    //this.setJogadores();
  }

  /*setJogadores(): void {
    this.redeService.getJogadores().subscribe(jogadores => this.jogadores = jogadores);
  }

  createGrafo(): void {
    this.jogadores.forEach(function (jogador) {
      graph.addNode(jogador.nome);
    });

    this.jogadores.forEach(function (jogador) {
      const listaRelacoes = jogador.listaRelacoes;
      listaRelacoes.forEach(function (nomeJogador) {
        graph.addEdge(jogador.nome, nomeJogador);
      });

    });
  }

  getGraph(): Graph{
    return graph;
  }*/

}
