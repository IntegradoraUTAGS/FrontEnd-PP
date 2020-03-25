import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import {RestService} from '../../rest.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(public rest: RestService) { }
pp: any=[];
  ngOnInit(): void {
    this.get();
  }
  async get(){
    this.rest.getPrograma().subscribe((data)=>{
      console.log(data);
  this.pp=data;
    })
  }
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
