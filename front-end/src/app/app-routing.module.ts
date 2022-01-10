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
import { RelacaoComponent } from './Components/relacao/relacao.component';
import { HomeComponent } from './Components/home/home.component';
import { VerPerfilComponent } from './Components/ver-perfil/ver-perfil.component';
import { LigacaoComponent } from './Components/ligacao/ligacao.component';
import { HomeInicialComponent } from './Components/home-inicial/home-inicial.component';
import { RedeNivelComponent } from './Components/rede-nivel/rede-nivel.component';
import { SugerirAmigosComponent } from './Components/sugerir-amigos/sugerir-amigos.component';
import { PedidoLigacaoPendenteComponent } from './Components/pedido-ligacao-pendente/pedido-ligacao-pendente.component';
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
import { RankDimensaoRedeComponent } from './Components/rank-dimensao-rede/rank-dimensao-rede.component';
import { BestFirstLigacaoRelacaoComponent } from './Components/bestfirst-ligacao-relacao/bestfirst-ligacao-relacao.component';
import { AStarLigacaoComponent } from './Components/a-star-ligacao/a-star-ligacao.component';
import { BestfirstLigacaoComponent } from './Components/bestfirst-ligacao/bestfirst-ligacao.component';
import { DfsLigacaoRelacaoComponent } from './Components/dfs-ligacao-relacao/dfs-ligacao-relacao.component';

const routes: Routes = [
  { path: '', component: HomeInicialComponent },
  { path: 'ver_algoritmos', component: VerAlgoritmosComponent },
  { path: 'forca_relacao', component: VerForcaRelacaoComponent },
  { path: 'algoritmo_relacao_ligacao', component: AlgoritmoLigacaoRelacaoComponent },
  { path: 'ver_caminhos', component: VerCaminhosComponent },
  { path: 'tags_todas_relacoes', component: TagsTodasRelacoesComponent },
  { path: 'amigos_comum', component: AmigosComumComponent },
  { path: 'sugerir_amigos', component: SugerirAmigosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registo', component: RegistoComponent },
  { path: 'perfil', component: VerPerfilComponent },
  { path: 'ver_perfil', component: PerfilComponent },
  { path: 'rede', component: RedeComponent },
  { path: 'tam_rede', component: TamRedeComponent },
  { path: 'cam_forte', component: CamForteComponent },
  { path: 'cam_curto', component: CamCurtoComponent },
  { path: 'cam_seguro', component: CamSeguroComponent },
  { path: 'introducao', component: IntroducaoComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'pedir_introducao', component: PedirIntroducaoComponent },
  { path: 'relacao', component: RelacaoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'homePrincipal', component: HomeInicialComponent },
  { path: 'ligacao', component: LigacaoComponent },
  { path: 'rede_nivel', component: RedeNivelComponent },
  { path: 'pedido_ligacao_pendente', component: PedidoLigacaoPendenteComponent },
  { path: 'fazer_post', component: FazerPostComponent },
  { path: 'tag_relacao_user', component: TagRelacaoUserComponent },
  { path: 'tags_jogadores', component: TagsTodosJogadoresComponent },
  { path: 'fortaleza_rede', component: FortalezaRedeComponent },
  { path: 'caminho_diferenciado', component: CaminhoDiferenciadoComponent },
  { path: 'comentar_post', component: ComentarPostComponent },
  { path: 'feed_posts', component: FeedPostsComponent },
  { path: 'tag_cloud_pessoal', component: TagCloudPessoalComponent },
  { path: 'rank_fortaleza_rede', component: RankFortalezaRedeComponent },
  { path: 'rank_dimensao_rede', component: RankDimensaoRedeComponent },
  { path: 'bestfirst_ligacao_relacao', component: BestFirstLigacaoRelacaoComponent },
  { path: 'a_star_ligacao', component: AStarLigacaoComponent },
  { path: 'bestfirst_ligacao', component: BestfirstLigacaoComponent},
  { path: 'dfs_ligacao_relacao', component: DfsLigacaoRelacaoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
