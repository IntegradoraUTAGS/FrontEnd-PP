import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { PaginationInstance } from 'ngx-pagination';
import { Router } from '@angular/router';
@Component({
  selector: 'app-area-unidad',
  templateUrl: './area-unidad.component.html',
  styleUrls: ['./area-unidad.component.scss']
})
export class AreaUnidadComponent implements OnInit {

  constructor(public rest: RestService, public router:Router) { }
  area:any=[];
  ngOnInit(): void {
    this.porArea();
  }
  porArea(){
    this.rest.getUnidadUsuario(localStorage.getItem('_id')).subscribe((data:{relaciones})=>{
      this.area=data.relaciones;
      console.log(data.relaciones);
    })
  }
  ProgramaPorArea(id){
    localStorage.setItem('area', id);  
    this.router.navigate(['/directriz']);
  }
  public todoList: object[] = [];
    public maxSizePagination: string = '6';
  
    public paginationConfig: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 4,
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

