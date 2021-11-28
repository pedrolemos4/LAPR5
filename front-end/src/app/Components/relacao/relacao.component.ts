import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap, Observable } from 'rxjs';
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
  combobox: FormGroup;
  listaPerfis: Perfil [] = [];
  selected: string = '';
  email: string | undefined = '';


  constructor(private formBuilder: FormBuilder, private relacaoService: RelacaoService, private toastr: ToastrService, private router: Router) {
    this.relacaoForm = this.formBuilder.group({
      listaTags: ['', Validators.required],
      forcaLigacao: ['', Validators.required],
    });
    this.combobox = this.formBuilder.group({
      relacao: '',
    });
   }

   selectChangeHandler(event: any) {
    //update the ui
    this.selected = event.target.value;
  }

  // convenience getter for easy access to form fields
  get f() { return this.relacaoForm.controls; }
  get f1() { return this.combobox.controls; }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.email = currentUser?.replace(/\"/g, "");
    console.log(currentUser);
    console.log(this.email);
    this.relacaoService.getPerfilAtual(this.email).pipe(
      mergeMap((res: any) => this.relacaoService.getJogadorAtual(res.id))).pipe(
        mergeMap((res1: any) => this.relacaoService.getListRelacoes(res1.id))).pipe(
          mergeMap((res2: any) => res2.forEach((element:any) => {
            console.log(element.jogador2),
            this.relacaoService.getPerfilById(element.jogador2).subscribe(
            (r:any) =>{ 
              console.log(r.nome),
              this.listaPerfis.push(r),
            console.log(this.listaPerfis)})})))
            .subscribe({
        next: (res3: any) => {
          console.log(res3);
          console.log(this.listaPerfis);
        },
        error: () => {
          this.toastr.error("Error: Service Unavailable");
        }
      });
  }

  onSubmit(){
    // this.relacaoService.getPerfilAtual(this.email).pipe(
    //   mergeMap((res: any) => this.relacaoService.getJogadorAtual(res.id))).subscribe(
    //     (res: any) =>{
    //       localStorage.setItem('idInicial', JSON.stringify(res.Id));
    //     }
    //   );

    // this.relacaoService.getPerfilAtual(this.selected).pipe(
    //   mergeMap((res1: any) => this.relacaoService.getJogadorAtual(res1.id))).pipe(
    //     mergeMap((res: any) => this.relacaoService.getRelacao(localStorage.getItem('idInicial'),res.id))).subscribe({
    //       next: (res1: any) => {
    //         res1.forcaLigacao = this.f['forcaLigacao'].value;
    //         res1.listaTags = this.f['listaTags'].value;
    //         //this.f1['relacao'].setValue(res1);
    //         this.relacaoService.patchRelacao(res1.id, res1);
    //       },
    //       error: () => {
    //         this.toastr.error("Error: Service Unavailable");
    //       }
    //     }); 
  }
}
