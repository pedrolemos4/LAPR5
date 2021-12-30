import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/Models/Post';
import { Comentario } from 'src/app/Models/Comentario';
import { ComentarPostService } from 'src/app/Services/ComentarPost/comentar-post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentar-post',
  templateUrl: './comentar-post.component.html',
  styleUrls: ['./comentar-post.component.css']
})
export class ComentarPostComponent implements OnInit {

  comentarioForm: FormGroup;
  emailCurrentUser: string | undefined = '';
  listaPosts: Post[] = [];
  listaComentarios: Comentario[] = [];
  listaAux: string[][] =[];

  constructor(private formBuilder: FormBuilder, private comentarPostService: ComentarPostService, private toastr: ToastrService, private router: Router) { 
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");

    this.comentarPostService.obterPosts().subscribe(Posts => {
      Posts.forEach(post => {
        if(!post.email.match(this.emailCurrentUser)){
          this.listaPosts.push(post);
          post.listaComentarios.forEach(comentario => {
            this.comentarPostService.getComentarioById(comentario).subscribe(com => {
              this.listaComentarios.push(com);
            })
          });
        }
      });
    });
  }

  onSubmit(post: Post) {
    this.comentarPostService.adicionarComentario({
      autor: this.emailCurrentUser,
      texto: this.comentarioForm.controls['comentario'].value,
      post: post.id,
      likes: [],
      dislikes: []
    } as Comentario).subscribe({
      next: () =>{
        this.toastr.success("Comentário adicionado com sucesso!", undefined,{positionClass: 'toast-bottom-left'});
        this.router.navigateByUrl('/home');
      },
      error:() => {
        this.toastr.error("Falha na publicação do comentário.", undefined, { positionClass: 'toast-bottom-left' });
      }
    })
  }

}