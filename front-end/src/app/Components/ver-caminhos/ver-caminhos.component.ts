import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-caminhos',
  templateUrl: './ver-caminhos.component.html',
  styleUrls: ['./ver-caminhos.component.css']
})
export class VerCaminhosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  maisForte(){
    this.router.navigateByUrl('/cam_forte');
  }

  maisCurto(){
    this.router.navigateByUrl('/cam_curto');
  }

  maisSeguro(){
    this.router.navigateByUrl('/cam_seguro');
  }

}
