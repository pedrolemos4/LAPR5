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
  estadosForm: FormGroup;
  pontos: number = 0;
  listavazia: string[] = new Array<string>();
  selected: string = '';
  listaTags: string[] = new Array<string>();
  listaStringTags: string = '';
  perfil: string = '';
  file: File = null;
  imagePreview: string | ArrayBuffer = '';
  isCheckedBox: boolean = false;
  fileBase64: string = '';
  arrayNomesEstados: string[] = ["Joyful", "Distressed", "Hopeful", "Fearful", "Relieved", "Disappointed", "Proud", "Remorseful", "Grateful", "Angry"];
  arrayFinalEstados: string[] = [];
  dict = {};

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
      tags: '',
      perfilFb: '',
      perfilL: '',
      password: ''
    });

    this.checkForm = this.formBuilder.group({
      check: ['', Validators.requiredTrue]
    });

    this.estadosForm = this.formBuilder.group({
      joyful: 0.50,
      distressed: 0.50,
      hopeful: 0.50,
      fearful: 0.50,
      relieved: 0.50,
      disappointed: 0.50,
      proud: 0.50,
      remorseful: 0.50,
      grateful: 0.50,
      angry: 0.50
    });
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
  }

  ngOnInit(): void {
    const targetDiv = document.getElementById("politica");
    targetDiv.style.display = "none";
    const targetDiv1 = document.getElementById("estados");
    targetDiv1.style.display = "none";

  }

  convertDataURIToBase64(dataURI) {
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    return base64;
  }


  onFileUpload(event: any) {
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

  onVoltarEstados() {
    const targetDiv = document.getElementById("estados");
    targetDiv.style.display = "none";
  }

  isChecked() {
    this.isCheckedBox = true;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registoForm.controls; }


  escolherEstados() {
    const targetDiv = document.getElementById("estados");
    if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
    } else {
      targetDiv.style.display = "block";
    }
  }

  onSubmit() {
    if (this.isCheckedBox == true) {

      this.listaStringTags = this.f['tags'].value;
      this.listaTags = this.listaStringTags.toString().split(",");
      this.f['tags'].setValue(this.listaTags);

      // valida Nome
      if (this.registoForm.controls['nome'].value != '') {
        let n: string = this.registoForm.controls['nome'].value;
        let checkNome = n.startsWith(" ", 0);
        if (checkNome == true) {
          this.toastr.error("Nome não pode começar com espaço branco", undefined, { positionClass: 'toast-bottom-left' });
        }
      }

      // valida Email
      if (this.registoForm.controls['email'].value != '') {
        let e: string = this.registoForm.controls['email'].value;
        // mudar para ir buscar lista de emails e depois verificar se e pertence a lista 
        this.registoService.getAllEmails().subscribe(
          (res: any) => {
            console.log(res);
            if (res.includes(e)) {
              this.toastr.error("Email já se encontra na aplicação", undefined, { positionClass: 'toast-bottom-left' });
            }
          }
        );
      } else {
        this.toastr.error("Email é obrigatório", undefined, { positionClass: 'toast-bottom-left' });
      }

      // valida Telefone
      if (this.registoForm.controls['telefone'].value != '') {
        let t: string = this.registoForm.controls['telefone'].value;
        if (t.length != 12) {
          this.toastr.error("Telefone tem que ter 12 algarismos", undefined, { positionClass: 'toast-bottom-left' });
        }
      } else {
        this.toastr.error("Telefone é obrigatório", undefined, { positionClass: 'toast-bottom-left' });
      }

      // valida Cidade
      if (this.registoForm.controls['cidade'].value != '') {
        var regex = /^[A-Za-z0-9]+$/;
        var checkCidade = regex.test(this.registoForm.controls['cidade'].value);
        if (checkCidade == false) {
          this.toastr.error("Cidade tem que ter apenas letras e/ou números", undefined, { positionClass: 'toast-bottom-left' });
        }
      }

      // valida Data de Nascimento
      if (this.registoForm.controls['dataNascimento'].value != '') {
        var d: string[] = this.registoForm.controls['dataNascimento'].value.split("-");
        console.log(Number(d[0]));
        if (2021 - Number(d[0]) < 16) {
          this.toastr.error("É obrigatório ter pelo menos 16 anos", undefined, { positionClass: 'toast-bottom-left' });
        }
      } else {
        this.toastr.error("Data de Nascimento é obrigatória", undefined, { positionClass: 'toast-bottom-left' });
      }

      // valida Tags
      if (this.registoForm.controls['tags'].value == '') {
        this.toastr.error("Tags são obrigatórias", undefined, { positionClass: 'toast-bottom-left' });
      }

      // valida Password
      if (this.registoForm.controls['password'].value != '') {
        let p: string = this.registoForm.controls['password'].value;
        // var regex2 = /^(?=.*?[A-Z])(?=.*?[@$!%*#?&+=^_])$/;
        // var checkPass1 = regex2.test(p);
        if (p.length < 8) {
          this.toastr.error("Password tem que ter pelo menos 8 caracteres", undefined, { positionClass: 'toast-bottom-left' });
        }
        //   else if (checkPass1 == false) {
        //    this.toastr.error("Password tem que ter pelo menos uma letra maiscula e um caracter especial");
        // } 
      } else {
        this.toastr.error("Password é obrigatória", undefined, { positionClass: 'toast-bottom-left' });
      }

      this.arrayNomesEstados.forEach(element => {
        this.dict[element] = this.estadosForm.controls[element.toLowerCase()].value;
      });

      this.registoService.registoPerfil({
        id: '',
        nome: this.registoForm.controls['nome'].value,
        avatar: this.fileBase64,
        email: this.registoForm.controls['email'].value,
        telefone: this.registoForm.controls['telefone'].value,
        pais: this.registoForm.controls['pais'].value,
        cidade: this.registoForm.controls['cidade'].value,
        dataNascimento: this.registoForm.controls['dataNascimento'].value,
        estadoHumor: this.dict,
        tags: this.registoForm.controls['tags'].value,
        perfilFacebook: this.registoForm.controls['perfilFb'].value,
        perfilLinkedin: this.registoForm.controls['perfilL'].value,
        password: this.registoForm.controls['password'].value,
      } as Perfil).pipe(
        mergeMap((res: any) => this.registoService.registoJogador({
          id: '',
          pontuacao: this.pontos,
          perfilId: res.id,
          listaRelacoes: this.listavazia
        } as Jogador)))
        .subscribe({
          next: () => {
            this.toastr.success('Jogador foi criado com sucesso!', undefined, { positionClass: 'toast-bottom-left' });
            this.router.navigateByUrl('/login');
          },
          error: () => {
            this.toastr.error("Erro: Serviço Não Disponível", undefined, { positionClass: 'toast-bottom-left' });
          }

        });
    } else {
      this.toastr.error("Erro: É necessário o seu consentimento", undefined, { positionClass: 'toast-bottom-left' });
    }

  }
}