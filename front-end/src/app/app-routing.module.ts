import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmigosComponent } from './Components/amigos/amigos.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { RedeComponent } from './Components/rede/rede.component';

const routes: Routes = [{path: 'perfil', component: PerfilComponent }, {path: 'rede', component: RedeComponent}, {path: 'amigos', component: AmigosComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
