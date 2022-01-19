import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SugerirGruposService } from 'src/app/Services/SugerirGrupos/sugerir-grupos.service';

@Component({
  selector: 'app-sugerir-grupos',
  templateUrl: './sugerir-grupos.component.html',
  styleUrls: ['./sugerir-grupos.component.css']
})
export class SugerirGruposComponent implements OnInit {

  nUsers: number;
  nTags: number;
  tag: string = '';
  tagsObg: string[] = [];
  verGruposForm: FormGroup;
  emailCurrentUser: string | undefined = '';
  idCurrentUser: string;
  grupo;
  
  constructor(private formBuilder: FormBuilder, private router: Router,private sugerirGruposService: SugerirGruposService, private toastr: ToastrService) {
    this.verGruposForm = this.formBuilder.group({
      nUsers: ['', Validators.required],
      nTags: ['',Validators.required],
      tagsObg: ['',Validators.required]
    })
   }


  ngOnInit(): void {
    document.getElementById("mensagem1").style.display = "none";
  }

  onSubmit(): void{
    document.getElementById("mensagem1").style.display = "block";
    this.grupo='';
    this.tag = '';
    this.tagsObg = [];
    this.tag = this.verGruposForm.controls['tagsObg'].value;
    this.tagsObg = this.tag.split(",");
    this.nUsers = this.verGruposForm.controls['nUsers'].value;
    this.nTags = this.verGruposForm.controls['nTags'].value;
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g,"");
    this.sugerirGruposService.getGrupos(this.nTags,this.nUsers,this.tagsObg).subscribe(array=>{
      console.log(array);
      var aux = Object.values(array);
      var valores = aux[0];
      console.log(aux);
      if (valores.length == 0) {
        this.toastr.error("Não existe grupo tendo em conta os parâmetros definidos. Redefina-os por favor.", undefined, { positionClass: 'toast-bottom-left' });
      } else {
        this.grupo = valores;
       // this.toastr.success("Caminho mais forte calculado", undefined, { positionClass: 'toast-bottom-left' });
      }
    });
  }

  return():void{
    this.router.navigateByUrl("/ver_amigos_grupos");
  }
}
