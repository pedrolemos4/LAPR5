import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CamSeguroService } from 'src/app/Services/CamSeguro/cam-seguro.service';
import { Jogador } from 'src/app/Models/Jogador';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { Perfil } from 'src/app/Models/Perfil';

@Component({
  selector: 'app-cam-seguro',
  templateUrl: './cam-seguro.component.html',
  styleUrls: ['./cam-seguro.component.css']
})
export class CamSeguroComponent implements OnInit {
  
  camSeguroForm: FormGroup;
  selectedUser!: Jogador;
  selectedPlayer: string = '';
  idSelectedPlayer: string = '';
  perfilSelectedUser!: Perfil;
  idPerfilSelectedUser: string = '';

  playersList: Jogador[] = [];

  emailUser: string = '';
  perfilUser!: Perfil;
  idPerfilUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: string = '';
  perfilList: Perfil[] = [];
  emailList: string[] = [];
  emailListCaminho: string[] = [];
  constructor(private formBuilder: FormBuilder, private camSeguroService: CamSeguroService, private toastr: ToastrService) { 
    this.camSeguroForm = this.formBuilder.group({
      jogador: [''],
      forca: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.camSeguroService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      this.perfilUser = Perfil;
      this.idPerfilUser = Perfil.id;
      this.camSeguroService.getJogadorByPerfil(this.idPerfilUser).subscribe(Response => {
        this.currentUser = Response;
        this.idCurrentUser = this.currentUser.id;
        this.camSeguroService.getAmigosPossiveis(this.idCurrentUser).subscribe(Response => {
          this.playersList = Response;
          this.playersList.forEach((element: any) => {
            this.perfilList.push(element.perfilId);
          })
          this.perfilList.forEach((id: any) => {
            this.camSeguroService.getPerfilById(id).subscribe(Perfil => {
              this.emailList.push(Perfil.email);
            })
          });
        });
      });
    });
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedPlayer = event.target.value;
  }
  
  onSubmit(){
    var forca = document.getElementById('forca') as HTMLInputElement;
    this.camSeguroService.getPerfilByEmail(this.selectedPlayer).subscribe(Perfil => {
      this.perfilSelectedUser = Perfil;
      this.idPerfilSelectedUser = Perfil.id;
      this.camSeguroService.getJogadorByPerfil(this.idPerfilSelectedUser).subscribe(Response => {
        this.selectedUser = Response;
        this.idSelectedPlayer = this.selectedUser.id;
        this.camSeguroService.getCamSeguro(this.idCurrentUser, this.idSelectedPlayer, forca.value).subscribe(Caminho => {
          var caminho = Object.values(Caminho);
          var cam = caminho[0];
          for(var i = 0; i < cam.length; i++) {   
            this.camSeguroService.getPerfilJogador(cam[i]).subscribe(Perfil => {
              this.emailListCaminho.push(Perfil.email);
            })
          }
        });
      });
    });
    
  }

}
