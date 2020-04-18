import { Component, OnInit } from '@angular/core';
import {RestService} from '../../rest.service';
/*Llamada al archivo de la api*/
import { UsuarioModel } from 'src/app/models/usuario.models';
/*Llamada al archivo del modelo usuario*/
import { HttpErrorResponse } from '@angular/common/http';
/*Llamada al archivo de la api*/
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(public rest: RestService) { }
/*Guardar valor del modelo en variable*/
usuario: UsuarioModel = new UsuarioModel();
user: any;
datosUser:any;
unidadEjec:any;
bandera:false;
/*Mensaje que se mostrara al querer cambiar contraseña*/
valid:any={id:"Contraseña Actual"};
  ngOnInit(): void {
    
   this.user= localStorage.getItem('_id');
   this.getUserID();
   /*Verifica el campo departamento que es mostrado al usuario, si el usuario es administrador no aparecera este campo
   ya que tiene derecho sobre cualquier departamento existente*/
   if(this.bandera){
     document.getElementById('departamento').style.display="none";
   }
  }
  /*Obtener usuario por su id para mostrar datos al mismo usuario*/
  getUserID(){
    this.datosUser=[];
    this.rest.getUserById(this.user).subscribe((data:{usuarios})=>{
      this.datosUser=data.usuarios;
      console.log(this.datosUser);
      this.datosUser.forEach(element => {
       this.unidadEjec= element.unidadEjec
      });
    })
  }
  /*Actualizar datos del usuario (por el momento solo nombre)*/
  update(id,product){
    this.rest.updateUser(id,product).subscribe((data)=>{
      console.log(data);
      alert("update");
      /*
      Guardar el nombre en el localstorage y ser visible en
      la barra de navegacion, pagina recargara despues de 1.5 segundos
       */
      localStorage.setItem('nombre',data.usrDB.nombre)
      setTimeout(()=>{    //<<<---    using ()=> syntax
        window.location.reload();
   }, 1500);
    })
  }
  /*Inicia el proceso de validacion de la contraseña, sera visible la ventana emergente actualizar contraseña*/
  contra(){
    document.getElementById('pass').style.display='inline';
    document.getElementById('pwd2').style.display="none";
  }
  /*Verifica y compara que el usuario ingreso la antigua contraseña para poder actualizarla*/
  compararPass(){
    this.rest.getUserById(this.user).subscribe((data:{usuarios})=>{
      this.datosUser=data.usuarios;
      this.datosUser.forEach(element => {
       this.unidadEjec= element.unidadEjec
       this.rest.Comparar(element._id,this.usuario).subscribe((data)=>{
        /*Si la respuesta fue exitosa aparecera el formulario de el llenado de la nueva contraseña
        y se accedera a la funcion de la linea 90 guardarNpass() para actualizar datos del usuario como la
        contraseña en este caso*/
        document.getElementById('confirm').style.display='inline';
        document.getElementById('btn1').style.display='none';
        document.getElementById('btn2').style.display='inline';
        document.getElementById('coloress').style.color='#32cd00';
        this.usuario.password="";
       this.valid={id:"Nueva Contraseña"};
      },(err:HttpErrorResponse)=>{
        /*Si existe un error se mostrara al usuario*/
        console.log(err);
        this.valid={id:"Erronea"};
        document.getElementById('coloress').style.color='red';
     })
      });
    })
    
  }
  /*Esta funcion se llamara cuando antigua contraseña haya sido comparada con exito
  y ahora verificara que la contraseña nueva sea comparada dos veces para evitar el error 
  de una contraseña erronea*/
  guardarNpass(){
    if(this.usuario.password !== this.usuario.pass){
      this.valid={id:"No compatible"};
      document.getElementById('coloress').style.color='red';
     }else{
       this.rest.newPass(this.user,this.usuario).subscribe((res)=>{
        this.valid={id:"Guardando..."};
        document.getElementById('coloress').style.color='blue';
        window.location.reload();
       },(err:HttpErrorResponse)=>{
         console.log(err);
       })
     }
  }
}
