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
  /*Guardar modelo en la variable usuario */
  usuario: UsuarioModel = new UsuarioModel();
  constructor(public rest: RestService, public router : Router ) { }
 /*error sera llamado en  el la vista cuando exista un problema con la llamada a la api */
  error:any={mensaje:''};
  /*validar que el usuario se creo con exito */
  validar:any = [];
  /*Guardar resp de la api en variable user */
  user:any = [];
  ngOnInit() {
  }
  async addUSer (){
     this.user = [];

      await this.rest.addUser(this.usuario).subscribe((data:{}) => {
        this.user = data;
        this.validar = this.user.usrDB;
        if(this.validar.email != null){
          /*Redirigir al componente login*/
          this.router.navigate(['/login']);
        }
      },(err:HttpErrorResponse)=>{
       /*Sie xiste un error de email igual a alguno existente, el sistema respondera con esto: */
       if(err.error.err.message === 'Usuario validation failed: email: email Debe ser único y diferente'){
        this.error = {mensaje:'Email ya existe'}
        /*Aparecera alerta y se quitara despues de 3 segundos */
       document.getElementById('mensajeria').style.display='inline';
        setTimeout(function(){ document.getElementById('mensajeria').style.display='none'; }, 3000);
       }else{
         /*Si no se relleno el forumlario la respuesta de la api sera: */
        this.error = {mensaje:'Llenar campos'}
        document.getElementById('mensajeria').style.display='inline';
         setTimeout(function(){ document.getElementById('mensajeria').style.display='none'; }, 3000);
       }
       
      })

    }
 async valid(){
   /*Verificara que las contraseñas sean iguales para poder guardarla*/
    if (this.usuario.password !== this.usuario.valid){
        this.error = {mensaje:'Contraseña distinta'}
        document.getElementById('mensajeria').style.display='inline';
        setTimeout(function(){ document.getElementById('mensajeria').style.display='none'; }, 3000);
        /*La terminacion del correo electronico solo puede ser @yags.edu.mx de no ser asi enviara un mensaje:*/
    } else if (this.usuario.email.slice(-13) != "@utags.edu.mx"){
      this.error = {mensaje:'Terminacion debe ser: @utags.edu.mx'}
      document.getElementById('emaile').style.display='inline';
      setTimeout(function(){ document.getElementById('emaile').style.display='none'; }, 3000);
    } else {
      this.addUSer();
    }

  }
}
