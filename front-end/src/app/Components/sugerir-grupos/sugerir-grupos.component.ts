import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/Models/Perfil';
import { SugerirGruposService } from 'src/app/Services/SugerirGrupos/sugerir-grupos.service';

@Component({
  selector: 'app-sugerir-grupos',
  templateUrl: './sugerir-grupos.component.html',
  styleUrls: ['./sugerir-grupos.component.css']
})
export class SugerirGruposComponent implements OnInit {

  nUsers: number;
  nTags: number;
  tag: string = '';
  tagsObg: string[] = [];
  verGruposForm: FormGroup;
  emailCurrentUser: string | undefined = '';
  idCurrentUser: string;
  grupo;
  selected = '';
  listaSelecionada: string[] = [];
  listaSelecionadaPretendida: string[] = [];
  listaPerfis: Perfil[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private sugerirGruposService: SugerirGruposService, private toastr: ToastrService) {
    this.verGruposForm = this.formBuilder.group({
      nUsers: ['', Validators.required],
      nTags: ['', Validators.required],
      tagsObg: ['', Validators.required]
    })
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
  }

  adicionaUtilizador(utilizador: any) {
    if (!this.listaSelecionada.includes(utilizador) && utilizador != "") {
      if (this.listaSelecionada.length == 0) {
        this.listaSelecionada.push(utilizador);
      } else {
        var u = ("; ").concat(utilizador);
        this.listaSelecionada.push(u);
      }
    }
  }

  adicionaUtilizadorPretendido(utilizador: any) {
    if (!this.listaSelecionadaPretendida.includes(utilizador) && utilizador != "") {
      if (this.listaSelecionadaPretendida.length == 0) {
        this.listaSelecionadaPretendida.push(utilizador);
      } else {
        var u = ("; ").concat(utilizador);
        this.listaSelecionadaPretendida.push(u);
      }
    }
  }

  removeUtilizadorPretendido(utilizador: any) {
    var u = ("; ").concat(utilizador);
    if (this.listaSelecionadaPretendida.includes(utilizador) || this.listaSelecionadaPretendida.includes(u)) {
      if (this.listaSelecionadaPretendida.indexOf(utilizador) == 0) {
        var s = this.listaSelecionadaPretendida[this.listaSelecionadaPretendida.indexOf(utilizador) + 1].replace("; ", "");
        this.listaSelecionadaPretendida[this.listaSelecionadaPretendida.indexOf(utilizador) + 1] = s;
        this.listaSelecionadaPretendida.splice(this.listaSelecionadaPretendida.indexOf(utilizador), 1);
      } else {
        this.listaSelecionadaPretendida.splice(this.listaSelecionadaPretendida.indexOf(u), 1);
      }
    }
  }

  removeUtilizador(utilizador: any) {
    var u = ("; ").concat(utilizador);
    if (this.listaSelecionada.includes(utilizador) || this.listaSelecionada.includes(u)) {
      if (this.listaSelecionada.indexOf(utilizador) == 0) {
        var s = this.listaSelecionada[this.listaSelecionada.indexOf(utilizador) + 1].replace("; ", "");
        this.listaSelecionada[this.listaSelecionada.indexOf(utilizador) + 1] = s;
        this.listaSelecionada.splice(this.listaSelecionada.indexOf(utilizador), 1);
      } else {
        this.listaSelecionada.splice(this.listaSelecionada.indexOf(u), 1);
      }
    }
  }

  ngOnInit(): void {
    document.getElementById("mensagem1").style.display = "none";
    this.sugerirGruposService.getAllPerfis().subscribe(
      (res: any) => {
        res.forEach(element => {
          this.listaPerfis.push(element);
        });
      }
    );
  }

  porListaCorreta(lista: any): string[] {
    var listaPretendida: string[] = [];
    lista.forEach(element => {
      if (this.listaSelecionadaPretendida.indexOf(element) != 0) {
        listaPretendida.push(element.replace("; ", ""));
      } else {
        listaPretendida.push(element);
      }
    });
    return listaPretendida;
  }

  onSubmit(): void {
    var listaPretendida = this.porListaCorreta(this.listaSelecionadaPretendida);
    var listaNaoDesejados = this.porListaCorreta(this.listaSelecionada);

    if (listaNaoDesejados.length == 0 || listaPretendida.length == 0) {
      this.toastr.error("Defina a lista pretendida/não desejada", undefined, { positionClass: 'toast-bottom-left' });
    } else {
      document.getElementById("mensagem1").style.display = "block";
      this.grupo = '';
      this.tag = '';
      this.tagsObg = [];
      this.tag = this.verGruposForm.controls['tagsObg'].value;
      this.tagsObg = this.tag.split(",");
      this.nUsers = this.verGruposForm.controls['nUsers'].value;
      this.nTags = this.verGruposForm.controls['nTags'].value;
      const currentUser = localStorage.getItem('currentUser');
      this.emailCurrentUser = currentUser?.replace(/\"/g, "");
      this.sugerirGruposService.getGrupos(this.nTags, this.nUsers, this.tagsObg).subscribe(array => {
        var aux = Object.values(array);
        var valores = aux[0];
        console.log(aux);
        if (valores.length == 0) {
          this.toastr.error("Não existe grupo tendo em conta os parâmetros definidos. Redefina-os por favor.", undefined, { positionClass: 'toast-bottom-left' });
        } else {
          this.grupo = valores;
          this.sugerirGruposService.alteraEstados(this.emailCurrentUser, valores, listaPretendida, listaNaoDesejados).subscribe(
            (res: any) => {
              var array: number[] = Object.values(res);
              console.log(array);
              this.sugerirGruposService.getPerfilByEmail(this.emailCurrentUser).subscribe(
                (res1: any) => {
                  var anteriorEsperanca = res1.estadoHumor['Hopeful'];
                  var anteriorAlivio = res1.estadoHumor['Relieved'];
                  var anteriorMedo = res1.estadoHumor['Fearful'];
                  var anteriorDececao = res1.estadoHumor['Disappointed'];
                  res1.estadoHumor['Hopeful'] = array[0].toFixed(2);
                  res1.estadoHumor['Relieved'] = array[1].toFixed(2);
                  res1.estadoHumor['Fearful'] = array[2].toFixed(2);
                  res1.estadoHumor['Disappointed'] = array[3].toFixed(2);
                  this.sugerirGruposService.updateEstadoPerfil(res1.id, res1).subscribe(
                    () => {
                      this.toastr.success("Esperança: " + anteriorEsperanca + " → " + array[0].toFixed(2) + ", Alívio: " + anteriorAlivio + " → " + array[1].toFixed(2) + ", Medo: " + anteriorMedo + " → " + array[2].toFixed(2) + " e Deceção: " + anteriorDececao + " → " + array[3].toFixed(2) + " do utilizador " + this.emailCurrentUser + " atualizados!", undefined, { positionClass: 'toast-bottom-left' });
                    }
                  )
                }
              );
            }
          );
        }
      });
    }
  }

  return(): void {
    this.router.navigateByUrl("/ver_amigos_grupos");
  }
}
