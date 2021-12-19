import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs';
import { FortalezaRedeService } from 'src/app/Services/FortalezaRede/fortaleza-rede.service';

@Component({
  selector: 'app-fortaleza-rede',
  templateUrl: './fortaleza-rede.component.html',
  styleUrls: ['./fortaleza-rede.component.css']
})
export class FortalezaRedeComponent implements OnInit {

  soma:string;
  email: string = '';

  constructor(private fortalezaService: FortalezaRedeService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.email = currentUser?.replace(/\"/g, "");
    this.fortalezaService.getPerfilAtual(this.email).pipe(
      mergeMap((res: any) => this.fortalezaService.getJogadorAtual(res.id))).subscribe( 
        (res1:any) =>{
          this.fortalezaService.getFortalezaRede(res1.id).subscribe( Rede => {
            var res = Object.values(Rede);
            this.soma = res[0];
          });
        });
  }

}
