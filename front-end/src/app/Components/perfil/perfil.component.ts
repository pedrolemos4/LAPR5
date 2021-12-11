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

  /*username: string ="";
  email: string = "";*/
  editarPerfilForm: FormGroup;
  emailUser: string | undefined = '';
  id: any;
  Perfil!: Perfil;

  constructor(private formBuilder: FormBuilder, private perfilService: PerfilService, private toastr: ToastrService, private router: Router) {
    this.editarPerfilForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      pais: ['', Validators.required],
      estadodehumor: ['', Validators.required]
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
    this.perfilService.editarPerfil(this.id, {
      id: this.Perfil.id,
      avatar: this.Perfil.avatar,
      nome: this.editarPerfilForm.controls['nome'].value,
      email: this.editarPerfilForm.controls['email'].value,
      telefone: this.Perfil.telefone,
      pais: this.editarPerfilForm.controls['pais'].value,
      cidade: this.Perfil.cidade,
      dataNascimento: this.Perfil.dataNascimento,
      estadoHumor: this.editarPerfilForm.controls['estadodehumor'].value,
      password: this.Perfil.password,
      tags: this.Perfil.tags,
      perfilFacebook: this.Perfil.perfilFacebook,
      perfilLinkedin: this.Perfil.perfilLinkedin
    }).subscribe({
      next: () => {
        this.toastr.success('Perfil editado com sucesso!');
        this.router.navigateByUrl('/home');
      },
      error:() => {
        this.toastr.error("Erro: Serviço Não Disponível");
      }
    });
  }
}
