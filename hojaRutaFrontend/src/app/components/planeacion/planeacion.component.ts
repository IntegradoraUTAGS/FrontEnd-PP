import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-planeacion',
  templateUrl: './planeacion.component.html',
  styleUrls: ['./planeacion.component.scss']
})
export class PlaneacionComponent implements OnInit {

  






  
  title:string = 'AGREGAR'; 



   



  ruta = [ 

 
 

  ]; 

   

  

 
 

  model:any = {}; 

  

 

  hideUpdate:boolean = true; 

 
 
//Metodo para agregar el cual contiene una confirmacion si desea guardar.
  add():void{ 
 
    
    var answer = confirm('¿Guardar?'); 

    this.ruta.push(this.model); 

     

    this.model= {}; 

  } 


//Metodo de eliminar al igual contienen una confirmacion de eliminar.
  delete(i):void { 

    var answer = confirm('¿Eliminar?'); 

    if(answer) { 

      this.ruta.splice(i, 1); 

      

    } 

  } 

 
 

  myValue; 

  //Metodo de editar estara en las cards para editar cada uno.
  edit(i):void { 
   
    this.hideUpdate = false;
    
    var answer = confirm('¿Actualizar?');  

    this.model.objetivosestrategicos = this.ruta[i].objetivosestrategicos; 

    this.model.indi = this.ruta[i].indi; 

    this.model.meta = this.ruta[i].meta; 

    this.model.estrategia = this.ruta[i].estrategia; 

    this.model.actividad =this.ruta[i].actividad; 

    this.model.indicador =this.ruta[i].indicador; 

    this.model.meta2 =this.ruta[i].meta2; 

    this.myValue = i; 

  } 

 

  update():void { 

    let i = this.myValue; 

    var answer = confirm('Actualizado Correctamente'); 

    for(let j = 0; j < this.ruta.length; j++){ 

      if(i == j) { 

        this.ruta[i] = this.model; 

         

        this.model = {}; 

      } 

    } 
  }
  
  constructor() {
    

   }

  ngOnInit(): void {
  }

}
