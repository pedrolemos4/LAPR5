import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-algoritmos',
  templateUrl: './ver-algoritmos.component.html',
  styleUrls: ['./ver-algoritmos.component.css']
})
export class VerAlgoritmosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  relacaoLigacao(){
    this.router.navigateByUrl('/algoritmo_relacao_ligacao');
  }

}