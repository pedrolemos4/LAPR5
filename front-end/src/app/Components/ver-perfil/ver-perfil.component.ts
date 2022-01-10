import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ligacao } from 'src/app/Models/Ligacao';
import { Relacao } from 'src/app/Models/Relacao';
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
  dataNascimento: Date;
  estadoHumor: string = '';
  pais: string = '';
  facebook: string = '';
  linkedin: string = '';
  tags: string[] = [];
  avatar: File;
  imagePreview: string | ArrayBuffer = '';


  constructor(private perfilService: PerfilService, private toastr: ToastrService, private router: Router) { }

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
    document.getElementById('confirmacao').style.display = 'none';
    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    this.emailUser = currentUser?.replace(/\"/g, "");
    this.perfilService.getPerfilAtual(this.emailUser).subscribe(Perfil => {
      this.nome = Perfil.nome;

      if (Perfil.avatar.length != 0) {
        const imageBlob = this.dataURItoBlob(Perfil.avatar);
        this.avatar = new File([imageBlob], "avatar", { type: 'image/png' });
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.avatar);
      } else {
        document.getElementById("circular_image").style.display = 'none';
      }
      this.telefone = Perfil.telefone;
      this.cidade = Perfil.cidade;
      // console.log(Perfil.dataNascimento.toJSON());
      // this.dataNascimento = Perfil.dataNascimento;
      this.estadoHumor = Perfil.estadoHumor;
      this.pais = Perfil.pais;
      this.facebook = Perfil.perfilFacebook;
      this.linkedin = Perfil.perfilLinkedin;
      this.tags = Perfil.tags;
      error: () => {
        this.toastr.error("Email ou Password incorretos.", undefined, { positionClass: 'toast-bottom-left' });
      }
    });
  }

  removerConta() {
    document.getElementById('confirmacao').style.display = 'block';
  }

  sim() {
    this.perfilService.getPerfilAtual(this.emailUser).subscribe(Perfil => {
      this.nome = Perfil.nome;
      this.perfilService.getJogador(Perfil.id).subscribe(Jogador => {
        this.perfilService.getLigacoesJogador(Jogador.id).subscribe(Lis => {
          Lis.forEach(async (element: Ligacao) => {
            await this.perfilService.deleteLigacao(element.id).subscribe(aux => {
              //console.log(aux + " 81");
            });
          });
          this.perfilService.getRelacoesDoJogador(Jogador.id).subscribe(async Relacoes => {
            Relacoes.forEach(async (element: Relacao) => {
              await this.perfilService.deleteRelacao(element.id).subscribe(aux => {
                //console.log(aux + " 87");
              });
            });
            await this.perfilService.deleteJogador(Jogador.id).subscribe(aux => {
              //console.log(aux + " 91");
            });;
            await this.perfilService.deletePerfil(Perfil.id).subscribe(aux => {
              //console.log(aux + " 94");
            });;
            this.toastr.success("Conta eliminada com sucesso.", undefined, { positionClass: 'toast-bottom-left' });
            this.router.navigateByUrl('/');
          });
        });
      });
    });
  }

  nao() {
    document.getElementById('confirmacao').style.display = 'none';
  }

}
