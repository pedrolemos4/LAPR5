import { Component, OnInit } from '@angular/core';
import { forkJoin, map, merge, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IntroducaoService } from 'src/app/Services/Introducao/introducao.service';
import { Relacao } from 'src/app/Models/Relacao';
import { Introducao } from 'src/app/Models/Introducao';
import { Jogador } from 'src/app/Models/Jogador';

@Component({
  selector: 'app-introducao',
  templateUrl: './introducao.component.html',
  styleUrls: ['./introducao.component.css']
})
export class IntroducaoComponent implements OnInit {
  listIntroducoes: Introducao[] = [];
  id: string = '';
  listavazia: string[] = [];
  selectedUser: string = '';
  forcaRelacao: number = 1;
  forcaLigacao: number = 1;

  emailUser: string|any = '';
  perfilId: string = '';
  jogadorId: string = '';
  constructor(private router: Router, private toastr: ToastrService, private introducaoService: IntroducaoService) { 
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    console.log(this.emailUser);

    this.introducaoService.getPerfilByEmail(this.emailUser).pipe(
    mergeMap((result: any) => this.introducaoService.getJogadorByPerfil(result.id))).pipe(
      mergeMap((result2: any) => this.introducaoService.getIntroducoesAprovarRejeitar(result2.id))).subscribe(introsPendentes => {
      this.listIntroducoes = introsPendentes;
      console.log(this.listIntroducoes.length);
    });
  }

  aceitar(intro:Introducao) {
    this.introducaoService.patchIntroducao(intro.id, {
      id: intro.id,
      jogadorInicial: intro.jogadorInicial,
      jogadorIntrodutor: intro.jogadorIntrodutor,
      jogadorObjetivo: intro.jogadorObjetivo,
      estado: 'Aceite',
      textoIntroducao: 'Mensagem'
    } as Introducao).pipe(
      mergeMap((res: any) => 
      this.introducaoService.criarRelacao1({
        id: '',
        jogador1: intro.jogadorInicial,
        jogador2: intro.jogadorObjetivo,
        Tags: this.listavazia,
        forcaRelacao: this.forcaRelacao,
        forcaLigacao: this.forcaLigacao
      } as Relacao))).pipe(mergeMap((res: any) => this.introducaoService.criarRelacao2({
        id: '',
        jogador1: intro.jogadorObjetivo,
        jogador2: intro.jogadorInicial,
        Tags: this.listavazia,
        forcaRelacao: this.forcaRelacao,
        forcaLigacao: this.forcaLigacao
      } as Relacao)))
      .subscribe({
        next: () => {
          this.toastr.success('Introdução aceite com sucesso!');
          this.router.navigateByUrl('/introducao');
        },
        error: () => {
          this.toastr.error("Error: Service Unavailable");
        }
      });
  }

  rejeitar(intro:Introducao) {
    console.log(intro);
    this.introducaoService.patchIntroducao(intro.id, {
      id: intro.id,
      jogadorInicial: intro.jogadorInicial,
      jogadorIntrodutor: intro.jogadorIntrodutor,
      jogadorObjetivo: intro.jogadorObjetivo,
      estado: 'Recusado',
      textoIntroducao: 'Mensagem'
    } as Introducao).subscribe({
      next: (result: any) => {
        console.log(result);
        this.toastr.success('Introdução rejeitada com sucesso!');
        this.router.navigateByUrl('/introducao');
      },
      error: () => {
        this.toastr.error("Error: Service Unavailable");
      }
    });
  }

}
