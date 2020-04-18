import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioModel} from '../../models/usuario.models';
/*Llamar al archivo de modelos usuario*/
import {RestService} from '../../rest.service';
/*Llamar a la api de servicios*/
import { HttpErrorResponse } from '@angular/common/http';
/*Llamar a los errores de la api*/
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  constructor(public rest: RestService, public router : Router ) { }
 error:any={mensaje:''};
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
          this.router.navigate(['/login']);
        }
      },(err:HttpErrorResponse)=>{
       console.log(err.error.err.message);
       if(err.error.err.message === 'Usuario validation failed: email: email Debe ser único y diferente'){
        this.error = {mensaje:'Email ya existe'}
       document.getElementById('mensajeria').style.display='inline';
        setTimeout(function(){ document.getElementById('mensajeria').style.display='none'; }, 3000);
       }else{
        this.error = {mensaje:'Llenar campos'}
        document.getElementById('mensajeria').style.display='inline';
         setTimeout(function(){ document.getElementById('mensajeria').style.display='none'; }, 3000);
       }
       
      })

    }
 async valid(){
    if (this.usuario.password !== this.usuario.valid){
        this.error = {mensaje:'Contraseña distinta'}
        document.getElementById('mensajeria').style.display='inline';
        setTimeout(function(){ document.getElementById('mensajeria').style.display='none'; }, 3000);
    } else if (this.usuario.email.slice(-13) != "@utags.edu.mx"){
      this.error = {mensaje:'Terminacion debe ser: @utags.edu.mx'}
      document.getElementById('emaile').style.display='inline';
      setTimeout(function(){ document.getElementById('emaile').style.display='none'; }, 3000);
    } else {
      this.addUSer();
    }

  }
}
