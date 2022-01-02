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

  mapJog: Map<string,string>;
  soma: string;

  constructor(private rankFortalezaRedeService: RankFortalezaRedeService) { }

  ngOnInit(): void {
    this.rankFortalezaRedeService.getAllJogadores().subscribe(Jogadores =>{
      Jogadores.forEach(element => {
        this.rankFortalezaRedeService.getFortalezaRede(element.id).subscribe(Rede => {
          var res = Object.values(Rede);
          this.soma = res[0];
          this.rankFortalezaRedeService.getPerfil(element.id).subscribe(Perfil => {
            this.mapJog.set(Perfil.email,this.soma);
          })
        })
      })
    })
  }

}
