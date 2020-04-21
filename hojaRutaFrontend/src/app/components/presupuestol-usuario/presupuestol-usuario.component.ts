import { Component, OnInit,Input } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { RestService } from 'src/app/rest.service';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-presupuestol-usuario',
  templateUrl: './presupuestol-usuario.component.html',
  styleUrls: ['./presupuestol-usuario.component.scss']
})
export class PresupuestolUsuarioComponent implements OnInit {
  //Llamamos las variables necesarias
  constructor(public rest: RestService) { }
  year:any=[];
  pp:any=[];
  area:any=[];
  ngOnInit(): void {
    this.getUser();
   this.getArea();
  }
  //Obtenemos el area
  getArea(){
    this.rest.getProgramaId(localStorage.getItem('area')).subscribe((data:{programas})=>{
      this.pp=data.programas;

    });
  }
  //Obtenemos el usuario
  getUser(){
    this.rest.getUnidUser().subscribe((data:{relaciones})=>{
      this.area= data.relaciones;
      console.log(this.area);
    })
  }
  public todoList: object[] = [];
  public maxSizePagination: string = '6';

  //Inicializamos la paginacion
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

