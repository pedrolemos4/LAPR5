import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs';
import { Perfil } from 'src/app/Models/Perfil';
import { Relacao } from 'src/app/Models/Relacao';
import { RelacaoService } from 'src/app/Services/Relacao/relacao.service';

@Component({
  selector: 'app-relacao',
  templateUrl: './relacao.component.html',
  styleUrls: ['./relacao.component.css']
})
export class RelacaoComponent implements OnInit {
  relacaoForm: FormGroup;
  listaPerfis: Perfil[] = [];
  selected: string = '';
  test: string = '';
  final: string = '';
  final1: string = '';
  array: string [] = [];
  email: string = '';
  id: any = '';
  listaTags: string[] = new Array<string>();
  listaStringTags: string = '';


  constructor(private formBuilder: FormBuilder, private router: Router, private relacaoService: RelacaoService, private toastr: ToastrService) {
    this.relacaoForm = this.formBuilder.group({
      Tags: ['', Validators.required],
      forcaLigacao: ['', Validators.required],
    });
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
  }

  // convenience getter for easy access to form fields
  get f() { return this.relacaoForm.controls; }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.email = currentUser?.replace(/\"/g, "");
    //console.log(currentUser);
    //console.log(this.email);
    this.relacaoService.getPerfilAtual(this.email).pipe(
      mergeMap((res: any) => this.relacaoService.getJogadorAtual(res.id))).pipe(
        mergeMap((res1: any) => this.relacaoService.getListRelacoes(res1.id))).subscribe(
          (res2: any) => res2.forEach((element: any) => {
            //console.log(element.jogador2),
              this.relacaoService.getPerfilById(element.jogador2).subscribe(
                (r: any) => {
                  //console.log(r.nome),
                    this.listaPerfis.push(r)
                    //console.log(this.listaPerfis)
                })
              }));
  }

  onSubmit() {

    this.test = this.selected.replace("Nome: ", "");
    this.final = this.test.replace("Email: ", "");
    this.final1 = this.final.replace(" ", "");
    //console.log(this.final1);
    this.array = this.final1.split(",");
    //console.log(this.array[1]);

    this.relacaoService.getPerfilAtual(this.email).pipe(
      mergeMap((res: any) => this.relacaoService.getJogadorAtual(res.id))).subscribe(
        (r: any) => {
          this.relacaoService.getPerfilAtual(this.array[1]).pipe(
            mergeMap((res1: any) => this.relacaoService.getJogadorAtual(res1.id))).pipe(
              mergeMap((res: any) => this.relacaoService.getRelacao(r.id, res.id))).subscribe(
                (res2: any) => {
                  //console.log(res2.id);
                  this.listaStringTags = this.f['Tags'].value;
                  this.listaTags = this.listaStringTags.toString().split(",");
                  this.f['Tags'].setValue(this.listaTags);
                  //console.log(this.f['Tags'].value);
                  this.relacaoService.patchRelacao(res2.id, {
                    id: res2.id,
                    jogador1: res2.jogador1,
                    jogador2: res2.jogador2,
                    Tags: this.f['Tags'].value,
                    forcaRelacao: res2.forcaRelacao,
                    forcaLigacao: this.f['forcaLigacao'].value
                  } as Relacao).subscribe({
                    next: (res3: any) => {
                      console.log(res3);
                      this.toastr.success("Alteração realizada com sucesso!",undefined,{positionClass: 'toast-bottom-left'});
                      this.router.navigateByUrl('/home');
                    },
                    error: () => {
                      this.toastr.error("Erro: Serviço Não Disponível",undefined,{positionClass: 'toast-bottom-left'});
                    }
                  });
                });
        });
  }
}