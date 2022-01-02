import { Component, OnInit } from '@angular/core';
import { TagCloudPessoalService } from 'src/app/Services/TagCloudPessoal/tag-cloud-pessoal.service';

@Component({
  selector: 'app-tag-cloud-pessoal',
  templateUrl: './tag-cloud-pessoal.component.html',
  styleUrls: ['./tag-cloud-pessoal.component.css']
})
export class TagCloudPessoalComponent implements OnInit {

  listJogadores: string[] = new Array<string>();
  emailCurrentUser: string | undefined = '';
  listTags: string[] = new Array<string>();

  constructor(private tagsPessoaisService: TagCloudPessoalService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.tagsPessoaisService.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
      Perfil.tags.forEach(element => {
        this.listTags.push(element);
      });
    });
  }

  jogadoresTag(tag: string) {
    this.tagsPessoaisService.getAllPerfis().subscribe(
      (res: any) => {
        res.forEach(element => {
          if (element.tags.includes(tag)) {
            this.listJogadores.push(element);
          }
        });
      });
    this.listJogadores = [];
  }

}
