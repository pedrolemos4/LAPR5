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
  emailUser: string | undefined = '';
  id: any;
  Perfil!: Perfil;
  tags: string[] = new Array<string>();

  constructor(private formBuilder: FormBuilder, private perfilService: PerfilService, private toastr: ToastrService, private router: Router) {
    this.editarPerfilForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      pais: ['', Validators.required],
      estadodehumor: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.perfilService.getPerfilAtual(this.emailUser).subscribe(Perfil => {
      this.id = Perfil.id;
      console.log(this.id);
      this.Perfil = Perfil;
    })

  }

  onSubmit() {
    if (this.editarPerfilForm.controls['nome'].value != "") {
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

    if (this.editarPerfilForm.controls['email'].value != "") {
      this.perfilService.editarPerfil(this.id, {
        id: this.Perfil.id,
        avatar: this.Perfil.avatar,
        nome: this.Perfil.nome,
        email: this.editarPerfilForm.controls['email'].value,
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
          localStorage.setItem('currentUser', this.editarPerfilForm.controls['email'].value);
          this.toastr.success("Email editado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    }

    if (this.editarPerfilForm.controls['pais'].value != "") {
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
          this.toastr.success("Pais editado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    }

    var estadoHumor = new Array<string>();
    console.log(this.editarPerfilForm.controls['estadodehumor'].value);
    for (var i = 0; i < this.Perfil.estadoHumor.length; i++) {
      if (this.Perfil.estadoHumor[i].split(' ')[0] == this.editarPerfilForm.controls['estadodehumor'].value.split(' ')[0]) {
        estadoHumor.push(this.editarPerfilForm.controls['estadodehumor'].value);
        console.log("Entra " + estadoHumor[i])
      } else {
        estadoHumor.push(this.Perfil.estadoHumor[i]);
      }
    }
    console.log(estadoHumor);
    if (this.editarPerfilForm.controls['estadodehumor'].value != "") {
      this.perfilService.patchTags(this.id, {
        id: this.Perfil.id,
        avatar: this.Perfil.avatar,
        nome: this.Perfil.nome,
        email: this.Perfil.email,
        telefone: this.Perfil.telefone,
        pais: this.Perfil.pais,
        cidade: this.Perfil.cidade,
        dataNascimento: this.Perfil.dataNascimento,
        estadoHumor: estadoHumor,
        password: this.Perfil.password,
        tags: this.Perfil.tags,
        perfilFacebook: this.Perfil.perfilFacebook,
        perfilLinkedin: this.Perfil.perfilLinkedin
      }).subscribe({
        next: () => {
          this.toastr.success("Estado de Humor editado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
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
    if (this.editarPerfilForm.controls['tags'].value != "") {
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
