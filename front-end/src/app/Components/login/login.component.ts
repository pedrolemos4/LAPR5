import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Services/Login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private loginService: LoginService, private toastr: ToastrService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  // // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loginService.login(this.loginForm.value).subscribe({
      next: () => {
        this.toastr.success('Logged In', 'Login Successfull');
        this.router.navigateByUrl('/homejogadores');
      },
      error: error => {
        if (error.status == 400) {
          this.toastr.error('Email or Password incorrect.', 'Authentication failed.');
        } else {
          console.log(error);
        }
      }
    });
  }

}
