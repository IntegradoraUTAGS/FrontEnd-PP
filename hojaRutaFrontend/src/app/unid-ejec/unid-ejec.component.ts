import {  UnidadEjecuctoraModels } from './../models/unidadEjecutora.models';
import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpErrorResponse} from '@angular/common/http';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-unid-ejec',
  templateUrl: './unid-ejec.component.html',
  styleUrls: ['./unid-ejec.component.scss']
})
export class UnidEjecComponent implements OnInit {
  
  constructor( private rest : RestService) { }
  /*guardar valor de los atributos del modelo en la variable */
  UnidadEjecuctora: UnidadEjecuctoraModels = new UnidadEjecuctoraModels();
  unidadEject: any = [];
  /*Lista de todas las unidades ejecutoras agregadas */
  listUnidEjec:any=[];
  ngOnInit(): void {
    this.getunid();
  }
  async addUnidadEject (){
      /*funcion para agregar una nueva unidad-ejecutora */
      await this.rest.addUnidadEject(this.UnidadEjecuctora).subscribe((data:{}) => {
       this.unidadEject = data; 
       this.getunid();
     },(data : HttpErrorResponse) =>{
       console.log(data);
    });
}
getunid(){
  /*obtener las unidades-ejecutoras aregadas */
  this.rest.getUnidadEject().subscribe((res:{unidades})=>{
    this.listUnidEjec = res.unidades;
  })
}
eliminarUnidad(id){
  /*funcion para eliminar unidad-ejecutora por id*/
this.rest.deleteUnidadEject(id).subscribe((resp)=>{
  this.getunid();
},(err:HttpErrorResponse)=>{
  console.log(err);
})
}
actualizarUnidad(){
/*En proceso de actualizar una unidad ejecutora */
}
/*paginar la cantidad de unidades-ejecutoras que regresara en este caso 5 */
public todoList: object[] = [];
public maxSizePagination: string = '6';

public paginationConfig: PaginationInstance = {
  id: 'advanced',
  itemsPerPage: 5,
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