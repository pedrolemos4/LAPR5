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
  selectedPlayer: string = '';
  playersList: Jogador[] = [];
  
  emailUser: string = '';
  perfilUser!: Perfil;
  idPerfilUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: string = '';
  perfilList: Perfil[] = [];
  emailList: string[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private camSeguroService: CamSeguroService) { 
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
      console.log(this.idPerfilUser);
      this.camSeguroService.getJogadorByPerfil(this.idPerfilUser).subscribe(Response => {
        this.currentUser = Response;
        this.idCurrentUser = this.currentUser.id;
        console.log(this.idCurrentUser);
        this.camSeguroService.getAmigosPossiveis(this.idCurrentUser).subscribe(Response => {
          this.playersList = Response;
          console.log(this.playersList);
          this.playersList.forEach((element: any) => {
            this.perfilList.push(element.perfilId);
          })
          console.log(this.perfilList);
          this.perfilList.forEach((id: any) => {
            this.camSeguroService.getPerfilById(id).subscribe(Perfil => {
              this.emailList.push(Perfil.email);
            })
            console.log(this.emailList);
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
    //ligacao com prolog
  }

}
