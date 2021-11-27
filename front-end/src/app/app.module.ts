import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { RegistoComponent } from './Components/registo/registo.component';
import { NavBarComponent } from './Components/navbar/navbar.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { RedeComponent } from './Components/rede/rede.component';
import { AmigosComponent } from './Components/amigos/amigos.component';
import { NavbarhomeComponent } from './Components/navbarhome/navbarhome.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './Components/header/header.component';
import { IntroducaoComponent } from './Components/introducao/introducao.component';
import { TamRedeComponent } from './Components/tam-rede/tam-rede.component';
import { CamForteComponent } from './Components/cam-forte/cam-forte.component';
import { CamCurtoComponent } from './Components/cam-curto/cam-curto.component';
import { CamSeguroComponent } from './Components/cam-seguro/cam-seguro.component';
import { PedidoComponent } from './Components/pedido/pedido.component';
import { PedirIntroducaoComponent } from './Components/pedir-introducao/pedir-introducao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistoComponent,
    PerfilComponent,
    RedeComponent,
    AmigosComponent,
    NavbarhomeComponent,
    HeaderComponent,
    IntroducaoComponent,
    TamRedeComponent,
    CamForteComponent,
    CamCurtoComponent,
    CamSeguroComponent,
    PedidoComponent,
    PedirIntroducaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
