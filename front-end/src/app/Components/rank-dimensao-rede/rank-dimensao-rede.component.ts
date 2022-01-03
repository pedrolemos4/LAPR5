import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/Models/Jogador';
import { RankDimensaoRedeService } from 'src/app/Services/RankDimensaoRede/rank-dimensao-rede.service';

@Component({
  selector: 'app-rank-dimensao-rede',
  templateUrl: './rank-dimensao-rede.component.html',
  styleUrls: ['./rank-dimensao-rede.component.css']
})
export class RankDimensaoRedeComponent implements OnInit {

  jogadores: string[] = [];
  tamanho: number;
  mapJog = new Map();
  mapFinal = new Map();
  lista: string[]= [];

  constructor(private rankDimensaoRedeService: RankDimensaoRedeService) { }

  ngOnInit(): void {

    this.rankDimensaoRedeService.getAllJogadores().subscribe(Jogadores => {
      Jogadores.forEach(element => {
        //this.jogadores.push(element);
        this.rankDimensaoRedeService.getPerfil(element.id).subscribe(Perfil => {
          this.rankDimensaoRedeService.getTamRede(element.id, "1").subscribe(Rede => {
            var res = Object.values(Rede);
            this.tamanho = parseInt(res[0]);
            if(this.mapJog.has(this.tamanho)){
              this.lista = this.mapJog.get(this.tamanho);
              this.lista.push(Perfil.email);
              this.lista = [];
            } else{
              this.lista = [];
              this.lista.push(Perfil.email);
              this.mapJog.set(this.tamanho,this.lista);
            }
          });
        });
      });
    });
  }

  // onSubmit() {
  //   //var nivel = document.getElementById("nivel") as HTMLInputElement;
  //   if (nivel.value.match("1") || nivel.value.match("2") || nivel.value.match("3")) {
  //     this.jogadores.forEach(jogador => {
  //       this.rankDimensaoRedeService.getTamRede(jogador.id, nivel.value).subscribe(Rede => {
  //         var res = Object.values(Rede);
  //         this.tamanho = parseInt(res[0]);
  //       })
  //     })
  //   }
  // }

}
