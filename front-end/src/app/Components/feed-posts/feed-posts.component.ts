import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/Models/Perfil';
import { Post } from 'src/app/Models/Post';
import { FeedPostsService } from 'src/app/Services/FeedPosts/feed-posts.service';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent implements OnInit {
  div: boolean = false;
  selected: string = '';
  listaPerfis: Perfil[] = [];
  lLikes: string[] = [];
  lDislikes: string[] = [];
  lComentarios: string[] = [];
  test: string = '';
  final: string = '';
  final1: string = '';
  array: string[] = [];
  cards: any[] = [];
  emailUser: any = '';
  tag: string = '';
  tags: string[] = [];
  post: any = '';
  comentarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private feedPostsService: FeedPostsService, private toastr: ToastrService) {
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.required],
      tags: ['', Validators.required]
    })
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
    this.cards = [];

    this.array = this.selected.split(" ");

    this.feedPostsService.getPosts(this.array[1]).subscribe(
      (res: any) => {
        console.log(res);
        if (res.length == 0) {
          this.toastr.error("O utilizador " + this.array[1] + " ainda não tem posts criados por si", undefined, { positionClass: 'toast-bottom-left' });
        } else {
          res.forEach(element => {
            this.cards.push(element);
          });
        }
      }
    );
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    const targetDiv = document.getElementById("likes");
    targetDiv.style.display = "none";
    const targetDivd = document.getElementById("dislikes");
    targetDivd.style.display = "none";
    const targetDivc = document.getElementById("comentarios");
    targetDivc.style.display = "none";

    this.feedPostsService.getAllPerfis().subscribe(
      (res2: any) =>
        res2.forEach((element: any) => {
          if (element.nome.length == 0) {
            element.nome = '-';
          }
          this.listaPerfis.push(element);
        })
    );
  }

  verLikes(listaLikes: any[]) {
    this.lLikes = [];
    if (listaLikes.length != 0) {
      const targetDiv = document.getElementById("likes");
      if (targetDiv.style.display !== "none") {
        targetDiv.style.display = "none";
      } else {
        targetDiv.style.display = "block";
      }
      listaLikes.forEach(element => {
        this.lLikes.push(element);
      })
    } else {
      this.toastr.error("Não existem likes neste post", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

  onLikesVoltar() {
    const targetDiv = document.getElementById("likes");
    targetDiv.style.display = "none";
  }

  darLike(post: Post, id: any) {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    const t = document.getElementById(id);
    if (!post.dislikes.includes(this.emailUser)) {
      if (!post.likes.includes(this.emailUser)) {
        t.style.color = 'blue';
        post.likes.push(this.emailUser);
      } else {
        post.likes.splice(post.likes.indexOf(this.emailUser), 1);
        t.style.color = 'black';
      }
      this.feedPostsService.updateLikePost(post).subscribe({
        next: () => {
          // this.feedPostsService.updateEstadosJogador(post.email,post.likes.length,post.dislikes.length).subscribe({
          //   next: () => {
          //     this.toastr.success("Estado Alegria e Angustia do utilizador " + post.email + " atualizados!", undefined, { positionClass: 'toast-bottom-left' });
          //   },
          //   error: () => {
          //     this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
          //   }
          // });
          this.toastr.success("Likes atualizados!", undefined, { positionClass: 'toast-bottom-left' });
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    } else {
      this.toastr.error("Não é possível dar like e dislike no mesmo post.", undefined, { positionClass: 'toast-bottom-left' });
    }

  }

  darLikeComentario(comentario: any, id: any) {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    const t = document.getElementById(id);
    if (!comentario.dislikes.includes(this.emailUser)) {
      if (!comentario.likes.includes(this.emailUser)) {
        t.style.color = 'blue';
        comentario.likes.push(this.emailUser);
      } else {
        comentario.likes.splice(comentario.likes.indexOf(this.emailUser), 1);
        t.style.color = 'black';
      }
      this.feedPostsService.updateLikeComentario(comentario).subscribe({
        next: () => {
          // this.feedPostsService.updateEstadosJogador(comentario.email,comentario.likes.length,comentario.dislikes.length).subscribe({
          //   next: () => {
          //     this.toastr.success("Estado Alegria e Angustia do utilizador " + comentario.email + " atualizados!", undefined, { positionClass: 'toast-bottom-left' });
          //   },
          //   error: () => {
          //     this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
          //   }
          // });
          this.toastr.success("Likes atualizados!", undefined, { positionClass: 'toast-bottom-left' });
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    } else {
      this.toastr.error("Não é possível dar like e dislike no mesmo post.", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

  verDislikes(listaDislikes: any[]) {
    this.lDislikes = [];
    if (listaDislikes.length != 0) {
      const targetDiv = document.getElementById("dislikes");
      if (targetDiv.style.display !== "none") {
        targetDiv.style.display = "none";
      } else {
        targetDiv.style.display = "block";
      }
      listaDislikes.forEach(element => {
        this.lDislikes.push(element);
      })
    } else {
      this.toastr.error("Não existem dislikes neste post", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

  darDislike(post: any, id: any) {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    const t = document.getElementById(id);
    if (!post.likes.includes(this.emailUser)) {
      if (!post.dislikes.includes(this.emailUser)) {
        t.style.color = 'red';
        post.dislikes.push(this.emailUser);
      } else {
        post.dislikes.splice(post.dislikes.indexOf(this.emailUser), 1);
        t.style.color = 'black';
      }
      this.feedPostsService.updateDislikePost(post).subscribe({
        next: () => {
          // this.feedPostsService.updateEstadosJogador(post.email,post.likes.length,post.dislikes.length).subscribe({
          //   next: () => {
          //     this.toastr.success("Estado Alegria e Angustia do utilizador " + post.email + " atualizados!", undefined, { positionClass: 'toast-bottom-left' });
          //   },
          //   error: () => {
          //     this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
          //   }
          // });
          this.toastr.success("Dislikes atualizados!", undefined, { positionClass: 'toast-bottom-left' });
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    } else {
      this.toastr.error("Não é possível dar like e dislike no mesmo post.", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

  darDislikeComentario(comentario: any, id: any) {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    const t = document.getElementById(id);
    if (!comentario.likes.includes(this.emailUser)) {
      if (!comentario.dislikes.includes(this.emailUser)) {
        t.style.color = 'red';
        comentario.dislikes.push(this.emailUser);
      } else {
        comentario.dislikes.splice(comentario.dislikes.indexOf(this.emailUser), 1);
        t.style.color = 'black';
      }
      this.feedPostsService.updateDislikeComentario(comentario).subscribe({
        next: () => {
          // this.feedPostsService.updateEstadosJogador(comentario.email,comentario.likes.length,comentario.dislikes.length).subscribe({
          //   next: () => {
          //     this.toastr.success("Estado Alegria e Angustia do utilizador " + comentario.email + " atualizados!", undefined, { positionClass: 'toast-bottom-left' });
          //   },
          //   error: () => {
          //     this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
          //   }
          // });
          this.toastr.success("Dislikes atualizados!", undefined, { positionClass: 'toast-bottom-left' });
        },
        error: () => {
          this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
        }
      });
    } else {
      this.toastr.error("Não é possível dar like e dislike no mesmo comentário.", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

  onDislikesVoltar() {
    const targetDiv = document.getElementById("dislikes");
    targetDiv.style.display = "none";
  }

  verListaComentarios(listaComentarios: any[]) {
    this.lComentarios = [];
    if (listaComentarios.length != 0) {
      const targetDiv = document.getElementById("comentarios");
      if (targetDiv.style.display !== "none") {
        targetDiv.style.display = "none";
      } else {
        targetDiv.style.display = "block";
      }
      listaComentarios.forEach(element => {
        this.feedPostsService.getComentarioById(element).subscribe(
          (res: any) => {
            this.lComentarios.push(res);
          }
        )
      })
    } else {
      this.toastr.error("Não existem comentários neste post", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

  onListaComentariosVoltar() {
    const targetDiv = document.getElementById("comentarios");
    targetDiv.style.display = "none";
  }

  adicionarComentario(post:Post) {
    this.post = post;
    if (this.div == false) {
      this.div = true;
    } else {
      this.div = false;
    }
  }

  comentarPost(post: Post) {
    this.tag = '';
    this.tags = [];
    this.tag = this.comentarioForm.controls['tags'].value;
    this.tags = this.tag.toString().split(",");
    if (this.tags.length > 0 || this.tags.includes('')) {
      this.feedPostsService.adicionarComentario({
        autor: this.emailUser,
        texto: this.comentarioForm.controls['comentario'].value,
        tags: this.tags,
        post: post.id,
        likes: [],
        dislikes: []
      }).subscribe({
        next: () => {
          this.toastr.success("Comentário adicionado com sucesso!", undefined, { positionClass: 'toast-bottom-left' });
        },
        error: () => {
          this.toastr.error("Falha na publicação do comentário.", undefined, { positionClass: 'toast-bottom-left' });
        }
      })
    } else {
      this.toastr.error("Precisa de colocar tags!", undefined, { positionClass: 'toast-bottom-left' });
    }
  }

}
