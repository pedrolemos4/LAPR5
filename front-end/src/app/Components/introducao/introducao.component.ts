import { Component, OnInit } from '@angular/core';
import { forkJoin, map, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IntroducaoService } from 'src/app/services/Introducao/introducao.service';
import { Relacao } from 'src/app/Models/Relacao';

@Component({
  selector: 'app-introducao',
  templateUrl: './introducao.component.html',
  styleUrls: ['./introducao.component.css']
})
export class IntroducaoComponent implements OnInit {
  currentUser = localStorage.getItem('currentUser');

  id: string = '';
  listavazia: string[] = [];
  selected: string = '';
  estado: string = '';
  forcaRelacao: number = 0;
  forcaLigacao: number = 0;

  constructor(private router: Router, private toastr: ToastrService, private introducaoService: IntroducaoService) { 
  }

  ngOnInit(): void {
    this.introducaoService.getIntroducoesPendentes(/*id do user atual*/)
  }

  onSubmit(){
    if(document.activeElement?.className == "aceitar") {
      this.introducaoService.aceitarIntroducao("Aceite");
    } else if(document.activeElement?.className == "rejeitar") {
      this.introducaoService.rejeitarIntroducao("Recusado");
    }

    this.introducaoService.aceitarIntroducao(this.estado).pipe(
      mergeMap((res: any) => this.introducaoService.criarRelacao1({
        jogador1: this.currentUser,
        jogador2: this.selected,
        listaTags: this.listavazia,
        forcaRelacao: this.forcaRelacao,
        forcaLigacao: this.forcaLigacao
      } as Relacao).pipe(mergeMap((res2: any) => this.introducaoService.criarRelacao2({
        jogador1: this.selected,
        jogador2: this.currentUser,
        listaTags: this.listavazia,
        forcaRelacao: this.forcaRelacao,
        forcaLigacao: this.forcaLigacao
      } as Relacao)))))
      .subscribe({
        next: () => {
          this.toastr.success('Introdução realizada com sucesso!');
          this.router.navigateByUrl('/introducao');
        },
        error: () => {
          this.toastr.error("Error: Service Unavailable");
        }
      });
  }
}
