import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presupuestacion',
  templateUrl: './presupuestacion.component.html',
  styleUrls: ['./presupuestacion.component.scss']
})
export class PresupuestacionComponent implements OnInit {
  ruta = [ 

 
 

  ]; 

  model:any = {}; 
  model2:any = {}; 
  hideUpdate:boolean = true;
//Metodo de agregar.
  add():void{ 
 
    
    var answer = confirm('¿Guardar?'); 

    this.ruta.push(this.model); 

     

    this.model= {}; 

  } 

//Metodo de eliminar
  delete(i):void { 

    var answer = confirm('¿Eliminar?'); 

    if(answer) { 

      this.ruta.splice(i, 1); 

      

    } 

  } 

 
 

  myValue; 
//Metodo de editar
  edit(i):void { 
   
    this.hideUpdate = false;
    
    var answer = confirm('¿Actualizar?');  

    this.model2.concepto = this.ruta[i].concepto; 

    this.model2.cog = this.ruta[i].cog; 

    this.model2.costoTotal = this.ruta[i].costoTotal; 

    
    this.myValue = i; 

  } 

 
 
//Metodo de actualizar
  update():void { 

    let i = this.myValue; 

    var answer = confirm('Actualizado Correctamente'); 

    for(let j = 0; j < this.ruta.length; j++){ 

      if(i == j) { 

        this.ruta[i] = this.model2; 

         

        this.model2 = {}; 

      } 

    } 
  }
  constructor() { }
  ngOnInit(): void {
  }

}
