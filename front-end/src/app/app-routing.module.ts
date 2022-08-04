import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guads/auth.guard';
import { LoginComponent } from './forms/login/login.component';
import { ListComponent } from './forms/productos/list.component';
import { VerProductoComponent } from './forms/ver-producto/ver-producto.component';
import { CarritoComponent } from './forms/carrito/carrito.component';


const routes: Routes = [
  {path: '', redirectTo: 'productos',pathMatch: 'full'},
  { path: 'productos', component: ListComponent,canActivate:[AuthGuard]},
  { path: 'ver-producto/:id', component: VerProductoComponent,canActivate:[AuthGuard]},
  { path: 'carrito', component: CarritoComponent,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
