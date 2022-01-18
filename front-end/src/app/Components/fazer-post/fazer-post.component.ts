import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/Models/Post';
import { FazerPostService } from 'src/app/Services/FazerPost/fazer-post.service';

@Component({
  selector: 'app-fazer-post',
  templateUrl: './fazer-post.component.html',
  styleUrls: ['./fazer-post.component.css']
})
export class FazerPostComponent implements OnInit {

  postForm: FormGroup;
  emailCurrentUser: string | undefined = '';
  tag: string = '';
  tags: string[] = [];

  constructor(private formBuilder: FormBuilder, private fazerPostService: FazerPostService, private toastr: ToastrService, private router: Router) { 
    this.postForm = this.formBuilder.group({
      post: ['', Validators.required],
      tags: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
  }

  onSubmit(){
    this.tag = '';
    this.tags = [];
    this.tag = this.postForm.controls['tags'].value;
    this.tags = this.tag.toString().split(",");
    this.fazerPostService.publicarPost({
      description: this.postForm.controls['post'].value,
      email: this.emailCurrentUser,
      tags: this.tags,
      likes: [],
      dislikes: []
    } as Post).subscribe({
      next: () =>{
        this.toastr.success("Post publicado com sucesso!", undefined,{positionClass: 'toast-bottom-left'});
        this.router.navigateByUrl('/home');

      },
      error:() => {
        this.toastr.error("Falha na publicação do post.", undefined, { positionClass: 'toast-bottom-left' });
      }
    })
  }
}
