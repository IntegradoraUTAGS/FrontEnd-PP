import { Component, OnInit } from "@angular/core";
import { element } from 'protractor';
import { RestService } from 'src/app/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PresupuestolUsuarioComponent } from '../../presupuestol-usuario/presupuestol-usuario.component';
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  usuarioLogeado:any;
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
  getUser(){
    this.rest.getUserById(localStorage.getItem("_id")).subscribe((data:{usuarios})=>{
      this.userRol=data.usuarios;
      this.userRol.forEach(element => {
         if(element.rol === "ADMIN"){
           document.getElementById('userAdmin').style.display="inline";
         }
      });
    })
  }
  
  salirs(){
    localStorage.clear();
    this.login();
  }
  changeColor(){
     document.getElementById("Inicio").style.backgroundColor = "green";
  }
login(){
  if(localStorage.getItem("token") === null ){
    this.router.navigate(['/login']);
} 
}
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

