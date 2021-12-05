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
import { PedirIntroducaoComponent } from './Components/pedir-introducao/pedir-introducao.component';
import { RelacaoComponent } from './Components/relacao/relacao.component';
import { HomeComponent } from './Components/home/home.component';
import { LigacaoComponent } from './Components/ligacao/ligacao.component';
import { HomeInicialComponent } from './Components/home-inicial/home-inicial.component';
import { RedeNivelComponent } from './Components/rede-nivel/rede-nivel.component';
import { PedidoLigacaoPendenteComponent } from './Components/pedido-ligacao-pendente/pedido-ligacao-pendente.component';

const routes: Routes = [
  { path: '', component: HomeInicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registo', component: RegistoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'rede', component: RedeComponent },
  { path: 'tam_rede', component: TamRedeComponent },
  { path: 'cam_forte', component: CamForteComponent },
  { path: 'cam_curto', component: CamCurtoComponent },
  { path: 'cam_seguro', component: CamSeguroComponent },
  { path: 'introducao', component: IntroducaoComponent },
  { path: 'pedir_introducao', component: PedirIntroducaoComponent },
  { path: 'relacao', component: RelacaoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homePrincipal', component: HomeInicialComponent },
  { path: 'ligacao', component: LigacaoComponent },
  { path: 'rede_nivel', component: RedeNivelComponent },
  { path: 'pedido_ligacao_pendente', component: PedidoLigacaoPendenteComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
