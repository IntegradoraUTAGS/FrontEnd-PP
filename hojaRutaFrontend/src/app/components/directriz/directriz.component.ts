import { Component, OnInit } from '@angular/core';
import { DirectrizModels } from '../../models/directriz.models';
import { RestService } from '../../rest.service';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-directriz',
  templateUrl: './directriz.component.html',
  styleUrls: ['./directriz.component.scss']
})
export class DirectrizComponent implements OnInit {
directriz:DirectrizModels=new DirectrizModels();
directriz1:any=[];
usuario:any=[];
  constructor(public api:RestService) { }

  ngOnInit() {
    this.getUsuario();
  }
  getUsuario(){
    this.api.getUserById(localStorage.getItem('_id')).subscribe((resp:{usuarios})=>{
      this.usuario = resp.usuarios;
      resp.usuarios.forEach(element => {
        if(element.rol=== 'ADMIN'){
          this.getDirectriz();
        }else if(element.rol=== 'USER'){
          this.api.getDirectrizUnidad(localStorage.getItem('area')).subscribe((resp)=>{
            this.directriz1 = resp;
          })
        }
      });
    })
  }
  getDirectriz(){
    this.api.getDirectriz().subscribe((resp)=>{
      this.directriz1 = resp;
    });
  }
  public todoList: object[] = [];
  public maxSizePagination: string = '6';

  public paginationConfig: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 3,
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
