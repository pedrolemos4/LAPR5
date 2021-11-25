import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistoComponent } from './registo/registo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registo', component: RegistoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
