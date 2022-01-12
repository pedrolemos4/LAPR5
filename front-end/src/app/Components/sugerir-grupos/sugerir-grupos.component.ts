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
  verGruposForm: FormGroup;
  emailCurrentUser: string | undefined = '';
  idCurrentUser: string;
  
  constructor(private formBuilder: FormBuilder, private sugerirGruposService: SugerirGruposService, private toastr: ToastrService) {
    this.verGruposForm = this.formBuilder.group({
      nUsers: ['', Validators.required],
      nTags: ['',Validators.required]
    })
   }


  ngOnInit(): void {
  }

  onSubmit(): void{
    this.nUsers = this.verGruposForm.controls['nUsers'].value;
    this.nTags = this.verGruposForm.controls['nTags'].value;
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g,"");
    this.sugerirGruposService.getGrupos(this.nTags,this.nUsers);
  }

}
