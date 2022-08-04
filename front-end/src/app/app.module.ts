import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/shared/material/material.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './forms/login/login.component';
import { ListComponent } from './forms/productos/list.component';
import { VerProductoComponent } from './forms/ver-producto/ver-producto.component';
import { CarritoComponent } from './forms/carrito/carrito.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { TimerService } from 'src/resource/main.service';




@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginComponent,
    VerProductoComponent,
    CarritoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [ TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
