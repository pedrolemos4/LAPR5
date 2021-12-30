import { Component, OnInit } from '@angular/core';
import { AlgoritmoLigacaoRelacaoService } from 'src/app/Services/AlgoritmoLigacaoRelacao/algoritmo-ligacao-relacao.service';
import { Perfil } from 'src/app/Models/Perfil';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-algoritmo-ligacao-relacao',
  templateUrl: './algoritmo-ligacao-relacao.component.html',
  styleUrls: ['./algoritmo-ligacao-relacao.component.css']
})
export class AlgoritmoLigacaoRelacaoComponent implements OnInit {

  form: FormGroup;
  nNiveis: number;
  emailJogadores: string[] = new Array<string>();
  selectedJogador: string;
  Caminho: string;
  Custo: string;
  emailCurrentUser: string;
  idCurrentJogador: string;

  constructor(private formBuilder: FormBuilder, private service: AlgoritmoLigacaoRelacaoService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      numeroNiveis: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    document.getElementById("mensagem").style.display = "none";
    document.getElementById("mensagem1").style.display = "none";
    document.getElementById("mensagem2").style.display = "none";
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.service.getPerfilAtualEmail(this.emailCurrentUser).subscribe(PerfilAtual => {
      this.service.getJogador(PerfilAtual.id).subscribe(JogadorAtual => {
        this.idCurrentJogador = JogadorAtual.id;
        this.service.getPerfis().subscribe(TodosPerfis => {
          TodosPerfis.forEach((element: Perfil) => {
            if (element.id != PerfilAtual.id) {
              this.emailJogadores.push(element.email);
            }
          });
        });
      });
    });
  }

  selectAmigo(event: any) {
    this.selectedJogador = event.target.value;
    document.getElementById("mensagem").style.display = "block";
  }

  onSubmit() {
    this.nNiveis = this.form.controls['numeroNiveis'].value;
    this.service.getPerfilAtualEmail(this.selectedJogador).subscribe(PerfilSelecionado => {
      this.service.getJogador(PerfilSelecionado.id).subscribe(JogadorSelecionado => {
        this.service.getResultadosAlgoritmo(this.idCurrentJogador, JogadorSelecionado.id, this.nNiveis).subscribe(Resultado => {
          console.log(Resultado);
          console.log(Resultado[0]);
          console.log(Resultado[1]);
          console.log(Resultado[1]);
          var camAux = Object.values(Resultado[0]);
          var custoAux = Object.values(Resultado[1]);
          console.log(camAux);
          console.log(custoAux);
          this.Custo = custoAux[0];
          console.log(camAux[0]);
          console.log(custoAux[1]);
          if (camAux[0].length == 0) {
            this.toastr.error("Selecione outro nível ou outro utilizador", undefined, { positionClass: 'toast-bottom-left' });
          } else {
            this.Caminho = camAux[0];
            this.toastr.success("Soluções encontradas", undefined, { positionClass: 'toast-bottom-left' });
          }
        });
      });
    });
    document.getElementById("mensagem1").style.display = "block";
    document.getElementById("mensagem2").style.display = "block";
  }

}
