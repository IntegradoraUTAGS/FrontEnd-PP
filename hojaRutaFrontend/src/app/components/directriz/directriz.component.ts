import { Component, OnInit } from '@angular/core';
import { DirectrizModels } from '../../models/directriz.models';
/*Modelo Directriz para poder hacer uso de sus atributos */
import { RestService } from '../../rest.service';
/*Llamada al servicio de la api*/
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
/*Paginacion,visualizar con menor carga las respuestas de la api*/
@Component({
  selector: 'app-directriz',
  templateUrl: './directriz.component.html',
  styleUrls: ['./directriz.component.scss']
})
export class DirectrizComponent implements OnInit {
  /*Varibles para enviar y obtener datos a html y modelo"Directriz" */
directriz:DirectrizModels=new DirectrizModels();
directriz1:any=[];
usuario:any=[];
  constructor(public api:RestService, public router :Router) { }

  ngOnInit() {
    this.getUsuario();
  }
  /*Llamada a la api para retornar caracteristicas del usuario en base a su id" */
  getUsuario(){
    this.api.getUserById(localStorage.getItem('_id')).subscribe((resp:{usuarios})=>{
      this.usuario = resp.usuarios;
      resp.usuarios.forEach(element => {
  /*
  *Verificar los privilegios de dicho usario ya sea Admin(retornara todas las Directricez que fueron creadas) o 
  *Usuario(solo las directrices a las que su area tiene permisos de acceder)
  */
        if(element.rol=== 'ADMIN'){
          this.getDirectriz();
        }else if(element.rol=== 'USER'){
          /*Llamada a la api para retornar solo la area a la que tiene derecho*/
          this.api.getDirectrizUnidad(localStorage.getItem('area')).subscribe((resp)=>{
            this.directriz1 = resp;
          })
        }
      });
    })
  }
  /*Llamada a la api para retornar todas las areas creadas */
  getDirectriz(){
    this.api.getDirectriz().subscribe((resp)=>{
      this.directriz1 = resp;
    });
  }
  /*Paginacion, el usuario solo podra ver 3 elementos por seccion  */
  public todoList: object[] = [];
  public maxSizePagination: string = '6';
 /*Cantidad de elementos visibles y en la pagina que iniciara */
  public paginationConfig: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 3,
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
planeacion(){
  this.router.navigate(['/planeacion']);
}
}
