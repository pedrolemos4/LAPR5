import { Component, OnInit } from '@angular/core';
import { CamForteService } from 'src/app/Services/CamForte/cam-forte.service';
import { Perfil } from 'src/app/Models/Perfil';
import { Jogador } from 'src/app/Models/Jogador';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cam-forte',
  templateUrl: './cam-forte.component.html',
  styleUrls: ['./cam-forte.component.css']
})
export class CamForteComponent implements OnInit {

  emailCurrentUser: string | undefined = '';
  perfilCurrentUser!: Perfil;
  idPerfilCurrentUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: any = '';
  amigos: Jogador[] = [];
  emailAmigos: string[] = [];
  amigosIdList: string[] = [];
  amigosPerfilList: Perfil[] = [];
  selectedAmigo: string = '';
  form: FormGroup;
  caminho: string;



  constructor(private formBuilder: FormBuilder, private camForteService: CamForteService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    document.getElementById("mensagem").style.display="none";
    //document.getElementById("mensagem1").style.display="none";
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.camForteService.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      this.perfilCurrentUser = Perfil;
      this.idPerfilCurrentUser = Perfil.id;
      this.camForteService.getJogador(this.idPerfilCurrentUser).subscribe(Jogador => {
        this.currentUser = Jogador;
        this.idCurrentUser = this.currentUser.id;
        this.camForteService.getPerfis().subscribe(Perfis => {
          Perfis.forEach(element => {
            if (element.email != this.emailCurrentUser) {
              this.emailAmigos.push(element.email);
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
  };

  selectAmigo(event: any) {
    this.selectedAmigo = event.target.value;
    document.getElementById("mensagem").style.display="block";
  }

  onSubmit() {
    //this.camForteService.getPerfilAtual(this.selectedAmigo).subscribe(Perfil => {
    //document.getElementById("mensagem1").style.display="block";
    this.camForteService.getCaminhoForte(this.emailCurrentUser, this.selectedAmigo).subscribe(Cam => {
      console.log(Cam);
      var aux = Object.values(Cam);
      var valores = aux[0];
      console.log(aux);
      if (valores.length == 0) {
        this.toastr.error("Não é possível calcular caminho. Selecione outro utilizador",undefined,{positionClass: 'toast-bottom-left'});
      } else {
        this.caminho = valores;
        this.toastr.success("Caminho mais forte calculado",undefined,{positionClass: 'toast-bottom-left'});
      }
    });
    //});
  }

}
