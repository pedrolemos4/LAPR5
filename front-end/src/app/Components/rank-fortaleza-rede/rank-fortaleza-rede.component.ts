import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { map } from 'rxjs';
import { RankFortalezaRedeService } from 'src/app/Services/RankFortalezaRede/rank-fortaleza-rede.service';

@Component({
  selector: 'app-rank-fortaleza-rede',
  templateUrl: './rank-fortaleza-rede.component.html',
  styleUrls: ['./rank-fortaleza-rede.component.css']
})
export class RankFortalezaRedeComponent implements OnInit {

  mapJog = new Map();
  mapFinal = undefined;
  // mapFinal = new Map([...this.mapJog.entries()].sort((a,b) => b[1] - a[1]));
  emailList: string[] = [];
  pontuacaoList: number[] = [];
  soma: number;

  constructor(private rankFortalezaRedeService: RankFortalezaRedeService) { }

  ngOnInit(): void {

    this.rankFortalezaRedeService.getAllJogadores().subscribe(Jogadores => {
      Jogadores.forEach(element => {
        this.rankFortalezaRedeService.getPerfil(element.id).subscribe(Perfil => {
          console.log(Perfil.email);
          this.emailList.push(Perfil.email)
          this.rankFortalezaRedeService.getFortalezaRede(element.id).subscribe(Rede => {
            var res = Object.values(Rede);
            this.soma = parseInt(res[0]);
            console.log(this.soma);
            this.pontuacaoList.push(this.soma);
            this.mapJog.set(Perfil.email, this.soma);
          });
        });
      });
    });
  }
}