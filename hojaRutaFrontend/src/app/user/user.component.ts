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
  /*guardar valor de Validar rol de usuario*/
userRol:any=[];
/*guardar valor de atributps de usuario*/
  user:any = [];
  /*errores generales de usuario*/
error:any=[];
/*guardar valor de usuario por id*/
value :any=[];
/*verificar las unidades que el usuario tiene acceso*/
unidadesEjecutoras:any=[];
/*funcion para poder agregarle al usuario alguna otra area*/
unidadEjec:any=[];
  constructor(public rest: RestService, private route:ActivatedRoute, private router: Router ) { }
  /*guardar valor de usariomodel en variable*/
  usuario: UsuarioModel = new UsuarioModel();
  /*guardar valor unidad-ejecutora en modelounidadejecutora*/
  UnidadUsuario:UsuarioUsuarioModel = new UsuarioUsuarioModel();
  ngOnInit() {
    this.validar();
    this.getUnidadEjec();
    /*verificar si el usuario no cuenta con token para redirigir al login*/
    if(localStorage.getItem("token") === null ){
      this.router.navigate(['login']);
  } 
    
  }
  validar(){
    /*si el usuario no es admin no abra respuesta de la api*/
    this.rest.getUserById(localStorage.getItem("_id")).subscribe((data:{usuarios})=>{
      this.userRol=data.usuarios;
      this.userRol.forEach(element => {
         if(element.rol !== "ADMIN"){
          this.router.navigate(['area/unidad']);
         }else if(element.rol === "ADMIN"){
          this.getUser();
         }
      });
    })
  }
  /*retornara los usuarios que han sido agregados*/
  getUser(){
    this.user = [];
    this.rest.getUser().subscribe((data:{usuarios}) => {
      this.user = data;
    });
  }
  /*abrira una ventana emergente y los valores de un usuario por su id*/
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
  /*actualizar los campos de usuario segun su id*/
  async updateUserById(id){
    await this.rest.updateUser(id, this.usuario).subscribe(res => {
     location.reload();

   }, (err) => {
     console.log(err);
   });
  }
  deleteUSer(id){
    /*un usuario podra ser desactivado para ya no poder acceder a la app*/
    this.rest.deleteUser(id).subscribe(res => {
      this.getUser();
    }, (err) => {
      console.log(err);
    });
  }
  getUnidades(id){
    /*retornar las unidades-ejecutoras alas que el usuario tiene asignadas*/
    this.rest.getUnidadUsuario(id).subscribe((resp:{relaciones})=>{
        this.unidadesEjecutoras=resp.relaciones;
        console.log(resp.relaciones);
    })
  }
  /*lista completa para poder asignar nueva unidad al usuario con un select*/
  getUnidadEjec(){
    this.rest.getUnidadEject().subscribe((resp:{unidades})=>{
       this.unidadEjec= resp.unidades;
    });
  }
  /*agregar una unidad al usuario*/
  postUnidadUsuario(){
    this.value.usuarios.forEach(element => {
    this.UnidadUsuario.usuario=  element._id;
    });
    console.log('user value', this.UnidadUsuario)
    this.rest.ComprobarAreaUnidadUsuario(this.UnidadUsuario.usuario, this.UnidadUsuario.unidadEjec).subscribe((res)=>{
      console.log(res);
      console.log('post unidades', this.UnidadUsuario)
      this.rest.addUnidadUsuario(this.UnidadUsuario.usuario,this.UnidadUsuario.unidadEjec).subscribe((resp)=>{
      console.log(resp);
      this.getUnidades(this.UnidadUsuario.usuario);
    },(err:HttpErrorResponse)=>{
      console.log(err);
    })
    }, (err:HttpErrorResponse)=>{
      /*validar si la area ya fue asignada para no permitir repetir dos veces la misma unidad*/
     console.log(err.error.message);
     this.error =err.error.message;
     document.getElementById('errormsg').style.display='inline';
     setTimeout(function(){ document.getElementById('errormsg').style.display='none'; }, 3000);
    }) 
  }
  /*poder eliminar una unidad a un usuario*/
  eliminarArea(id){
    this.rest.deleteUnidadUsuario(id).subscribe((res)=>{
     console.log(res);
    })
  }
  return(){
    location.reload();
  }
  /*paginar la respuesta de los usuarios en un maximo de 10 usuarios por pagina*/
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
