import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DirectrizComponent } from './components/directriz/directriz.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProgramaPresupuestalComponent } from './components/programa-presupuestal/programa-presupuestal.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAddComponent } from './user-add/user-add.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const appRoutes: Routes = [
  {
path: 'user',
component: UserComponent,
data: {title:'User List'}
  },
  {
path: 'user-add',
component: UserAddComponent,
data: {title:'User Add'}
},
{
path: 'user-edit/:id',
component: UserEditComponent,
data: {title:'User Edit'}
},{
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
    UserAddComponent,
    UserComponent,
    UserEditComponent
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
