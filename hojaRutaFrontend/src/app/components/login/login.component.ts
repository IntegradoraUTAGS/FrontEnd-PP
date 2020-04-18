import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import {UsuarioModel} from '../../models/usuario.models';
import {RestService} from '../../rest.service';
/*Llamada a la api  */
import {ActivatedRoute, Router} from '@angular/router';
/*Paginacion, el usuario solo podra ver 3 elementos por seccion  */
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
/*Mostrar los errores que la api responda */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validar:any = [];
  user:any = [];
  error:any=[];
  constructor(public rest: RestService, private route:ActivatedRoute, private router: Router  ) { }
  /*Variable local que guarda atributos del modelo usuario */
  usuario: UsuarioModel = new UsuarioModel();
  ngOnInit() {
     
  }
  /*Funcion para verificar si el usuario  y la contraseña son correctos */
  async verificar (){
    this.user = [];
    /*Envian los datos del usuario(email,password) y valida si existe y son correctos los campos */
     await this.rest.logearUser(this.usuario).subscribe((data:{}) => {
      this.user = data; 
      this.validar = this.user.usuario;
      if(this.validar.email === this.usuario.email && this.validar.password){
               /*Si la respuesta es correcta permitira acceder al usuario y guardara algunos valores en localStorage */
               this.router.navigate(['/presupuesto']);
                console.log(this.user.ok);
                window.localStorage.setItem('token', this.user.token);
                window.localStorage.setItem('nombre', this.user.usuario.nombre);
                window.localStorage.setItem('_id', this.user.usuario._id);
      }
      /*Si existe algun error retornara ese error en una variable que sera visible por 3segundos en la pantalla(html) */
    }, (data : HttpErrorResponse) =>{
       this.error=data.error.err.message;
       document.getElementById('mensaje').style.display='inline';
       setTimeout(function(){ document.getElementById('mensaje').style.display='none'; }, 3000);
      console.log(data.error.err.message);
    })
  
  }
  /*Si el usuario no esta registrado podra registrar con esta funcion que redirigira a un formulario */
  registrar(){
    this.router.navigate(['/registro']);
    }


}
