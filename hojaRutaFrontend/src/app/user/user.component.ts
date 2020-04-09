import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioModel} from '../models/usuario.models';
import {UsuarioUsuarioModel} from '../models/unidad-usuario.models';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
user:any = [];
error:any=[];
value :any=[];
unidadesEjecutoras:any=[];
unidadEjec:any=[];
  constructor(public rest: RestService, private route:ActivatedRoute, private router: Router ) { }
  usuario: UsuarioModel = new UsuarioModel();
  UnidadUsuario:UsuarioUsuarioModel = new UsuarioUsuarioModel();
  ngOnInit() {
    this.getUnidadEjec();
    if(localStorage.getItem("token") === null ){
      window.location.pathname = "/login";
  } 
    this.getUser();
  }
  getUser(){
    this.user = [];
    this.rest.getUser().subscribe((data:{usuarios}) => {
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
  getUnidadEjec(){
    this.rest.getUnidadEject().subscribe((resp:{unidades})=>{
       this.unidadEjec= resp.unidades;
    });
  }
  postUnidadUsuario(){
    this.value.usuarios.forEach(element => {
    this.UnidadUsuario.usuario=  element._id;
    });
    console.log('unidad', this.UnidadUsuario.unidadEjec)
    console.log('user', this.UnidadUsuario.usuario)
    this.rest.ComprobarAreaUnidadUsuario(this.UnidadUsuario.usuario, this.UnidadUsuario.unidadEjec).subscribe((res)=>{
      console.log(res);
      this.rest.addUnidadUsuario(this.UnidadUsuario).subscribe((resp)=>{
      console.log(resp);
      this.getUnidades(this.UnidadUsuario.usuario);
    },(err:HttpErrorResponse)=>{
      console.log(err);
    })
    }, (err:HttpErrorResponse)=>{
     console.log(err.error.message);
     this.error =err.error.message;
     document.getElementById('mensaje').style.display='inline';
     setTimeout(function(){ document.getElementById('mensaje').style.display='none'; }, 3000);
    }) 
  }
  public todoList: object[] = [];
  public maxSizePagination: string = '6';

  public paginationConfig: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  public labels: object = {
    previousLabel: 'Back',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  public onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }
}
