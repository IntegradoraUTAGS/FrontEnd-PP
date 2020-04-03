import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-area-unidad-ejec',
  templateUrl: './area-unidad-ejec.component.html',
  styleUrls: ['./area-unidad-ejec.component.scss']
})
export class AreaUnidadEjecComponent implements OnInit {

  constructor(public rest: RestService) { }
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
}
