import { Component, OnInit } from "@angular/core";
import { RestService } from 'src/app/rest.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  /*Obtener el nombre del usuario logeado*/
  usuarioLogeado:any;
  /*Verificar rol del usuario ya sea admin o user(default) */
  userRol:any;
  constructor(public rest: RestService, public router: Router) {}

  ngOnInit() {
    this.login();
    this.usuarioLogeado= localStorage.getItem('nombre');
    document.getElementById("toggle-menu").addEventListener("click", () => {
      const b = document.body;

      b.classList.toggle("translate");
      b.classList.add("overflow-hidden");

      b.addEventListener("transitionend", () => {
        if (!b.classList.contains("translate"))
          b.classList.remove("overflow-hidden");
      });
    });
    this.getUser();
  }
  /*Funcion para verificar el rol del usuario y poder determinar si tiene acceso a elementos del navbar o no */
  getUser(){
    this.rest.getUserById(localStorage.getItem("_id")).subscribe((data:{usuarios})=>{
      this.userRol=data.usuarios;
      this.userRol.forEach(element => {
         if(element.rol === "ADMIN"){
           /*Si es administrador los elementos ocultos seran visibles*/
           document.getElementById('userAdmin').style.display="inline";
         }
      });
    })
  }
  
  salirs(){
    /*Al salir el token y otros componentes seran eliminados para no poder observar datos de la app */
    localStorage.clear();
    this.login();
  }
login(){
  if(localStorage.getItem("token") === null ){
    this.router.navigate(['/login']);
} 
}
/*Redireccionar con el uso de router a los diversos componentes */
presupuesto(){
  this.router.navigate(['/presupuesto']);
}
unidad(){
  this.router.navigate(['/unidEjec']);
}
planeacion(){
  this.router.navigate(['/planeacion']);
}
user(){
  this.router.navigate(['/user']);
}
directriz(){
  this.router.navigate(['/directriz']);
}
perfil(){
  this.router.navigate(['/perfil']);
}
}

