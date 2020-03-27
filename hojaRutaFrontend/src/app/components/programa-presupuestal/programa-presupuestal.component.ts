import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ProgramaPresupuestalModels} from '../../models/programa-presupuestal.models';
import {RestService} from '../../rest.service';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-programa-presupuestal',
  templateUrl: './programa-presupuestal.component.html',
  styleUrls: ['./programa-presupuestal.component.scss']
})
export class ProgramaPresupuestalComponent implements OnInit {
  programa : ProgramaPresupuestalModels = new ProgramaPresupuestalModels();
  pp: any = [];
  year:any=[];
  constructor(public rest: RestService) { }

  ngOnInit() {
      this.rest.getPrograma().subscribe((data:{}) => {
        this.pp = data;
        console.log(this.pp.programas);
      });
      this.rest.getProgramaPorAño().subscribe((data)=>{
        this.year = data;
      });
  }

  desactivar(){
    document.getElementById('tabla1').style.display= "inline";
    document.getElementById('tabla2').style.display= "none";
    document.getElementById('fecha').style.display= "none";

  }
  reload(){
    location.reload();
  }
  date(d){
    d = new Date(d);
   var date = d. getDate() +1;
   var month = d. getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12.
   var year = d. getFullYear();
   var dateStr =  year;
   return dateStr;
  }
  async addProgram (){
    console.log(this.programa)
    this.pp = [];
     await this.rest.addPRograma(this.programa).subscribe((data:{}) => {
      this.pp = data;
      console.log(this.pp);
      location.reload();
    },(err: HttpErrorResponse)=>{
      console.log(err);
    })
   }
   public todoList: object[] = [];
  public maxSizePagination: string = '6';

  public paginationConfig: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 6,
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
