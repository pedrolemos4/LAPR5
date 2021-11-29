import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from 'src/app/Services/Perfil/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  /*username: string ="";
  email: string = "";*/
  editarPerfilForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private perfilService: PerfilService,private router:Router) { 
    this.editarPerfilForm=this.formBuilder.group({
      nome:['',Validators.required],
      email:['',Validators.required],
      pais:['',Validators.required],
      estadodehumor:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.perfilService.editarPerfil(this.editarPerfilForm.value).subscribe({
      next:() =>{
        this.router.navigateByUrl('/homejogadores');
      }
    })
  }

  /*editarPerfil(nome: string, email: string, pais: string, estadodehumor: string){
     
  }*/
}
