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
  perfilForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private perfilService: PerfilService,private router:Router) { 
    this.perfilForm=this.formBuilder.group({
      nome:['',Validators.required],
      email:['',Validators.required],
      pais:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.perfilService.editarPerfil(this.perfilForm.value).subscribe({
      next:() =>{
        this.router.navigateByUrl('/homejogadores');
      }
    })
  }
}
