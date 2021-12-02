import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CamCurtoService } from 'src/app/Services/CamCurto/cam-curto.service';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cam-curto',
  templateUrl: './cam-curto.component.html',
  styleUrls: ['./cam-curto.component.css']
})
export class CamCurtoComponent implements OnInit {
  emailCurrentUser: string | undefined = '';
  perfilCurrentUser!: Perfil;
  idPerfilCurrentUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: any = '';
  amigos: Jogador[] = [];
  emailAmigos : string [] = [];
  amigosIdList: string[] = [];
  amigosPerfilList : Perfil [] = [];
  selectedAmigo: string='';
  caminhoMaisCurtoForm: FormGroup;


  
  constructor(private formBuilder: FormBuilder,private camCurtoService: CamCurtoService, private router: Router) { 
    this.caminhoMaisCurtoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.camCurtoService.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      this.perfilCurrentUser = Perfil;
      this.idPerfilCurrentUser = Perfil.id;
      this.camCurtoService.getJogador(this.idPerfilCurrentUser).subscribe(Jogador => {
        this.currentUser = Jogador;
        this.idCurrentUser = this.currentUser.id;

        this.camCurtoService.getAmigos(this.idCurrentUser).subscribe(Amigos => {
          this.amigos = Amigos;
          this.amigos.forEach((element : any) => {
            this.amigosIdList.push(element.id);
          });
          this.amigosIdList.forEach((element: any) => {
            this.camCurtoService.getPerfilJogador(element).subscribe(Perfil => {
              this.amigosPerfilList.push(Perfil.id);
              this.emailAmigos.push(Perfil.email);
            });
          });
        });
      });
    });
  };

  selectAmigo(event:any){
    this.selectedAmigo=event.target.value;
  }

  onSubmit() {}
}
