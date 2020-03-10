import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../models/usuario.models';
@Component({
  selector: 'app-unid-ejec',
  templateUrl: './unid-ejec.component.html',
  styleUrls: ['./unid-ejec.component.scss']
})
export class UnidEjecComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  constructor() { }

  ngOnInit(): void {
  }

}
