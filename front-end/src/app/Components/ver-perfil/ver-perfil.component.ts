import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfilService } from 'src/app/Services/Perfil/perfil.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  emailUser: string = '';
  nome: string = '';
  telefone: number;
  cidade: string = '';
  dataNascimento: string = '';
  estadoHumor: string = '';
  pais: string = '';
  facebook: string = '';
  linkedin: string = '';
  tags: string[] = [];
  avatar: File;
  imagePreview: string | ArrayBuffer = '';


  constructor(private perfilService: PerfilService, private toastr: ToastrService) { }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.perfilService.getPerfilAtual(this.emailUser).subscribe(Perfil => {
      this.nome = Perfil.nome;

      if (Perfil.avatar.length!=0) {
        const imageBlob = this.dataURItoBlob(Perfil.avatar);
        this.avatar = new File([imageBlob], "avatar", { type: 'image/png' });
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.avatar);
      } else {
        // console.log("AAAAAAAAAAAAA");
        document.getElementById("circular_image").style.display='none';
        // aux.innerHTML = "<img src=\"../imagens/default_picture.png\">";
        //this.imagePreview = '../imagens/default_picture.png';
      }
      // this.telefone = Perfil.telefone;
      // this.cidade = Perfil.cidade;
      // this.dataNascimento = Perfil.dataNascimento;
      this.estadoHumor = Perfil.estadoHumor;
      this.pais = Perfil.pais;
      // this.facebook = Perfil.perfilFacebook;
      // this.linkedin = Perfil.perfilLinkedin;
      this.tags = Perfil.tags;
      error: () => {
        this.toastr.error("Email ou Password incorretos.", undefined, { positionClass: 'toast-bottom-left' });
      }
    });
  }

}
