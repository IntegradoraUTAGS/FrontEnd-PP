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

  //Inicializamos las variables que vayamos a utilizar
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
    //Al cargar la pagina iniciamos la verificacion del rol
    this.verificarRol();
      this.rest.getProgramaPorAño().subscribe((data)=>{
        this.year = data;
      });
      this.getUnidadEjec();
  }

  //Obtenemos los programas presupuestuales  con una suscripcion
  getProgram(){

    this.rest.getPrograma().subscribe((data:{programas}) => {
      this.pp = data.programas;
      this.otro= data.programas;
    });
  }
  getUnidadEjec() {  //Obtenemos las unidades ejecutoras  con una suscripcion
    this.rest.getUnidadEject().subscribe((data:{unidades})=>{
     this.unidadEjec= data.unidades;
    })
  }
  verificarRol() { //Verificamos si tiene el rol necesario
    this.rest.getUserById(localStorage.getItem('_id')).subscribe((resp:{usuarios})=>{
    this.rol= resp.usuarios;
    this.rol.forEach(element => {
      this.rol =element.rol;
      if(this.rol==="ADMIN"){
        document.getElementById('btnagregar').style.display="inline";
         this.getProgram();
      }
      else{
      window.location.pathname="/area/unidad";
      }
    });
    });
  }

  desactivar(){ //Creamos una funcion para desactivar algunas cosas
    document.getElementById('tabla1').style.display= "inline";
    document.getElementById('tabla2').style.display= "none";
    document.getElementById('fecha').style.display= "none";

  }
  reload(){
    location.reload();
  }
  date(d){  //Obtenemos la fecha
    d = new Date(d);
   var date = d. getDate() +1;
   var month = d. getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12.
   var year = d. getFullYear();
   var dateStr =  year;
   return dateStr;
  }
  async addProgram (){ //Agregamos un programa presupuestual
    console.log(this.programa)
    this.pp = [];
     await this.rest.addPRograma(this.programa).subscribe((data:{}) => {
      this.pp = data;
      console.log(this.pp);
      location.reload();
    },(err: HttpErrorResponse)=>{
      console.log(err.error.err.name);
      this.errores=err.error.err.name;
      if(this.errores === 'ValidationError'){
        setTimeout(function(){ document.getElementById('mensaje').style.display='none'; }, 3000);
        document.getElementById('mensaje').style.display='inline';
      }
    })
   }
   public todoList: object[] = [];
  public maxSizePagination: string = '6';

  public paginationConfig: PaginationInstance = {//Definimos la paginacion
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
