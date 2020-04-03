import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import {RestService} from '../../rest.service';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(public rest: RestService) { }
usuario: UsuarioModel = new UsuarioModel();
user: any;
datosUser:any;
unidadEjec:any;
bandera:false;
valid:any={id:"Contraseña Actual"};
  ngOnInit(): void {
    
   this.user= localStorage.getItem('_id');
   this.getUserID();
   if(this.bandera){
     document.getElementById('departamento').style.display="none";
   }
  }
  
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
  update(id,product){
    this.rest.updateUser(id,product).subscribe((data)=>{
      console.log(data);
      alert("update");
      localStorage.setItem('nombre',data.usrDB.nombre)
      setTimeout(()=>{    //<<<---    using ()=> syntax
        window.location.reload();
   }, 1500);
    })
  }
  contra(){
    document.getElementById('pass').style.display='inline';
    document.getElementById('pwd2').style.display="none";
  }
  compararPass(){
    console.log(this.usuario)
    this.rest.getUserById(this.user).subscribe((data:{usuarios})=>{
      this.datosUser=data.usuarios;
      this.datosUser.forEach(element => {
       this.unidadEjec= element.unidadEjec
       this.rest.Comparar(element._id,this.usuario).subscribe((data)=>{
        console.log(data);
        document.getElementById('confirm').style.display='inline';
        document.getElementById('coloress').style.color='#32cd00';
        this.usuario.password="";
       this.valid={id:"Nueva Contraseña"};
      },(err:HttpErrorResponse)=>{
        console.log(err);
        this.valid={id:"Erronea"};
        document.getElementById('coloress').style.color='red';
     })
      });
    })
    
  }
}
