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
  UnidadEjecuctora: UnidadEjecuctoraModels = new UnidadEjecuctoraModels();
  unidadEject: any = [];
  listUnidEjec:any=[];
  ngOnInit(): void {
    this.getunid();
  }
  async addUnidadEject (){
      console.log(this.UnidadEjecuctora);
      await this.rest.addUnidadEject(this.UnidadEjecuctora).subscribe((data:{}) => {
       this.unidadEject = data; 
       this.getunid();
     },(data : HttpErrorResponse) =>{
      
    });
}
getunid(){
  this.rest.getUnidadEject().subscribe((res:{unidades})=>{
    this.listUnidEjec = res.unidades;
    console.log(res);
  })
}
eliminarUnidad(id){
this.rest.deleteUnidadEject(id).subscribe((resp)=>{
  this.getunid();
},(err:HttpErrorResponse)=>{
  console.log(err);
})
}
actualizarUnidad(){

}
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