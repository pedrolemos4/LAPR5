import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FazerPostService } from 'src/app/Services/FazerPost/fazer-post.service';

@Component({
  selector: 'app-fazer-post',
  templateUrl: './fazer-post.component.html',
  styleUrls: ['./fazer-post.component.css']
})
export class FazerPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private fazerPostService: FazerPostService, private toastr: ToastrService, private router: Router) { 
    this.postForm = this.formBuilder.group({
      TextoPost: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
  }
}
