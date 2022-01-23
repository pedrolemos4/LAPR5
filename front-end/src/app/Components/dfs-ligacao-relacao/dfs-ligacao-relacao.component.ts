import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Perfil } from 'src/app/Models/Perfil';
import { DfsLigacaoRelacaoService } from 'src/app/Services/DFSLigacaoRelacao/dfs-ligacao-relacao.service';

@Component({
  selector: 'app-dfs-ligacao-relacao',
  templateUrl: './dfs-ligacao-relacao.component.html',
  styleUrls: ['./dfs-ligacao-relacao.component.css']
})
export class DfsLigacaoRelacaoComponent implements OnInit {

  form: FormGroup;
  nNiveis: number;
  emailJogadores: string[] = new Array<string>();
  selectedJogador: string;
  Caminho: string[] = new Array<string>();
  Custo: string;
  emailCurrentUser: string;
  idCurrentJogador: string;
  opcao: string = '2';

  constructor(private router: Router, private formBuilder: FormBuilder, private service: DfsLigacaoRelacaoService, private toastr: ToastrService) {
    this.form = this.formBuilder.group({
      numeroNiveis: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    document.getElementById("mensagem").style.display = "none";
    document.getElementById("mensagem1").style.display = "none";
    document.getElementById("mensagem2").style.display = "none";
    const currentUser = localStorage.getItem('currentUser');
    this.emailCurrentUser = currentUser?.replace(/\"/g, "");
    this.service.getPerfilAtualEmail(this.emailCurrentUser).subscribe(PerfilAtual => {
      this.service.getJogador(PerfilAtual.id).subscribe(JogadorAtual => {
        this.idCurrentJogador = JogadorAtual.id;
        this.service.getPerfis().subscribe(TodosPerfis => {
          TodosPerfis.forEach((element: Perfil) => {
            if (element.id != PerfilAtual.id) {
              this.emailJogadores.push(element.email)
            }
          });
        });
      });
    });
  }

  selectAmigo(event: any) {
    this.selectedJogador = event.target.value;
    document.getElementById("mensagem").style.display = "block";
  }

  toggleEditable(event) {
    if ( event.target.checked ) {
      this.opcao = '1';
    } else {
      this.opcao = '2';
    }
  }

  onSubmit(){
    console.log(this.opcao);
    this.Caminho = [];
    this.nNiveis = this.form.controls['numeroNiveis'].value;
        this.service.getResultadosAlgoritmo(this.emailCurrentUser,this.selectedJogador,this.nNiveis,this.opcao).subscribe(Resultado =>{
          var aux = Object.values(Resultado);
          this.Custo= aux[1];
          if(aux[0].length == 0){
            this.toastr.error("Selecione outro nível ou outro utilizador", undefined, { positionClass: 'toast-bottom-left' });
          } else{
            var var1 = aux[0] +'';
            var auxArray = var1.split(",");
            auxArray.forEach((element: any) =>{
                  this.Caminho.push(element);
                });
            this.toastr.success("Soluções encontradas", undefined, { positionClass: 'toast-bottom-left' });
          }
        });
        document.getElementById("mensagem1").style.display = "block";
        document.getElementById("mensagem2").style.display = "block";    
  }

  onVoltar() {
    this.router.navigateByUrl('/ver_algoritmos');
  }
}
