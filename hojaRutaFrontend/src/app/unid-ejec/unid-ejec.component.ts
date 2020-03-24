import {  UnidadEjecuctoraModels } from './../models/unidadEjecutora.models';
import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-unid-ejec',
  templateUrl: './unid-ejec.component.html',
  styleUrls: ['./unid-ejec.component.scss']
})
export class UnidEjecComponent implements OnInit {
  
  constructor( private rest : RestService) { }
  UnidadEjecuctora: UnidadEjecuctoraModels = new UnidadEjecuctoraModels();
  unidadEject: any = [];
  ngOnInit(): void {
  }
  async addUnidadEject (){
      console.log(this.UnidadEjecuctora);
      await this.rest.addUnidadEject(this.UnidadEjecuctora).subscribe((data:{}) => {
       this.unidadEject = data; 
     },(data : HttpErrorResponse) =>{
      
    });
  
}
}