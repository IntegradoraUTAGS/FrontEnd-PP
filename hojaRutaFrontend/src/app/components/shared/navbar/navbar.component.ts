import { Component, OnInit } from "@angular/core";
import { element } from 'protractor';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  usuarioLogeado:any;
  userRol:any;
  constructor(public rest: RestService) {}

  ngOnInit() {
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
         if(element.rol != "ADMIN"){
           document.getElementById('userAdmin').style.display="none";
         }
      });
    })
  }
  salir(){
    localStorage.clear();
    window.location.pathname="/login";
  }
  changeColor(){
     document.getElementById("Inicio").style.backgroundColor = "green";
  }
}

