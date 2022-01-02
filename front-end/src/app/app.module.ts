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
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './Components/header/header.component';
import { IntroducaoComponent } from './Components/introducao/introducao.component';
import { TamRedeComponent } from './Components/tam-rede/tam-rede.component';
import { CamForteComponent } from './Components/cam-forte/cam-forte.component';
import { CamCurtoComponent } from './Components/cam-curto/cam-curto.component';
import { CamSeguroComponent } from './Components/cam-seguro/cam-seguro.component';
import { PedirIntroducaoComponent } from './Components/pedir-introducao/pedir-introducao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RelacaoComponent } from './Components/relacao/relacao.component';
import { HeaderhomeComponent } from './Components/headerhome/headerhome.component';
import { HomeComponent } from './Components/home/home.component';
import { LigacaoComponent } from './Components/ligacao/ligacao.component';
import { HomeInicialComponent } from './Components/home-inicial/home-inicial.component';
import { RedeNivelComponent } from './Components/rede-nivel/rede-nivel.component';
import { PedidoLigacaoPendenteComponent } from './Components/pedido-ligacao-pendente/pedido-ligacao-pendente.component';
import { PedidoComponent } from './Components/pedido/pedido.component';
import { VerPerfilComponent } from './Components/ver-perfil/ver-perfil.component';
import { SugerirAmigosComponent } from './Components/sugerir-amigos/sugerir-amigos.component';
import { FazerPostComponent } from './Components/fazer-post/fazer-post.component';
import { TagRelacaoUserComponent } from './Components/tag-relacao-user/tag-relacao-user.component';
import { TagsTodosJogadoresComponent } from './Components/tags-todos-jogadores/tags-todos-jogadores.component';
import { FortalezaRedeComponent } from './Components/fortaleza-rede/fortaleza-rede.component';
import { AmigosComumComponent } from './Components/amigos-comum/amigos-comum.component';
import { CaminhoDiferenciadoComponent } from './Components/caminho-diferenciado/caminho-diferenciado.component';
import { TagsTodasRelacoesComponent } from './Components/tags-todas-relacoes/tags-todas-relacoes.component';
import { ComentarPostComponent } from './Components/comentar-post/comentar-post.component';
import { VerCaminhosComponent } from './Components/ver-caminhos/ver-caminhos.component';
import { VerAlgoritmosComponent } from './Components/ver-algoritmos/ver-algoritmos.component';
import { AlgoritmoLigacaoRelacaoComponent } from './Components/algoritmo-ligacao-relacao/algoritmo-ligacao-relacao.component';
import { FeedPostsComponent } from './Components/feed-posts/feed-posts.component';
import { VerForcaRelacaoComponent } from './Components/ver-forca-relacao/ver-forca-relacao.component';
import { TagCloudPessoalComponent } from './Components/tag-cloud-pessoal/tag-cloud-pessoal.component';
import { RankFortalezaRedeComponent } from './Components/rank-fortaleza-rede/rank-fortaleza-rede.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegistoComponent,
    PerfilComponent,
    RedeComponent,
    HeaderComponent,
    IntroducaoComponent,
    TamRedeComponent,
    CamForteComponent,
    CamCurtoComponent,
    CamSeguroComponent,
    PedirIntroducaoComponent,
    RelacaoComponent,
    HeaderhomeComponent,
    HomeComponent,
    LigacaoComponent,
    HomeInicialComponent,
    RedeNivelComponent,
    PedidoLigacaoPendenteComponent,
    PedidoComponent,
    VerPerfilComponent,
    SugerirAmigosComponent,
    FazerPostComponent,
    TagRelacaoUserComponent,
    TagsTodosJogadoresComponent,
    FortalezaRedeComponent,
    AmigosComumComponent,
    CaminhoDiferenciadoComponent,
    TagsTodasRelacoesComponent,
    ComentarPostComponent,
    VerCaminhosComponent,
    VerAlgoritmosComponent,
    AlgoritmoLigacaoRelacaoComponent,
    FeedPostsComponent,
    VerForcaRelacaoComponent,
    TagCloudPessoalComponent,
    RankFortalezaRedeComponent
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
