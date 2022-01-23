import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs';
import { Ligacao } from 'src/app/Models/Ligacao';
import { Perfil } from 'src/app/Models/Perfil';
import { LigacaoService } from '../../Services/Ligacao/ligacao.service';

@Component({
  selector: 'app-ligacao',
  templateUrl: './ligacao.component.html',
  styleUrls: ['./ligacao.component.css']
})
export class LigacaoComponent implements OnInit {

  parametroForm: FormGroup;
  ligacaoForm: FormGroup;
  email: string | undefined = '';
  selected: string = '';
  listaPerfis: Perfil[] = [];
  parametroSelecionado: string = '';
  test: string = '';
  final: string = '';
  final1: string = '';
  array: string[] = [];
  estadoLigacao: string = 'Pendente';
  jogador1: any;
  jogador2: any;
  listaVerfica: any[] = [];

  constructor(private formBuilder: FormBuilder, private ligacaoService: LigacaoService, private toastr: ToastrService, private router: Router) {
    this.parametroForm = this.formBuilder.group({
      Parametro: '',
    });
    this.ligacaoForm = this.formBuilder.group({
      TextoLigacao: ['', Validators.required],
    });
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;

    const currentUser = localStorage.getItem('currentUser');
    this.email = currentUser?.replace(/\"/g, "");
    //console.log(currentUser);
    //console.log(this.email);

    this.test = this.selected.replace("Nome: ", "");
    this.final = this.test.replace("Email: ", "");
    this.final1 = this.final.replace(" ", "");
    //console.log(this.final1);
    this.array = this.final1.split(",");
    //console.log(this.array[1]);
    if (this.selected != 'Escolha...') {
      this.ligacaoService.getPerfilAtual(this.email).pipe(
        mergeMap((res: any) => this.ligacaoService.getJogadorAtual(res.id))).subscribe(
          (r: any) => {
            this.ligacaoService.getPerfilAtual(this.array[1]).pipe(
              mergeMap((res1: any) => this.ligacaoService.getJogadorAtual(res1.id))).subscribe(
                (res: any) => this.ligacaoService.getRelacoes(r.id).subscribe(
                  (res2: any) => {
                    res2.forEach((element: any) => {
                      //console.log(element.jogador2);
                      this.listaVerfica.push(element.jogador2);
                    });
                    if (this.listaVerfica.includes(res.id)) {
                      this.displayNoneById("send");
                      this.toastr.error("Erro: Já são amigos!", undefined, { positionClass: 'toast-bottom-left' });
                    } else if (this.array[1] == this.email) {
                      this.displayNoneById("send");
                      this.toastr.error("Erro: Não é possível realizar um pedido de ligação a si mesmo!", undefined, { positionClass: 'toast-bottom-left' });
                    } else {
                      console.log('nao sao amigos');
                      this.displayBlockById("send");
                    }
                  }
                )
              )
          }
        );


      this.displayBlockById("jogadorParagrafo");
    }
  }

  ligacao() {
    this.displayBlockById("cardLigacao");
    this.displayNoneById("cardPrincipal");
  }

  selectChangeHandlerParametro(event: any) {
    this.listaPerfis = [];
    this.selected = '';
    this.parametroForm.controls['Parametro'].setValue('');
    this.parametroSelecionado = event.target.value;
    this.displayBlockById("pesquisaJogadorParametro");
    this.displayNoneById("resultadosPesquisa");
    this.displayNoneById("resultadosPesquisaCard");
    this.displayNoneById("jogadorParagrafo");
  }

  ngOnInit(): void {
    this.displayNoneById("pesquisaJogadorParametro");
    this.displayNoneById("resultadosPesquisa");
    this.displayNoneById("resultadosPesquisaCard");
    this.displayNoneById("cardLigacao");
  }

  displayNoneById(id: any) {
    const targetDiv3 = document.getElementById(id);
    targetDiv3.style.display = "none";
  }

  displayBlockById(id: any) {
    const targetDiv3 = document.getElementById(id);
    targetDiv3.style.display = "block";
  }

  pesquisar() {
    this.listaPerfis = [];
    this.selected = '';
    this.displayNoneById("jogadorParagrafo");
    if (this.parametroSelecionado == 'Nome') {
      this.ligacaoService.getPerfilByNome(this.parametroForm.controls['Parametro'].value).subscribe(
        (res: any) => {
          this.listaPerfis.push(res);
        }
      );
    } else if (this.parametroSelecionado == 'País') {
      this.ligacaoService.getPerfilByPais(this.parametroForm.controls['Parametro'].value).subscribe(
        (res: any) => res.forEach((element: any) => {
          this.listaPerfis.push(element);
        })
      );
    } else {
      this.ligacaoService.getPerfilByEmail(this.parametroForm.controls['Parametro'].value).subscribe(
        (res: any) => {
          this.listaPerfis.push(res);
        }
      );
    }
    this.displayBlockById("resultadosPesquisa");
    this.displayBlockById("resultadosPesquisaCard");
  }

  onSubmit() {
    console.log(this.email);
    console.log(this.array[1]);
    this.ligacaoService.getPerfilAtual(this.email).subscribe(
      (res: any) => {
        this.ligacaoService.getJogadorAtual(res.id).subscribe(
          (res1: any) => {
            this.ligacaoService.getPerfilAtual(this.array[1]).subscribe(
              (res2: any) => {
                this.ligacaoService.getJogadorAtual(res2.id).subscribe(
                  (res3: any) => {
                    this.ligacaoService.registoLigacao({
                      id: '',
                      textoLigacao: this.ligacaoForm.controls['TextoLigacao'].value,
                      estado: this.estadoLigacao,
                      jogador1: res1.id,
                      jogador2: res3.id
                    } as Ligacao).subscribe((result: any) => {
                        console.log(result),
                        this.toastr.success("Pedido de Ligação realizado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
                    });
                  }
                );
              }
            );
          }
        );
        
      }
    );
    //this.router.navigateByUrl('/home');

  }

  return(){
    this.displayNoneById("cardLigacao");
    this.displayBlockById("cardPrincipal");
  }
}
