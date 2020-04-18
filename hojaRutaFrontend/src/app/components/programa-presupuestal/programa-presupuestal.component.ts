import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ProgramaPresupuestalModels} from '../../models/programa-presupuestal.models';
import {RestService} from '../../rest.service';
/*Llamar al arhcivo de la api*/
import { PaginationInstance } from 'ngx-pagination';
 /*Llamada al archivo de la paginacion*/
@Component({
  selector: 'app-programa-presupuestal',
  templateUrl: './programa-presupuestal.component.html',
  styleUrls: ['./programa-presupuestal.component.scss']
})
export class ProgramaPresupuestalComponent implements OnInit {
  /*Guardar datos de las api en las variables locales*/
  programa : ProgramaPresupuestalModels = new ProgramaPresupuestalModels();
  pp: any = [];
  year:any=[];
  unidadEjec:any=[];
  otro:any=[];
  rol:any=[];
  area:any=[];
  errores:any=[];
  constructor(public rest: RestService) { }

  ngOnInit() {
    this.verificarRol();
    /*Retornar datos de los programas que han sido añadidos por año*/
      this.rest.getProgramaPorAño().subscribe((data)=>{
        this.year = data;
      });
      this.getUnidadEjec();
  }
  /*Retornar datos de los programas-presupuestales*/
  getProgram(){
    this.rest.getPrograma().subscribe((data:{programas}) => {
      this.pp = data.programas;
      this.otro= data.programas;
    });
  }
  /*Retornar datos de las unidades-ejecutoras*/
  getUnidadEjec(){
    this.rest.getUnidadEject().subscribe((data:{unidades})=>{
     this.unidadEjec= data.unidades;
    })
  }
  /*Verificar el rol del usuario para redirigir a una area espeifica o retornar todas las areas*/
  verificarRol(){
    this.rest.getUserById(localStorage.getItem('_id')).subscribe((resp:{usuarios})=>{
    this.rol= resp.usuarios;
    this.rol.forEach(element => {
      this.rol =element.rol;
      /*Si el usuario es administrador podra ver todas los programas agregadas*/
      if(this.rol==="ADMIN"){
        document.getElementById('btnagregar').style.display="inline";
         this.getProgram();
      }
      else{
        /*Si es otro tipo de usuario redirigira a un seleccionador de area especifica*/
      window.location.pathname="/area/unidad";
      }
    });
    });
  }
 /*Ventana emergente de agregar programa-presupuestal y filtrado por fecha*/
  desactivar(){
    document.getElementById('tabla1').style.display= "inline";
    document.getElementById('tabla2').style.display= "none";
    document.getElementById('fecha').style.display= "none";

  }
  reload(){
    location.reload();
  }
  /*ver fecha en un formato especifico*/
  date(d){
    d = new Date(d);
   var date = d. getDate() +1;
   var month = d. getMonth() + 1; 
   var year = d. getFullYear();
   var dateStr =  year;
   return dateStr;
  }
  /*Funcion que llama a la api para agregar un nuevo programa-presupuestal*/
  async addProgram (){
    console.log(this.programa)
    this.pp = [];
     await this.rest.addPRograma(this.programa).subscribe((data:{}) => {
      this.pp = data;
      console.log(this.pp);
      location.reload();
    },(err: HttpErrorResponse)=>{
      console.log(err.error.err.name);
      this.errores=err.error.err.name;
      /*Si encuentra errores de validacion enviara un mensaje de que los campos son requeridos*/
      if(this.errores === 'ValidationError'){
        setTimeout(function(){ document.getElementById('mensaje').style.display='none'; }, 3000);
        document.getElementById('mensaje').style.display='inline';
      }
    })
   }
   /*Paginacion para retornar solo 6 datos para que el usuario pueda verlos*/
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
