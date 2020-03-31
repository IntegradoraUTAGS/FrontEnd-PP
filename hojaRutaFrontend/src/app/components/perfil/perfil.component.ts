import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import {RestService} from '../../rest.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(public rest: RestService) { }
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
}
