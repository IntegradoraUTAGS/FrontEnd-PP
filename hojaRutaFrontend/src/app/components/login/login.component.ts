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
  error:any=[];
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
                location.pathname="/presupuesto";
                console.log(this.user.ok);
                window.localStorage.setItem('token', this.user.token);
                window.localStorage.setItem('nombre', this.user.usuario.nombre);
                window.localStorage.setItem('_id', this.user.usuario._id);
      }
    }, (data : HttpErrorResponse) =>{
       this.error=data.error.err.message;
       document.getElementById('mensaje').style.display='inline';
       setTimeout(function(){ document.getElementById('mensaje').style.display='none'; }, 3000);
      console.log(data.error.err.message);
    })
  
  }
  registrar(){
    location.pathname="/registro";
    }


}
