import { Component, OnInit,Input } from '@angular/core';
import { RestService } from 'src/app/rest.service';
/*Llamada al archivo de la api*/
import { PaginationInstance } from 'ngx-pagination';
/*Llamada al archivo de paginacion del componente*/
@Component({
  selector: 'app-presupuestol-usuario',
  templateUrl: './presupuestol-usuario.component.html',
  styleUrls: ['./presupuestol-usuario.component.scss']
})
export class PresupuestolUsuarioComponent implements OnInit {
  constructor(public rest: RestService) { }
  /*varibale para guardar año,programa-presupuestal del  usuario y la area del usuario*/
  year:any=[];
  pp:any=[];
  area:any=[];
  ngOnInit(): void {
    this.getUser();
   this.getArea();
  }
  /*Obtener datos de la api por el area que tiene dicho usuario*/
  getArea(){
    this.rest.getProgramaId(localStorage.getItem('area')).subscribe((data:{programas})=>{
      this.pp=data.programas;
      
    });
  }
  /*Obtener la unidadEjecutora del usuario*/
  getUser(){
    this.rest.getUnidUser().subscribe((data:{relaciones})=>{
      this.area= data.relaciones;
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

