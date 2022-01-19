import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  constructor(private formBuilder: FormBuilder, private sugerirGruposService: SugerirGruposService, private toastr: ToastrService) {
    this.verGruposForm = this.formBuilder.group({
      nUsers: ['', Validators.required],
      nTags: ['',Validators.required],
      tagsObg: ['',Validators.required]
    })
   }


  ngOnInit(): void {
  }

  onSubmit(): void{
    this.tag = '';
    this.tagsObg = [];
    this.tag = this.verGruposForm.controls['tagsObg'].value;
    this.tagsObg = this.tag.toString().split(",");
    this.nUsers = this.verGruposForm.controls['nUsers'].value;
    this.nTags = this.verGruposForm.controls['nTags'].value;
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g,"");
    this.sugerirGruposService.getGrupos(this.nTags,this.nUsers,this.tagsObg);//.subscribe();
  }

}
