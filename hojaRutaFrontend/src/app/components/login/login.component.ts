import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import {UsuarioModel} from '../../models/usuario.models';
import {RestService} from '../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validar:any = [];
  user:any = [];
  constructor(public rest: RestService, private route:ActivatedRoute, private router: Router  ) { }
  usuario: UsuarioModel = new UsuarioModel();
  ngOnInit() {
     
  }
  async verificar (){
    this.user = [];
     await this.rest.logearUser(this.usuario).subscribe((data:{}) => {
      this.user = data; 
      this.validar = this.user.usuario;
      if(this.validar.email === this.usuario.email && this.validar.password){
                alert(this.validar.email + ' Ah sido logeado');
                location.pathname="/presupuesto";
                console.log(this.user.ok);
      }
    }, (data : HttpErrorResponse) =>{
      alert(data.error.err.message);
      console.log(data.error.err.message);
    })
  
  }
  registrar(){
    location.pathname="/registro";
    }


}
