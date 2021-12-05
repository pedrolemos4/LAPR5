import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  Logout(){
    localStorage.removeItem('currentUser');
    console.log(localStorage.getItem('currentUser'));
    this.toastr.success('Logout realizado com sucesso!');
    this.router.navigateByUrl('/homePrincipal');
    
  }
}
