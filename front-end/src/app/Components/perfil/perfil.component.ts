import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from 'src/app/Services/Perfil/perfil.service';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/Models/Perfil';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  editarPerfilForm: FormGroup;
  estadosForm: FormGroup;
  emailUser: string | undefined = '';
  id: any;
  Perfil!: Perfil;
  tags: string[] = new Array<string>();
  mudou: number = 0;
  arrayNomesEstados: string[] = ["Joyful", "Distressed", "Hopeful", "Fearful", "Relieved", "Disappointed", "Proud", "Remorseful", "Grateful", "Angry"];
  arrayFinalEstados: string[] = [];
  dict = {};

  constructor(private formBuilder: FormBuilder, private perfilService: PerfilService, private toastr: ToastrService, private router: Router) {
    this.editarPerfilForm = this.formBuilder.group({
      nome: '',
      pais: '',
      tags: ''
    });

    this.estadosForm = this.formBuilder.group({
      joyful: '',
      distressed: '',
      hopeful: '',
      fearful: '',
      relieved: '',
      disappointed: '',
      proud: '',
      remorseful: '',
      grateful: '',
      angry: ''
    });
  }

  ngOnInit(): void {
    const targetDiv1 = document.getElementById("estados");
    targetDiv1.style.display = "none";
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.perfilService.getPerfilAtual(this.emailUser).subscribe(Perfil => {
      this.id = Perfil.id;
      console.log(this.id);
      this.Perfil = Perfil;
    });
  }

  onVoltarEstados() {
    const targetDiv = document.getElementById("estados");
    targetDiv.style.display = "none";
  }

  escolherEstados() {
    this.mudou = 1;
    console.log(this.mudou);
    const targetDiv = document.getElementById("estados");
    if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
    } else {
      targetDiv.style.display = "block";
    }
  }

  onSubmit() {
    console.log(this.Perfil.pais);
    if (this.mudou == 1) {
      var s: any, valor: any, stringFinal: any;
      var arrayEstadosInalterados: string[] = [];
      this.arrayNomesEstados.forEach(element => {
        s = this.estadosForm.controls[element.toLowerCase()].value.toString();
        valor = s.replace(".", ",");
        stringFinal = element.concat(" ").concat(valor);
        console.log(stringFinal);
        if (valor == '') {
          arrayEstadosInalterados.push(element);
        } else {
          this.arrayFinalEstados.push(stringFinal);
          this.dict[element] = this.estadosForm.controls[element.toLowerCase()].value;
        }
      });

      console.log(this.Perfil.estadoHumor);
      if (arrayEstadosInalterados.length != 0) {
        for (var key in this.Perfil.estadoHumor) {
        // for (var i = 0; i < this.Perfil.estadoHumor.length; i++) {
          // if (arrayEstadosInalterados.includes(this.Perfil.estadoHumor[i].split(' ')[0])) {
            if (arrayEstadosInalterados.includes(key)) {
            //this.arrayFinalEstados.push(this.Perfil.estadoHumor[i]);
            
            this.dict[key] = this.Perfil.estadoHumor[key];
          }
        }
      }

      this.perfilService.patchTags(this.id, {
        id: this.Perfil.id,
        avatar: this.Perfil.avatar,
        nome: this.Perfil.nome,
        email: this.Perfil.email,
        telefone: this.Perfil.telefone,
        pais: this.Perfil.pais,
        cidade: this.Perfil.cidade,
        dataNascimento: this.Perfil.dataNascimento,
        estadoHumor: this.dict,
        password: this.Perfil.password,
        tags: this.Perfil.tags,
        perfilFacebook: this.Perfil.perfilFacebook,
        perfilLinkedin: this.Perfil.perfilLinkedin
      } as Perfil).subscribe({
        next: () => {
          this.toastr.success("Estado de Humor editado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
        }
      });

    }

    if (this.editarPerfilForm.controls['nome'].value != '') {
      this.perfilService.editarPerfil(this.id, {
        id: this.Perfil.id,
        avatar: this.Perfil.avatar,
        nome: this.editarPerfilForm.controls['nome'].value,
        email: this.Perfil.email,
        telefone: this.Perfil.telefone,
        pais: this.Perfil.pais,
        cidade: this.Perfil.cidade,
        dataNascimento: this.Perfil.dataNascimento,
        estadoHumor: this.Perfil.estadoHumor,
        password: this.Perfil.password,
        tags: this.Perfil.tags,
        perfilFacebook: this.Perfil.perfilFacebook,
        perfilLinkedin: this.Perfil.perfilLinkedin
      }).subscribe({
        next: () => {
          this.toastr.success("Nome editado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    }

    if (this.editarPerfilForm.controls['pais'].value != '') {
      this.perfilService.editarPerfil(this.id, {
        id: this.Perfil.id,
        avatar: this.Perfil.avatar,
        nome: this.Perfil.nome,
        email: this.Perfil.email,
        telefone: this.Perfil.telefone,
        pais: this.editarPerfilForm.controls['pais'].value,
        cidade: this.Perfil.cidade,
        dataNascimento: this.Perfil.dataNascimento,
        estadoHumor: this.Perfil.estadoHumor,
        password: this.Perfil.password,
        tags: this.Perfil.tags,
        perfilFacebook: this.Perfil.perfilFacebook,
        perfilLinkedin: this.Perfil.perfilLinkedin
      }).subscribe({
        next: () => {
          this.toastr.success("País editado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    }

    var aux = new Array<string>();
    aux = this.editarPerfilForm.controls['tags'].value.split(",");
    console.log(aux);
    if (this.editarPerfilForm.controls['tags'].value != '') {
      this.perfilService.patchTags(this.id, {
        id: this.Perfil.id,
        avatar: this.Perfil.avatar,
        nome: this.Perfil.nome,
        email: this.Perfil.email,
        telefone: this.Perfil.telefone,
        pais: this.Perfil.pais,
        cidade: this.Perfil.cidade,
        dataNascimento: this.Perfil.dataNascimento,
        estadoHumor: this.Perfil.estadoHumor,
        password: this.Perfil.password,
        tags: aux,
        perfilFacebook: this.Perfil.perfilFacebook,
        perfilLinkedin: this.Perfil.perfilLinkedin
      }).subscribe({
        next: () => {
          this.toastr.success("Tags editadas com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    }
  }
}
