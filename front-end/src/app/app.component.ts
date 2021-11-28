import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMenu:boolean = false;

  constructor(router:Router) {
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.showMenu = event.url !== "/home" && event.url !== "/perfil" && event.url !== "/rede"
            && event.url !== "/tam_rede" && event.url !== "/cam_curto" && event.url !== "/cam_forte" && event.url !== "/cam_seguro"
            && event.url !== "/introducao" && event.url !== "/pedir_introducao" && event.url !== "/pedido"
        }
      });
    }
}
