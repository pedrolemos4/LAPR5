import { Component, OnInit } from '@angular/core';
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


  constructor(private feedPostsService: FeedPostsService, private toastr: ToastrService) { }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
    this.cards = [];
    //console.log(this.selected);

    this.array = this.selected.split(" ");

    //console.log(this.array[1]);
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
    
    if (t.style.color == "black") {
      t.style.color = 'blue';
      post.likes.push(this.emailUser);
    } else if (post.likes.includes(this.emailUser)) {
      post.likes.splice(post.likes.indexOf(this.emailUser), 1);
      t.style.color = 'black';
    }
    this.feedPostsService.updateLikePost(post).subscribe({
      next: () => {
        this.toastr.success("Likes atualizados!", undefined, { positionClass: 'toast-bottom-left' });
      },
      error: () => {
        this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
      }
    });

  }

  verDislikes(listaDislikes: any[]) {
    //console.log(listaDislikes);
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
    if (t.style.color == "black") {
      t.style.color = 'red';
      post.dislikes.push(this.emailUser);
    } else if (post.dislikes.includes(this.emailUser)) {
      post.dislikes.splice(post.dislikes.indexOf(this.emailUser), 1);
      t.style.color = 'black';
    }
    console.log(post);
    this.feedPostsService.updateDislikePost(post).subscribe({
      next: () => {
        this.toastr.success("Dislikes atualizados!", undefined, { positionClass: 'toast-bottom-left' });
      },
      error: () => {
        this.toastr.error("Erro: Serviço Não Disponível.", undefined, { positionClass: 'toast-bottom-left' });
      }
    });
  }

  onDislikesVoltar() {
    const targetDiv = document.getElementById("dislikes");
    targetDiv.style.display = "none";
  }

  verListaComentarios(listaComentarios: any[]) {
    //console.log(listaComentarios);
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

}
