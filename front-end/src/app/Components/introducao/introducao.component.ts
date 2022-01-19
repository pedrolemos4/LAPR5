import { Component, OnInit } from '@angular/core';
import { forkJoin, map, merge, mergeMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IntroducaoService } from 'src/app/Services/introducao/introducao.service';
import { Relacao } from 'src/app/Models/Relacao';
import { Introducao } from 'src/app/Models/Introducao';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';

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

  emailUser: string = '';
  perfilUser!: Perfil;
  idPerfilUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: string = '';
  perfilList: Perfil[] = [];
  emailList: string[] = [];


  perfilIntrodutoresList: string[] = [];
  perfilListAux: any[][] = new Array<any[]>()
  perfilIniciaisList: string[] = [];
  constructor(private router: Router, private toastr: ToastrService, private introducaoService: IntroducaoService) {
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.introducaoService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      this.perfilUser = Perfil;
      this.idPerfilUser = Perfil.id;
      this.introducaoService.getJogadorByPerfil(this.idPerfilUser).subscribe(Response => {
        this.currentUser = Response;
        this.idCurrentUser = this.currentUser.id;
        this.introducaoService.getIntroducoesAprovarRejeitar(this.idCurrentUser).subscribe(Response => {
          this.listIntroducoes = Response;
          this.idCurrentUser = this.currentUser.id;
          this.listIntroducoes.forEach((introducao: Introducao) => {
            this.introducaoService.getPerfilJogador(introducao.jogadorIntrodutor).subscribe(Perfil => {
              // this.perfilIntrodutoresList.push(Perfil.email);
              this.introducaoService.getPerfilJogador(introducao.jogadorInicial).subscribe(Perfil2 => {
                // this.perfilIniciaisList.push(Perfil2.email);
                this.perfilListAux.push([Perfil.email,Perfil2.email,introducao.textoIntroducao,introducao]);
              })
            })
            // this.introducaoService.getPerfilJogador(introducao.jogadorInicial).subscribe(Perfil => {
            //   this.perfilIniciaisList.push(Perfil.email);
            // })
          });
        });
      });
    });
  }

  aceitar(intro: Introducao) {
    this.introducaoService.patchIntroducao(intro.id, {
      id: intro.id,
      jogadorInicial: intro.jogadorInicial,
      jogadorIntrodutor: intro.jogadorIntrodutor,
      jogadorObjetivo: intro.jogadorObjetivo,
      estadoIntroducao: "Aceite",
      textoIntroducao: "Mensagem"
    } as Introducao).pipe(
      mergeMap((res: any) =>
        this.introducaoService.criarRelacao1({
          id: '',
          jogador1: intro.jogadorInicial,
          jogador2: intro.jogadorObjetivo,
          tags: this.listavazia,
          forcaRelacao: this.forcaRelacao,
          forcaLigacao: this.forcaLigacao
        } as Relacao))).pipe(mergeMap((res: any) => this.introducaoService.criarRelacao2({
          id: '',
          jogador1: intro.jogadorObjetivo,
          jogador2: intro.jogadorInicial,
          tags: this.listavazia,
          forcaRelacao: this.forcaRelacao,
          forcaLigacao: this.forcaLigacao
        } as Relacao)))
      .subscribe({
        next: () => {
          this.toastr.success("Introdução aceite com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.toastr.error("Error: Service Unavailable", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
  }

  rejeitar(intro: Introducao) {
    console.log(intro);
    this.introducaoService.patchIntroducao(intro.id, {
      id: intro.id,
      jogadorInicial: intro.jogadorInicial,
      jogadorIntrodutor: intro.jogadorIntrodutor,
      jogadorObjetivo: intro.jogadorObjetivo,
      estadoIntroducao: "Recusado",
      textoIntroducao: "Mensagem"
    } as Introducao).subscribe({
      next: (result: any) => {
        console.log(result);
        this.toastr.success("Introdução rejeitada com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.toastr.error("Error: Service Unavailable", undefined, { positionClass: 'toast-bottom-left' });
      }
    });
  }

}
