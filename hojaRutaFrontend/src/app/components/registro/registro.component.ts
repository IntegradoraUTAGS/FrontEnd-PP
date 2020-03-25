import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../models/usuario.models';
import {RestService} from '../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  constructor(public rest: RestService, private route:ActivatedRoute, private router: Router ) { }
  validar:any = [];
  bandera :Boolean = false;
  user:any = [];
  ngOnInit() {
  }
  async addUSer (){
     this.user = [];

      await this.rest.addUser(this.usuario).subscribe((data:{}) => {
        this.user = data;
        this.validar = this.user.usrDB;
        if(this.validar.email != null){
                  alert('Usuario  ' +this.validar.nombre + '  Creado con exito');
                  location.pathname="/login"
        }
      })

    }
 async valid(){
    if(this.usuario.password != this.usuario.valid){
        alert("contraseña distinta");
    }else if (this.usuario.email.slice(-12) != "utags.edu.mx"){
      alert("Terminacion debe ser: utags.edu.mx")
    }else{
      this.addUSer();
    }

  }
}
