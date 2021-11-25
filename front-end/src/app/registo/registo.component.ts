import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistoService } from '../Services/Registo/registo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: '/registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {
  registoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private registoService: RegistoService) {
    this.registoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      pais: ['', Validators.required],
      cidade: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      estadoHumor: ['', Validators.required],
      tags: ['', Validators.required],
      perfilFb: ['', Validators.required],
      perfilL: ['', Validators.required],
      password: ['', Validators.required],
      checkpassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  // convenience getter for easy access to form fields
  get f() { return this.registoForm.controls; }

  onSubmit() {

    var checkp = document.getElementById('checkpassword') as HTMLInputElement;
    var pass = document.getElementById('password') as HTMLInputElement;

    if (checkp.value == pass.value) {
      this.registoService.registo(this.registoForm.value).subscribe({
        next: () => {
          (data: any) => { console.log(data) };
          this.toastr.success('Player successfully created!');
          this.router.navigateByUrl('/login');
        },

        error: error => {
          this.toastr.error("Error: Service Unavailable");
        }
      });
    } else {
      this.toastr.error('Password is not matching');
    }
  }

}

