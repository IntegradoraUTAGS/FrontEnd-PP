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
  /*respuesta de la api se guardara en esta variable */
  area:any=[];
  ngOnInit(): void {
    this.porArea();
  }
  porArea(){
    /*api que relaciona las unidades-ejecutoras y usuarios*/
    this.rest.getUnidadUsuario(localStorage.getItem('_id')).subscribe((data:{relaciones})=>{
      this.area=data.relaciones;
      console.log(data.relaciones);
    })
  }
  /*enviara el area seleccionada al localstorage para poder usuar posteriormente */
  ProgramaPorArea(id){
    localStorage.setItem('area', id);  
    this.router.navigate(['/directriz']);
  }
  /*paginar las respuestas de las areas maximo 4 */
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

