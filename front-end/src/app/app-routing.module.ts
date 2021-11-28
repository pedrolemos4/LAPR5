import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistoComponent } from './Components/registo/registo.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { RedeComponent } from './Components/rede/rede.component';
import { TamRedeComponent } from './Components/tam-rede/tam-rede.component';
import { CamForteComponent } from './Components/cam-forte/cam-forte.component';
import { CamCurtoComponent } from './Components/cam-curto/cam-curto.component';
import { CamSeguroComponent } from './Components/cam-seguro/cam-seguro.component';
import { IntroducaoComponent } from './Components/introducao/introducao.component';
import { PedidoComponent } from './Components/pedido/pedido.component';
import { PedirIntroducaoComponent } from './Components/pedir-introducao/pedir-introducao.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registo', component: RegistoComponent },
  { path: 'perfil', component: PerfilComponent }, 
  { path: 'rede', component: RedeComponent}, 
  { path: 'tam_rede', component: TamRedeComponent}, 
  { path: 'cam_forte', component: CamForteComponent},
  { path: 'cam_curto', component: CamCurtoComponent},
  { path: 'cam_seguro', component: CamSeguroComponent}, 
  { path: 'introducao', component: IntroducaoComponent},
  { path: 'pedido', component: PedidoComponent},
  { path: 'pedir_introducao', component: PedirIntroducaoComponent},
  { path: 'home', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
