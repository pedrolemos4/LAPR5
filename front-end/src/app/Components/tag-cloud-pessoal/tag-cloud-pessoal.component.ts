import { Component, OnInit, ViewChild } from '@angular/core';
import { CloudData, CloudOptions, TagCloudComponent } from 'angular-tag-cloud-module';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Post } from 'src/app/Models/Post';
import { TagCloudPessoalService } from 'src/app/Services/TagCloudPessoal/tag-cloud-pessoal.service';

@Component({
  selector: 'app-tag-cloud-pessoal',
  templateUrl: './tag-cloud-pessoal.component.html',
  styleUrls: ['./tag-cloud-pessoal.component.css']
})
export class TagCloudPessoalComponent implements OnInit {
  @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;

  options: CloudOptions = {
    width: 0.9,
    height: 200,
    overflow: false,
    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3,
      delay: 0.3
    },
    realignOnResize: true
  }

  listJogadores: string[] = new Array<string>();
  emailCurrentUser: string | undefined = '';
  listTags: string[] = new Array<string>();

  data: CloudData[] = [{
    text: '',
    weight: 2,
    color: '#ffaaee',
    link: null,
    rotate: null
  }];
  dict = {};

  constructor(private tagsPessoaisService: TagCloudPessoalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.tagsPessoaisService.getPosts(this.emailCurrentUser).subscribe((res: Post[]) => {
      if (res.length == 0) {
        this.toastr.error("Ainda não criou qualquer post", undefined, { positionClass: 'toast-bottom-left' });
      } else {
        res.forEach(element => {
          element.tags.forEach(tag => {
            if (this.listTags.includes(tag) == false) {
              this.listTags.push(tag);
              this.dict[tag] = 0; 
            }
            var x = this.dict[tag];
              this.dict[tag] = x + 1;
          });
        });
      }
      for (let key in this.dict) {
        var color: string = this.generateRandomCode();
        this.putOnCloud(key, this.dict[key], color);
        
      }
    });
    /* this.tagsPessoaisService.getPerfilAtual(this.emailCurrentUser).subscribe(Perfil => {
       Perfil.tags.forEach(element => {
         this.listTags.push(element);
       });
     });*/
  }

  /*jogadoresTag(tag: string) {
    this.tagsPessoaisService.getAllPerfis().subscribe(
      (res: any) => {
        res.forEach(element => {
          if (element.tags.includes(tag)) {
            this.listJogadores.push(element);
          }
        });
      });
    this.listJogadores = [];
  }*/


  putOnCloud(texto: any, peso: any, color1: any) {
    var x: CloudData = {
      text: texto,
      weight: peso,
      color: color1,
      link: null,
      rotate: null
    };
    this.data.push(x);
    console.log(this.data);
  }

  generateRandomCode() {
    var myRandomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return myRandomColor;
  }

  reDraw() {
    this.tagCloudComponent.reDraw();
  }


}
