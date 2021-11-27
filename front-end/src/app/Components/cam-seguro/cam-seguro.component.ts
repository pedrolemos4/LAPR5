import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CamSeguroService } from 'src/app/services/CamSeguro/cam-seguro.service';

@Component({
  selector: 'app-cam-seguro',
  templateUrl: './cam-seguro.component.html',
  styleUrls: ['./cam-seguro.component.css']
})
export class CamSeguroComponent implements OnInit {
  camSeguroForm: FormGroup;
  selectedPlayer: string = '';
  
  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private camSeguroService: CamSeguroService) { 
    this.camSeguroForm = this.formBuilder.group({
      jogador: [''],
      forca: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.camSeguroService.getJogadoresNaoAmigos(/*id do user atual*/);
    //obter todos os jogadores nao amigos
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedPlayer = event.target.value;
  }
  
  onSubmit(){
    //ligacao com prolog
  }

}
