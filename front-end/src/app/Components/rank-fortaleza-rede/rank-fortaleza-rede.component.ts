import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, map } from 'rxjs';
import { RankFortalezaRedeService } from 'src/app/Services/RankFortalezaRede/rank-fortaleza-rede.service';

@Component({
  selector: 'app-rank-fortaleza-rede',
  templateUrl: './rank-fortaleza-rede.component.html',
  styleUrls: ['./rank-fortaleza-rede.component.css']
})
export class RankFortalezaRedeComponent implements OnInit {

  mapJog = new Map();
  mapFinal = new Map();
  emailList: string[] = [];
  emailFinal: string[] = [];
  pontuacaoList: number[] = [];
  soma: number;
  lista: string[] = [];
  sortedArray: number[] = [];
  listaFinal: string[] = [];

  constructor(private router: Router,private rankFortalezaRedeService: RankFortalezaRedeService) { }

  ngOnInit(): void {

    this.rankFortalezaRedeService.getAllJogadores().subscribe(Jogadores => {
      Jogadores.forEach(element => {
        this.rankFortalezaRedeService.getPerfil(element.id).subscribe(Perfil => {
          this.rankFortalezaRedeService.getFortalezaRede(element.id).subscribe(async Rede => {
            var res = Object.values(Rede);
            this.soma = parseInt(res[0]);
            if (this.mapJog.has(this.soma)) {
              this.lista = this.mapJog.get(this.soma);
              this.lista.push(Perfil.email);
              this.lista = [];
            } else {
              this.lista = [];
              this.lista.push(Perfil.email);
              this.mapJog.set(this.soma, this.lista);
            }
          });
        });
      });
    });
  }

  fortalezaRede() {
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

  return() {
    this.router.navigateByUrl("/home");
  }
}