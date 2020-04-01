import { NgModule } from '@angular/core';
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
import { AreaUnidadEjecComponent } from './area-unidad-ejec/area-unidad-ejec.component';


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
  { path: "unidEjec", component: UnidEjecComponent },
  { path: "area/unidEjec", component: AreaUnidadEjecComponent },
  { path: "**", pathMatch: "full", redirectTo: "login" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
