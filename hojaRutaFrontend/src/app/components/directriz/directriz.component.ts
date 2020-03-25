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
  constructor(public api:RestService) { }

  ngOnInit() {
    this.api.getDirectriz().subscribe((resp)=>{
      this.directriz1 = resp;
      console.log(this.directriz1);
    });
  }
  public todoList: object[] = [];
  public maxSizePagination: string = '6';

  public paginationConfig: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 4,
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
