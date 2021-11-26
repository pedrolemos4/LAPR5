import { Component, OnInit } from '@angular/core';
import { IntroducaoService } from 'src/app/services/introducao/introducao.service';

@Component({
  selector: 'app-introducao',
  templateUrl: './introducao.component.html',
  styleUrls: ['./introducao.component.css']
})
export class IntroducaoComponent implements OnInit {

  constructor(private introducaoService: IntroducaoService) { }

  ngOnInit(): void {
    this.introducaoService.getIntroducoesPendentes(/*id do user atual*/);
  }

  onSubmit(){
    if(document.activeElement?.className == "aceitar") {
      //this.introducaoService.aceitarIntroducao(relacao1, relacao2, "Aceite");
    } else if(document.activeElement?.className == "rejeitar") {
      //this.introducaoService.rejeitarIntroducao("Recusado");
    }
  }
}
