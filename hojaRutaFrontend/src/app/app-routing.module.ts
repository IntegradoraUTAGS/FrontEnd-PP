import { PerfilComponent } from './components/perfil/perfil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DirectrizComponent } from './components/directriz/directriz.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProgramaPresupuestalComponent } from './components/programa-presupuestal/programa-presupuestal.component';
import { UserComponent } from './user/user.component';
import { UnidEjecComponent } from './unid-ejec/unid-ejec.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "directriz", component: DirectrizComponent },
  { path: "presupuesto", component: ProgramaPresupuestalComponent },
  { path: "registro", component: RegistroComponent },
  { path: "user", component: UserComponent},
  { path: "perfil", component: PerfilComponent},
  {path: "unidEjec", component: UnidEjecComponent},
  { path: "**", pathMatch: "full", redirectTo: "login" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
