import { Component, OnInit, NgModule } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
user:any = [];
  constructor(public rest: RestService, private route:ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(){
    this.user = [];
    this.rest.getUser().subscribe((data:{}) => {
      this.user = data;
      console.log(this.user.usuarios);
    })
  }
  addUser(){
    location.pathname='/user-add';
  }
  deleteUSer(id){
    this.rest.deleteUser(id).subscribe(res => {
      this.getUser();
    }, (err) => {
      console.log(err);
    });
  }
}
