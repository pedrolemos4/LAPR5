import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tam-rede',
  templateUrl: './tam-rede.component.html',
  styleUrls: ['./tam-rede.component.css']
})
export class TamRedeComponent implements OnInit {
  tamRedeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.tamRedeForm = this.formBuilder.group({
      nivel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    //ligacao com prolog
  }

}
