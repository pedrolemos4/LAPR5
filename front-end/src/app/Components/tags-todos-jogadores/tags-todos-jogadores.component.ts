import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { TagsTodosJogadoresService } from 'src/app/Services/TagsTodosJogadores/tags-todos-jogadores.service';

@Component({
  selector: 'app-tags-todos-jogadores',
  templateUrl: './tags-todos-jogadores.component.html',
  styleUrls: ['./tags-todos-jogadores.component.css']
})
export class TagsTodosJogadoresComponent implements OnInit {
  
  listTags: string[] = new Array<string>();
  listaAux: string[] = new Array<string>();
  listJogadores: string[] = new Array<string>();

  emailUser: string = '';
  perfilUser!: Perfil;
  idPerfilUser: string = '';
  currentUser!: Jogador;
  idCurrentUser: string = '';
  constructor(private router: Router, private toastr: ToastrService, private tagsTodosJogadoresService: TagsTodosJogadoresService) { }

  ngOnInit(): void {
    this.tagsTodosJogadoresService.getAllPerfis().subscribe(
      (res: any) => {
        res.forEach(element => {
          console.log(element.tags);
          this.listaAux.push(element.tags);
        });
        // passar lista de listas para string
        var lista = this.listaAux.join(",");
        console.log(lista);
        // passar string para lista
        var lista1 = lista.split(",");
        lista1.forEach(element => {
          if(this.listTags.includes(element) == false){
            this.listTags.push(element);
          }
        });
        
        console.log(this.listaAux);
        console.log(lista1);
        console.log(this.listTags);
      }
    );
  }

  jogadoresTag(tag: string){
    this.tagsTodosJogadoresService.getAllPerfis().subscribe(
      (res:any) => {
        res.forEach(element => {
          if(element.tags.includes(tag)){
            console.log("aaa");
            this.listJogadores.push(element);
          }
          console.log(this.listJogadores);
        });
      });
      this.listJogadores = [];
  }
}
