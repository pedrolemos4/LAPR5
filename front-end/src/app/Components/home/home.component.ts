import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/Models/Perfil';
import { HomeService } from 'src/app/Services/Home/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  emailUser: string = '';
  idPerfilUser: string = '';
  nomeUser: string = '';
  pedirJogadorObjetivo: FormGroup;
  idJogadorAtivo!: string;
  container: any;
  showNames: string[] = [];

  nomes: string[] = [];
  constructor(private formBuilder: FormBuilder, private homeService: HomeService, private toastr: ToastrService) {
    this.pedirJogadorObjetivo = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.homeService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      this.nomeUser = Perfil.nome;
      this.idPerfilUser = Perfil.id;
      this.nomes.push(this.nomeUser);
      this.homeService.getJogadorAtual(this.idPerfilUser).subscribe(Jogador => {
        try {
          this.homeService.getRelacoesJogador(Jogador.id).subscribe(result => {
            document.getElementById("card").style.display = 'none';
          });
        } catch (error) {
          //this.homeService.getJogadoresSugeridos();
        }
      });
    });

  }
}
