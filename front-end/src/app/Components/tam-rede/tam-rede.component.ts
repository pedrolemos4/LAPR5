import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';
import { TamRedeService } from 'src/app/Services/TamRede/tam-rede.service';
import { FortalezaRedeService } from 'src/app/Services/FortalezaRede/fortaleza-rede.service';
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
  soma: string;
  rede: number;
  tamanho: string;
  div: boolean = false;
  div2: boolean = false;

  constructor(private fortalezaService: FortalezaRedeService, private formBuilder: FormBuilder, private tamRedeService: TamRedeService, private toastr: ToastrService) {
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
        this.fortalezaService.getFortalezaRede(Jogador.id).subscribe(Rede => {
          var res = Object.values(Rede);
          this.soma = res[0];
        });
      });
    });
  };

  onSubmit() {
    this.tamanho = "";
    var nivel = document.getElementById("nivel") as HTMLInputElement;
    if (nivel.value.match("1") || nivel.value.match("2") || nivel.value.match("3")) {
      this.tamRedeService.getTamRede(this.idCurrentUser, nivel.value).subscribe(Rede => {
        var res = Object.values(Rede);
        this.tamanho = res[0];
        this.div2 = true;
        this.div = false;
      });
    } else {
      this.toastr.error("Nivel tem que ser entre 1 e 3!", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

  dimensaoRede() {
    this.rede = 0;
    this.tamRedeService.getDimensaoTotal().subscribe(Rede => {
      this.rede = Rede.length;
      this.div = true;
      this.div2 = false;
    });
  }
}