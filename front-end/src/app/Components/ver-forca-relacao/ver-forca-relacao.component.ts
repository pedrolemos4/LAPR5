import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';
import { VerForcaRelacaoService } from 'src/app/Services/ForcaRelacao/ver-forca-relacao.service';
import { Relacao } from 'src/app/Models/Relacao';

@Component({
  selector: 'app-ver-forca-relacao',
  templateUrl: './ver-forca-relacao.component.html',
  styleUrls: ['./ver-forca-relacao.component.css']
})
export class VerForcaRelacaoComponent implements OnInit {

  emailCurrentUser: string | undefined = '';
  idCurrentUser: string;
  aux: string[] = new Array<string>();
  nomes: string[] = new Array<string>();
  lista100: number[] = new Array<number>();

  constructor(private toastr: ToastrService, private service: VerForcaRelacaoService) {
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.service.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      this.idCurrentUser = Perfil.id;
      this.service.getJogador(Perfil.id).subscribe(Jogador => {
        this.service.getRelacoesJogador(Jogador.id).subscribe(Relacoes => {
          // F is (FX + FY + 200*100)/400.
          if (Relacoes.length > 0) {
            Relacoes.forEach((relacao: Relacao) => {
              if (relacao.jogador1 == Jogador.id) {
                this.service.getPerfilJogador(relacao.jogador2).subscribe(Perfil2 => {
                  this.nomes.push(Perfil2.email + ' → ' + relacao.forcaRelacao);
                });
              }
            });
            this.toastr.success("Forças de relação listadas.", undefined, { positionClass: 'toast-bottom-left' });
          } else {
            this.toastr.error("Erro.", undefined, { positionClass: 'toast-bottom-left' });
          }
        });
      });
    });
  }

}
