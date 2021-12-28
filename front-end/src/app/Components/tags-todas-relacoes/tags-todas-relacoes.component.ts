import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Relacao } from 'src/app/Models/Relacao';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TagsTodasRelacoesService } from 'src/app/Services/TagsTodasRelacoes/tags-todas-relacoes.service';

@Component({
  selector: 'app-tags-todas-relacoes',
  templateUrl: './tags-todas-relacoes.component.html',
  styleUrls: ['./tags-todas-relacoes.component.css']
})
export class TagsTodasRelacoesComponent implements OnInit {

  listaRelacoes: string[] = new Array<string>();
  relacaoSelecionada: string;
  tagsRelacao: string[] = new Array<string>();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private service: TagsTodasRelacoesService) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    document.getElementById("mensagem1").style.display = "none";
    this.service.getRelacoes().subscribe(Relacoes => {
      Relacoes.forEach((element: Relacao) => {
        this.service.getPerfilJogador(element.jogador1).subscribe(name1 => {
          this.service.getPerfilJogador(element.jogador2).subscribe(name2 => { //nao repetir relacoes
            var aux = name2.email + " - " + name1.email;
            if (!this.listaRelacoes.includes(aux)) {
              this.listaRelacoes.push(name1.email + " - " + name2.email);
            }
          });
        });
      });
    });
  }

  selectAmigo(event: any) {
    this.relacaoSelecionada = event.target.value;
  }

  onSubmit() {
    document.getElementById("mensagem1").style.display = "block";
    var split = this.relacaoSelecionada.split(" - ");
    this.service.getPerfilByEmail(split[0]).subscribe(Perfil1 => {
      this.service.getPerfilByEmail(split[1]).subscribe(Perfil2 => {
        this.service.getJogadorByPerfil(Perfil1.id).subscribe(Jogador1 => {
          this.service.getJogadorByPerfil(Perfil2.id).subscribe(Jogador2 => {
            this.service.getRelacaoEntreJogadores(Jogador1.id, Jogador2.id).subscribe(Relacao => {
              if (Relacao.tags.length > 0) {
                this.tagsRelacao = Relacao.tags;
              } else {
                this.tagsRelacao.push("Não existem tags");
                this.toastr.error("Não foram encontradas tags na relação selecionada.");
              }
            });
          });
        });
      });
    });
  }

}
