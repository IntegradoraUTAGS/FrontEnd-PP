import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DirectrizComponent } from './components/directriz/directriz.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProgramaPresupuestalComponent } from './components/programa-presupuestal/programa-presupuestal.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UnidEjecComponent } from './unid-ejec/unid-ejec.component';

import { PerfilComponent } from './components/perfil/perfil.component';
import { PresupuestolUsuarioComponent } from './components/presupuestol-usuario/presupuestol-usuario.component';
import { DirectrizUsuarioComponent } from './components/directriz-usuario/directriz-usuario.component';
import { AgregarPresupuestoComponent } from './components/agregar-presupuesto/agregar-presupuesto.component';
import { FooterComponent } from './components/shared/footer/footer.component';


const appRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    data: { title: 'User List' }
  },
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'

  }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DirectrizComponent,
    RegistroComponent,
    ProgramaPresupuestalComponent,
    UserComponent,

    UnidEjecComponent
    , PerfilComponent, PresupuestolUsuarioComponent, DirectrizUsuarioComponent, AgregarPresupuestoComponent, FooterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
