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
      Parametro: ['', Validators.required],
    });
    this.ligacaoForm = this.formBuilder.group({
      TextoLigacao: ['', Validators.required],
    });
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
  }

  ngOnInit(): void {
  }

  peloNome() {
    console.log('nome');
    this.parametroSelecionado = 'nome';
  }

  peloPais() {
    console.log('pais');
    this.parametroSelecionado = 'pais';
  }

  peloEmail() {
    console.log('email');
    this.parametroSelecionado = 'email';
  }


  pesquisar() {
    if (this.parametroSelecionado == 'nome') {
      this.ligacaoService.getPerfilByNome(this.parametroForm.controls['Parametro'].value).subscribe(
        (res: any) => {
          this.listaPerfis.push(res)
            //console.log(res)
        }
      );
    } else if (this.parametroSelecionado == 'pais') {
      this.ligacaoService.getPerfilByPais(this.parametroForm.controls['Parametro'].value).subscribe(
        (res: any) => res.forEach((element: any) => {
          this.listaPerfis.push(element)
            //console.log(res)
        })
      );
    } else {
      this.ligacaoService.getPerfilByEmail(this.parametroForm.controls['Parametro'].value).subscribe(
        (res: any) => {
          this.listaPerfis.push(res)
            //console.log(res)
        }
      );
    }
  }

  onSubmit() {
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

    this.ligacaoService.getPerfilAtual(this.email).pipe(
      mergeMap((res: any) => this.ligacaoService.getJogadorAtual(res.id))).subscribe(
        (r: any) => {
          this.ligacaoService.getPerfilAtual(this.array[1]).pipe(
            mergeMap((res1: any) => this.ligacaoService.getJogadorAtual(res1.id))).subscribe(
              (res: any) => this.ligacaoService.getRelacoes(r.id).subscribe(
                (res2: any) => { res2.forEach((element: any) => {
                  //console.log(element.jogador2);
                  this.listaVerfica.push(element.jogador2);
                }); 
                if(this.listaVerfica.includes(res.id)){
                  this.toastr.error("Erro: Já são amigos!",undefined,{positionClass: 'toast-bottom-left'});
                  this.toastr.error("Erro: Não é possível realizar um pedido de ligação!",undefined,{positionClass: 'toast-bottom-left'});
                } else{
                  //console.log(r.id);
                  //console.log(res.id);
                  this.ligacaoService.registoLigacao({
                    id : '',
                    textoLigacao: this.ligacaoForm.controls['TextoLigacao'].value,
                    estado: this.estadoLigacao,
                    jogador1: res.id,
                    jogador2: r.id
                  } as Ligacao).subscribe((result: any) => {
                    console.log(result),
                    this.toastr.success("Pedido de Ligação realizado com sucesso!",undefined,{positionClass: 'toast-bottom-left'});
                  });
                    this.router.navigateByUrl('/home');
                }}))});
  }
}
