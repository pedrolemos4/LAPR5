import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../Services/Login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/Models/LoginUser';

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

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    //const { email, password } = this.loginForm.value;
    this.loginService.login({
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    } as LoginUser).subscribe({
      next: (res: any) => {
        (e: any) => console.log(e);
        this.saveCurrentUser(this.f['email'].value);
        const userStr = localStorage.getItem('currentUser');
        //console.log(userStr);
        this.toastr.success("Login realizado com sucesso!",undefined,{positionClass: 'toast-bottom-left'});
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.toastr.error("Email ou Password incorretos.", undefined, { positionClass: 'toast-bottom-left' });
      }
    });
  }

  saveCurrentUser(email: string): void {
    localStorage.setItem('currentUser', JSON.stringify(email));
  }

}
