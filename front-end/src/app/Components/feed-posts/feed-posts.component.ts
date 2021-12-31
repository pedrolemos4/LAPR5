import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/Models/Perfil';
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


  constructor(private feedPostsService: FeedPostsService, private toastr: ToastrService) { }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
    this.cards = [];
    //console.log(this.selected);

    this.final1 = this.selected.replace(" ", "");
    this.array = this.final1.split(",");

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
          this.listaPerfis.push(element);
        })
    );
  }

  verLikes(listaLikes: any[]) {
    //console.log(listaLikes);
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
            //console.log(res);
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
