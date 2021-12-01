import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/Models/Perfil';
import { HomeService } from 'src/app/Services/Home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  emailUser: string = '';
  idPerfilUser: string = '';
  nomeUser: string = '';

  nomes: string[] = [];
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.homeService.getPerfilByEmail(this.emailUser).subscribe(Perfil => {
      this.nomeUser = Perfil.nome;
      this.nomes.push(this.nomeUser);
    })
  }
}
