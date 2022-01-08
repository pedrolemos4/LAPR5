import { Component, OnInit } from '@angular/core';
import { BestfirstLigacaoRelacaoService } from 'src/app/Services/BestFirstLigacaoRelacao/bestfirst-ligacao-relacao.service';
import { Perfil } from 'src/app/Models/Perfil';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bestfirst-ligacao-relacao',
  templateUrl: './bestfirst-ligacao-relacao.component.html',
  styleUrls: ['./bestfirst-ligacao-relacao.component.css']
})
export class BestFirstLigacaoRelacaoComponent implements OnInit {

  form: FormGroup;
  nNiveis: number;
  emailJogadores: string[] = new Array<string>();
  selectedJogador: string;
  Caminho: string[] = new Array<string>();
  Custo: string;
  emailCurrentUser: string;
  idCurrentJogador: string;

  constructor(private formBuilder: FormBuilder, private service: BestfirstLigacaoRelacaoService, private toastr: ToastrService) {
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
          var aux = Object.values(Resultado);
          this.Custo = aux[1];
          if (aux[0].length == 0) {
            this.toastr.error("Selecione outro nível ou outro utilizador", undefined, { positionClass: 'toast-bottom-left' });
          } else {
            console.log(aux[0] + " 64");
            console.log(Object.values(aux[0]) + " 65");
            var var1 = aux[0] + '';
            console.log(var1+ " 67");
            var auxArray = var1.split(",");
            console.log(auxArray+" 69");
            console.log(auxArray.length+" 70");
            auxArray.forEach((element: any) => {
              this.service.getJogadorById(element).subscribe(Jogador => {
                console.log(Jogador.id);
                this.service.getPerfilJogador(Jogador.id).subscribe(Perfil => {
                  console.log(Perfil.email);
                  this.Caminho.push(Perfil.email);
                });
              });
            });
            this.toastr.success("Soluções encontradas", undefined, { positionClass: 'toast-bottom-left' });
          }
        });
      });
    });
    document.getElementById("mensagem1").style.display = "block";
    document.getElementById("mensagem2").style.display = "block";
  }

}