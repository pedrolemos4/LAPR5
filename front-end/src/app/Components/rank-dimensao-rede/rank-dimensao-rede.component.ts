import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Jogador } from 'src/app/Models/Jogador';
import { RankDimensaoRedeService } from 'src/app/Services/RankDimensaoRede/rank-dimensao-rede.service';

@Component({
  selector: 'app-rank-dimensao-rede',
  templateUrl: './rank-dimensao-rede.component.html',
  styleUrls: ['./rank-dimensao-rede.component.css']
})
export class RankDimensaoRedeComponent implements OnInit {

  jogadores: string[] = new Array<string>();
  tamanho: number;
  mapJog = new Map();
  mapFinal = new Map();
  lista: string[] = new Array<string>();

  constructor(private rankDimensaoRedeService: RankDimensaoRedeService) { }

  ngOnInit(): void {

    this.rankDimensaoRedeService.getAllJogadores().subscribe(Jogadores => {
      Jogadores.forEach(element => {
        //this.jogadores.push(element);
        this.rankDimensaoRedeService.getPerfil(element.id).subscribe(Perfil => {
          this.rankDimensaoRedeService.getTamRede(element.id, 1).subscribe(async Rede => {
            console.log("Email: "+Perfil.email);
            var res = Object.values(Rede);
            console.log("res= " + res);
            this.tamanho = parseInt(res[0]);
            console.log("tamanho= " + this.tamanho);
            if (this.mapJog.has(this.tamanho)) {
              this.lista = this.mapJog.get(this.tamanho);
              console.log("Lista antes= " + this.lista);
              this.lista.push(Perfil.email);
              console.log("Lista depois= " + this.lista);
              this.lista = [];
            } else {
              this.lista = [];
              console.log("Lista antes= " + this.lista);
              this.lista.push(Perfil.email);
              console.log("Lista depois= " + this.lista);
              this.mapJog.set(this.tamanho, this.lista);
            }
            console.log("Antes delay");
            await delay(5000);
            console.log("Depois delay");
            console.log("==================================================0");
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
