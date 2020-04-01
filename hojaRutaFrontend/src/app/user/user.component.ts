import { Component, OnInit, NgModule } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioModel} from '../models/usuario.models';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
user:any = [];
value :any=[];
unidadesEjecutoras:any=[];
  constructor(public rest: RestService, private route:ActivatedRoute, private router: Router ) { }
  usuario: UsuarioModel = new UsuarioModel();
  ngOnInit() {
    if(localStorage.getItem("token") === null ){
      window.location.pathname = "/login";
  } 
    this.getUser();
  }
  getUser(){
    this.user = [];
    this.rest.getUser().subscribe((data:{}) => {
      this.user = data;
    });
  }
 async updateUser(id){
  var element = document.getElementById('display-tab2');
  element.style.display = 'inline';
  var element2 = document.getElementById('display-tab1');
  element2.style.display = 'none';
   await this.rest.getUserById(id).subscribe(res => {
    this.getUnidades(id);
    this.value = res;
  }, (err) => {
    console.log(err);
  });
  }
  async updateUserById(id){
    await this.rest.updateUser(id, this.usuario).subscribe(res => {
     location.reload();

   }, (err) => {
     console.log(err);
   });
  }
  deleteUSer(id){
    this.rest.deleteUser(id).subscribe(res => {
      this.getUser();
    }, (err) => {
      console.log(err);
    });
  }
  getUnidades(id){
    this.rest.getUnidadUsuario(id).subscribe((resp:{relaciones})=>{
        this.unidadesEjecutoras=resp.relaciones;
        console.log(resp.relaciones);
    })
  }
}
