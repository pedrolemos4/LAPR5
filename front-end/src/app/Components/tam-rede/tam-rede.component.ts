import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';
import { TamRedeService } from 'src/app/Services/TamRede/tam-rede.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tam-rede',
  templateUrl: './tam-rede.component.html',
  styleUrls: ['./tam-rede.component.css']
})
export class TamRedeComponent implements OnInit {
  tamRedeForm: FormGroup;

  emailCurrentUser: string | undefined = '';
  perfilCurrentUser!: Perfil;
  idPerfilCurrentUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: any = '';

  constructor(private formBuilder: FormBuilder, private tamRedeService: TamRedeService, private toastr: ToastrService) { 
    this.tamRedeForm = this.formBuilder.group({
      nivel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.tamRedeService.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      this.perfilCurrentUser = Perfil;
      this.idPerfilCurrentUser = Perfil.id;
      this.tamRedeService.getJogador(this.idPerfilCurrentUser).subscribe(Jogador => {
        this.currentUser = Jogador;
        this.idCurrentUser = this.currentUser.id;
      });
    });
  };

  onSubmit(){
    var nivel = document.getElementById('nivel') as HTMLInputElement;
    console.log(nivel.value);
    this.tamRedeService.getTamRede(nivel.value, this.idCurrentUser).subscribe(Rede => {
      var res = Object.values(Rede);
      var tamanho = res[0];
      this.toastr.success("Tamanho da Rede: " + tamanho);
    });
  }

}
