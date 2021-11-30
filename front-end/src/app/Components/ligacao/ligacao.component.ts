import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs';
import { LigacaoService } from '../../Services/Ligacao/ligacao.service';

@Component({
  selector: 'app-ligacao',
  templateUrl: './ligacao.component.html',
  styleUrls: ['./ligacao.component.css']
})
export class LigacaoComponent implements OnInit {

  email: string | undefined = '';

  constructor(private formBuilder: FormBuilder, private ligacaoService: LigacaoService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    /*const currentUser = localStorage.getItem('currentUser');
    this.email = currentUser?.replace(/\"/g, "");
    console.log(currentUser);
    console.log(this.email);
    this.ligacaoService.getPerfilAtual(this.email).pipe(
      mergeMap((res: any) => this.ligacaoService.getJogadorAtual(res.id)))*/
  }

  peloNome(){
    console.log('nome');
  }

  peloPais(){
    console.log('pais');
  }

  peloEmail(){
    console.log('email');
  }

}
