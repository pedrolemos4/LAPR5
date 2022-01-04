import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  sortedArray: number[] = [];
  listaFinal: string[] = [];
  emailFinal: string[] = [];
  
  constructor(private rankDimensaoRedeService: RankDimensaoRedeService) { }

  ngOnInit() {
    this.rankDimensaoRedeService.getAllJogadores().subscribe(Jogadores => {
      Jogadores.forEach(element => {
        //this.jogadores.push(element);
        this.rankDimensaoRedeService.getPerfil(element.id).subscribe(Perfil => {
          this.rankDimensaoRedeService.getTamRede(element.id, 1).subscribe(async Rede => {
            var res = Object.values(Rede);
            this.tamanho = parseInt(res[0]);
            if (this.mapJog.has(this.tamanho)) {
              this.lista = this.mapJog.get(this.tamanho);
              this.lista.push(Perfil.email);
              this.lista = [];
            } else {
              this.lista = [];
              this.lista.push(Perfil.email);
              this.mapJog.set(this.tamanho, this.lista);
            }
            await delay(5000);
          });
        });
      });
    });
  }
  
  dimensaoRede() {
    this.listaFinal = []; 
    var list: number[] = [];
    for (let key of this.mapJog.keys()) {
      list.push(key);
    }
    this.sortedArray = list.sort((n1, n2) => n2 - n1);
    for (let number of this.sortedArray) {
      this.emailFinal.push(this.mapJog.get(number));
    }
    var length = this.sortedArray.length;
    for (var i = 0; i < length; i++) {
      this.listaFinal.push(this.sortedArray.shift() + "  -->  " + this.emailFinal.shift());
    } 
  
  }
}
