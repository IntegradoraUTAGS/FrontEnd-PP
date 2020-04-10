import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DirectrizComponent } from './components/directriz/directriz.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProgramaPresupuestalComponent } from './components/programa-presupuestal/programa-presupuestal.component';
import { UserComponent } from './user/user.component';
import { UnidEjecComponent } from './unid-ejec/unid-ejec.component';
import { DirectrizUsuarioComponent } from './components/directriz-usuario/directriz-usuario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AgregarPresupuestoComponent } from './components/agregar-presupuesto/agregar-presupuesto.component';
import { PresupuestolUsuarioComponent } from './components/presupuestol-usuario/presupuestol-usuario.component';
import { PlaneacionComponent } from './components/planeacion/planeacion.component';
import { PresupuestacionComponent } from './components/presupuestacion/presupuestacion.component';
import { DistribucionCuatrimestralComponent } from './components/distribucion-cuatrimestral/distribucion-cuatrimestral.component';
import {AreaUnidadComponent} from './area-unidad/area-unidad.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  {path: "admin/add-presupuesto", component: AgregarPresupuestoComponent},
  {path: "presupuesto", component: ProgramaPresupuestalComponent},
  { path: "perfil", component: PerfilComponent },
  { path: "presupuesto/:id", component: DirectrizUsuarioComponent },
  { path: "admin/presupuesto/:id", component: DirectrizComponent },
  { path: "registro", component: RegistroComponent },
  { path: "directriz", component: DirectrizComponent },
  { path: "user", component: UserComponent },
  {path:"unidadUsuario", component: PresupuestolUsuarioComponent},
  { path: "unidEjec", component: UnidEjecComponent },
  {path:"planeacion", component:PlaneacionComponent},
  {path:"presupuestacion", component:PresupuestacionComponent},
  {path:"distribucion-cuatrimestral", component:DistribucionCuatrimestralComponent},
  {path:"area/unidad", component: AreaUnidadComponent},
  { path: "**", pathMatch: "full", redirectTo: "login" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
