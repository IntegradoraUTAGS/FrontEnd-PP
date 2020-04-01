import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import {RestService} from '../../rest.service';
import { UsuarioModel } from 'src/app/models/usuario.models';
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
}
