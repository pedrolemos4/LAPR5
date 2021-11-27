import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistoService } from '../../Services/Registo/registo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Jogador } from 'src/app/Models/Jogador';
import { forkJoin, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {
  registoForm: FormGroup;
  pontos: number = 0;
  listavazia: string[] = [];
  selected: string = '';
  listaTags: string[] = [];
  listaStringTags: string = '';
  estado: string = '';
  perfil: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private registoService: RegistoService) {
    this.registoForm = this.formBuilder.group({
      id: '',
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      pais: ['', Validators.required],
      cidade: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      estadoHumor: ['', Validators.required],
      tags: ['', Validators.required],
      perfilFb: ['', Validators.required],
      perfilL: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  selectChangeHandler(event: any) {
    //update the ui
    this.selected = event.target.value;
  }

  ngOnInit(): void {

  }

  // convenience getter for easy access to form fields
  get f() { return this.registoForm.controls; }

  onSubmit() {

    this.listaStringTags = this.f['tags'].value;
    this.listaTags = this.listaStringTags.toString().split(",");
    this.f['tags'].setValue(this.listaTags);

    this.estado = this.selected.charAt(0).toUpperCase() + this.selected.slice(1);

    this.f['estadoHumor'].setValue(this.estado);
    console.log(this.registoForm.controls['dataNascimento']);

    // forkJoin([
    //   this.registoService.registoPerfil(this.registoForm.value),
    //   this.registoService.registoJogador({pontuacao: this.pontos,
    //     nome: this.f['nome'],
    //     email: this.f['email'],
    //     telefone: this.f['telefone'],
    //     pais: this.f['pais'],
    //     cidade: this.f['cidade'],
    //     dataNascimento: this.f['dataNascimento'],
    //     estadoHumor: this.f['estadoHumor'],
    //     tags: this.listaTags,
    //     password: this.f['password'],
    //     perfilFb: this.f['perfilFb'],
    //     perfilL: this.f['perfilL'],
    //     listaRelacoes: this.listavazia,
    //     listaMissoes: this.listavazia,
    //     listaPosts: this.listavazia
    //   } as unknown as Jogador).pipe(tap((data: any) => { console.log(data) }))
    // ])



    /*this.registoService.registoJogador(this.registoForm.value,{pontuacao: this.pontos,
           perfilId : this.perfil,
           listaRelacoes: this.listavazia,
           listaMissoes: this.listavazia,
           listaPosts: this.listavazia
         } as Jogador)*/


    /*const perfil1 = this.registoService.registoPerfil(this.registoForm.value);
    const jogador1 = this.registoService.registoJogador({pontuacao: this.pontos,
      perfilId : this.perfil,
      listaRelacoes: this.listavazia,
      listaMissoes: this.listavazia,
      listaPosts: this.listavazia
    } as Jogador);*/
    //const perfil = this.registoService.registoPerfil(this.registoForm.value);

    this.registoService.registoPerfil(this.registoForm.value).pipe(
      mergeMap((res: any) => this.registoService.registoJogador({
        pontuacao: this.pontos,
        perfilId: res.id,
        listaRelacoes: this.listavazia,
        listaMissoes: this.listavazia,
        listaPosts: this.listavazia
      } as Jogador)))
      .subscribe({
        next: () => {
          this.toastr.success('Player successfully created!');
          this.router.navigateByUrl('/login');
        },

        error: () => {
          this.toastr.error("Error: Service Unavailable");
        }
      });
  }
}

/*next: () => {
  this.toastr.success('Player successfully created!');
  this.router.navigateByUrl('/login');
},

error: () => {
  this.toastr.error("Error: Service Unavailable");
}
});

}

}*/

