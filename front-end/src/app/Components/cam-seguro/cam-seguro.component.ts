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
  constructor(private formBuilder: FormBuilder, private router: Router, private camSeguroService: CamSeguroService, private toastr: ToastrService) { 
    this.camSeguroForm = this.formBuilder.group({
      jogador: [''],
      forca: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    document.getElementById("divCaminho").style.display = 'none';
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.camSeguroService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      this.perfilUser = Perfil;
      this.idPerfilUser = Perfil.id;
      this.camSeguroService.getJogadorByPerfil(this.idPerfilUser).subscribe(Jogador => {
        this.currentUser = Jogador;
        this.idCurrentUser = this.currentUser.id;
        this.camSeguroService.getPerfis().subscribe(Perfis => {
          Perfis.forEach(element => {
            if (element.email != this.emailUser) {
              this.emailList.push(element.email);
            }
          });
        });
        // this.camForteService.getAmigos(this.idCurrentUser).subscribe(Amigos => {
        //   this.amigos = Amigos;
        //   this.amigos.forEach((element: any) => {
        //     this.amigosIdList.push(element.id);
        //   });
        //   this.amigosIdList.forEach((element: any) => {
        //     this.camForteService.getPerfilJogador(element).subscribe(Perfil => {
        //       this.amigosPerfilList.push(Perfil.id);
        //       this.emailAmigos.push(Perfil.email);
        //     });
        //   });
        // });
      });
    });
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedPlayer = event.target.value;
  }
  
  onSubmit(){
    document.getElementById("divCaminho").style.display = 'block';
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
          if(cam.length == 0) {
            this.toastr.error("Não existe nenhum caminho!",undefined,{positionClass: 'toast-bottom-left'});
          }
          for(var i = 0; i < cam.length; i++) {   
            this.camSeguroService.getPerfilJogador(cam[i]).subscribe(Perfil => {
              this.emailListCaminho.push(Perfil.email);
            })
          }
        });
      });
    });
  }

  return() {
    this.router.navigateByUrl("/ver_caminhos");
  }

}
