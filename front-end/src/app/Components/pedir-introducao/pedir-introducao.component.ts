import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedirIntroducaoService } from 'src/app/Services/PedirIntroducao/pedir-introducao.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Jogador } from 'src/app/Models/Jogador';
@Component({
  selector: 'app-pedir-introducao',
  templateUrl: './pedir-introducao.component.html',
  styleUrls: ['./pedir-introducao.component.css']
})
export class PedirIntroducaoComponent implements OnInit {

  selectedPlayer: string = '';
  pedirIntroForm: FormGroup;
  // public li: any;
  // public lis = [];
  playersList: Jogador[] = [];


  constructor(private formBuilder: FormBuilder, private pedirIntroducaoService: PedirIntroducaoService, private router: Router) {
    this.pedirIntroForm = this.formBuilder.group({
      player: ''
    })
  }

  ngOnInit(): void {

    this.pedirIntroducaoService.getJogadores().subscribe(Response => {
      /* if (Response) {
         hideloader();
       }*/

      console.log(Response);
      this.playersList = Response;
    });
    /* function hideloader() {
       //document.getElementById('loading').style.display ='none';
     }*/
  }


  selectChangeHandler(event: any) {
    //update the ui
    this.selectedPlayer = event.target.value;
  }

  onSubmit() {
    this.pedirIntroducaoService.pedirIntroducao(this.selectedPlayer).subscribe({
      next: () => {
        this.router.navigateByUrl('/homejogadores');
      }
    })
  }
}
