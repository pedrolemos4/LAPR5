import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistoComponent } from './registo/registo.component';
import { AmigosComponent } from './Components/amigos/amigos.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { RedeComponent } from './Components/rede/rede.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registo', component: RegistoComponent },
  { path: 'perfil', component: PerfilComponent }, 
  { path: 'rede', component: RedeComponent}, 
  { path: 'amigos', component: AmigosComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
