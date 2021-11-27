import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedirIntroducaoService } from 'src/app/Services/PedirIntroducao/pedir-introducao.service';
@Component({
  selector: 'app-pedir-introducao',
  templateUrl: './pedir-introducao.component.html',
  styleUrls: ['./pedir-introducao.component.css']
})
export class PedirIntroducaoComponent implements OnInit {

  selectedPlayer: string = '';

  constructor(private pedirIntroducaoService : PedirIntroducaoService,private router:Router) {

   }

  ngOnInit(): void {
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedPlayer = event.target.value;
  }

  onSubmit(){
    this.pedirIntroducaoService.pedirIntroducao(this.selectedPlayer).subscribe({
      next:() =>{
        this.router.navigateByUrl('/homejogadores');
      }
    })
  }
}
