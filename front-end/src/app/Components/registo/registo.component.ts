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
      nome: ['', Validators.required],
      avatar: '',
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      pais: ['', Validators.required],
      cidade: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      estadoHumor: ['', Validators.required],
      tags: ['', Validators.required],
      perfilFb: ['', Validators.required],
      perfilL: ['', Validators.required],
      password: ['', Validators.required]
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
     // console.log('base64', reader.result);
      this.imagePreview = reader.result;
      f = this.convertDataURIToBase64(reader.result);
      this.fileBase64 = f;

      // this.fileByteArray = evt.target.result.split('base64,')[1];
     // console.log(this.fileByteArray);

      console.log("aaaa");
    };
    //console.log(this.fileByteArray);
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

      // var array: string [] = [];

      // array = this.fileByteArray.toString().split(",")
      // console.log(array);


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