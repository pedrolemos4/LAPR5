import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistoService } from '../../Services/Registo/registo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Jogador } from 'src/app/Models/Jogador';
import { mergeMap } from 'rxjs';
import { Perfil } from 'src/app/Models/Perfil';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {
  registoForm: FormGroup;
  checkForm: FormGroup;
  pontos: number = 0;
  listavazia: string[] = new Array<string>();
  selected: string = '';
  listaTags: string[] = new Array<string>();
  listaStringTags: string = '';
  estado: string = '';
  perfil: string = '';
  file: File = null;
  imagePreview: string | ArrayBuffer = '';
  isCheckedBox: boolean = false;
  fileBase64: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private registoService: RegistoService) {
    this.registoForm = this.formBuilder.group({
      id: '',
      nome: '',
      avatar: '',
      email: '',
      telefone: '',
      pais: '',
      cidade: '',
      dataNascimento: '',
      estadoHumor: '',
      tags: '',
      perfilFb: '',
      perfilL: '',
      password: ''
    });

    this.checkForm = this.formBuilder.group({
      check: ['', Validators.requiredTrue]
    });
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selected = event.target.value;
  }

  ngOnInit(): void {
    const targetDiv = document.getElementById("politica");
    targetDiv.style.display = "none";

  }

  convertDataURIToBase64(dataURI) {
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    console.log(base64);
    // var raw = window.atob(base64);
    // var rawLength = raw.length;
    // var array = new Uint8Array(new ArrayBuffer(rawLength));
    // var i: number;
    // console.log(array);
    // for(i = 0; i < rawLength; i++) {
    //   array[i] = raw.charCodeAt(i);
    // }
    return base64;
  }


  onFileUpload(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    let f;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      f = this.convertDataURIToBase64(reader.result);
      this.fileBase64 = f;
    };
    reader.readAsDataURL(this.file);
  }

  onPolitica() {
    const targetDiv = document.getElementById("politica");
    if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
    } else {
      targetDiv.style.display = "block";
    }
  }

  onVoltar() {
    const targetDiv = document.getElementById("politica");
    targetDiv.style.display = "none";
  }

  isChecked() {
    this.isCheckedBox = true;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registoForm.controls; }

  onSubmit() {
    if (this.isCheckedBox == true) {

      this.listaStringTags = this.f['tags'].value;
      this.listaTags = this.listaStringTags.toString().split(",");
      this.f['tags'].setValue(this.listaTags);

      this.estado = this.selected.charAt(0).toUpperCase() + this.selected.slice(1);

      this.f['estadoHumor'].setValue(this.estado);

      // valida Nome
      if (this.registoForm.controls['nome'].value != '') {
        let n: string = this.registoForm.controls['nome'].value;
        let checkNome = n.startsWith(" ", 0);
        if (checkNome == true) {
          this.toastr.error("Nome não pode começar com espaço branco");
        }
      }

      // valida Email
      if (this.registoForm.controls['email'].value != '') {
        let e: string = this.registoForm.controls['email'].value;
        // mudar para ir buscar lista de emails e depois verificar se e pertence a lista 
        this.registoService.getAllEmails().subscribe(
          (res:any) => {
            console.log(res);
            if(res.includes(e)){
              this.toastr.error("Email já se encontra na aplicação");
            }
          }
        );
      } else {
        this.toastr.error("Email é obrigatório");
      }

      // valida Telefone
      if (this.registoForm.controls['telefone'].value != '') {
        let t: string = this.registoForm.controls['telefone'].value;
        if (t.length != 12) {
          this.toastr.error("Telefone tem que ter 12 algarismos");
        }
      } else {
        this.toastr.error("Telefone é obrigatório");
      }

      // valida Cidade
      if (this.registoForm.controls['cidade'].value != '') {
        var regex = /^[A-Za-z0-9]+$/;
        var checkCidade = regex.test(this.registoForm.controls['cidade'].value);
        if (checkCidade == false) {
          this.toastr.error("Cidade tem que ter apenas letras e/ou números");
        }
      }

      // valida Data de Nascimento
      if (this.registoForm.controls['dataNascimento'].value != '') {
        var d: string[] = this.registoForm.controls['dataNascimento'].value.split("-");
        console.log(Number(d[0]));
        if (2021 - Number(d[0]) < 16) {
          this.toastr.error("É obrigatório ter pelo menos 16 anos");
        }
      } else {
        this.toastr.error("Data de Nascimento é obrigatória");
      }

      // valida Estado de Humor
      if (this.registoForm.controls['estadoHumor'].value == '') {
        this.toastr.error("Estado de Humor é obrigatório");
      }

      // valida Tags
      if (this.registoForm.controls['tags'].value == '') {
        this.toastr.error("Tags são obrigatórias");
      }

      // valida Password
      if (this.registoForm.controls['password'].value != '') {
        let p: string = this.registoForm.controls['password'].value;
        // var regex2 = /^(?=.*?[A-Z])(?=.*?[@$!%*#?&+=^_])$/;
        // var checkPass1 = regex2.test(p);
        if (p.length < 8) {
          this.toastr.error("Password tem que ter pelo menos 8 caracteres");
        }
        //   else if (checkPass1 == false) {
        //    this.toastr.error("Password tem que ter pelo menos uma letra maiscula e um caracter especial");
        // } 
      } else {
        this.toastr.error("Password é obrigatória");
      }

        this.registoService.registoPerfil({
          id: '',
          nome: this.registoForm.controls['nome'].value,
          avatar: this.fileBase64,
          email: this.registoForm.controls['email'].value,
          telefone: this.registoForm.controls['telefone'].value,
          pais: this.registoForm.controls['pais'].value,
          cidade: this.registoForm.controls['cidade'].value,
          dataNascimento: this.registoForm.controls['dataNascimento'].value,
          estadoHumor: this.registoForm.controls['estadoHumor'].value,
          tags: this.registoForm.controls['tags'].value,
          perfilFacebook: this.registoForm.controls['perfilFb'].value,
          perfilLinkedin: this.registoForm.controls['perfilL'].value,
          password: this.registoForm.controls['password'].value,
        } as Perfil).pipe(
          mergeMap((res: any) => this.registoService.registoJogador({
            id: '',
            pontuacao: this.pontos,
            perfilId: res.id,
            listaRelacoes: this.listavazia,
            listaMissoes: this.listavazia,
            listaPosts: this.listavazia
          } as Jogador)))
          .subscribe({
            next: () => {
              this.toastr.success('Jogador foi criado com sucesso!');
              this.router.navigateByUrl('/login');
            },
            error: () => {
              this.toastr.error("Erro: Serviço Não Disponível");
            }

          });
    } else {
      this.toastr.error("Erro: É necessário o seu consentimento");
    }

  }
}