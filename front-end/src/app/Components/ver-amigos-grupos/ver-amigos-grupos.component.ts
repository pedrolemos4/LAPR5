import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-amigos-grupos',
  templateUrl: './ver-amigos-grupos.component.html',
  styleUrls: ['./ver-amigos-grupos.component.css']
})
export class VerAmigosGruposComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  amigosEmComum(){
    this.router.navigateByUrl('/amigos_comum');
  }

  amigosSugeridos(){
    this.router.navigateByUrl('/sugerir_amigos');
  }

  gruposSugeridos(){
    this.router.navigateByUrl('/sugerir_grupos');
  }
}
