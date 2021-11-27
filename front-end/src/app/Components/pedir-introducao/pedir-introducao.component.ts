import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedirIntroducaoService } from 'src/app/Services/PedirIntroducao/pedir-introducao.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pedir-introducao',
  templateUrl: './pedir-introducao.component.html',
  styleUrls: ['./pedir-introducao.component.css']
})
export class PedirIntroducaoComponent implements OnInit {

  selectedPlayer: string = '';
  pedirIntroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private pedirIntroducaoService: PedirIntroducaoService, private router: Router) {
    this.pedirIntroForm = this.formBuilder.group({
      player :''
    })
  }

  ngOnInit(): void {
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
