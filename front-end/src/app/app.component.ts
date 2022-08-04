import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from 'src/resource/main.service';
import { ProductoUsuarioService } from './service/producto-usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'COMPRA DE PRODUCTOS';
  nombre:string;
  viewCar:boolean =false;
  viewButton:boolean=false;
  totalItems:number;
  constructor(private router:Router,private main:TimerService,private productoUsuario:ProductoUsuarioService,private cdRef:ChangeDetectorRef) { }
  ngOnInit(): void {
    setTimeout(()=>{
      this.main.countdownEnd$.subscribe(()=>{
        if (localStorage.getItem("login")) {
          this.nombre = JSON.parse(localStorage.getItem("login")).nombre;

          this.productoUsuario.getTotalItemUser().subscribe({
            next:(resp:number)=>{
              this.totalItems=resp;
              (resp>0)? this.viewCar = true:this.viewCar = false;
              this.viewButton=true;
              console.log("Actualizar vista de carro",this.viewCar);
            }
          })
        }
      });
    });
  }

  ngAfterViewInit() {
   this.cdRef.detectChanges();
   setTimeout(()=>{
    if (localStorage.getItem("login")) {
      console.log("Nombre",this.nombre);
      this.nombre = JSON.parse(localStorage.getItem("login")).nombre;

      this.productoUsuario.getTotalItemUser().subscribe({
        next:(resp:number)=>{
          console.log("Nombre",resp);
          this.totalItems=resp;
          (resp>0)? this.viewCar = true:this.viewCar = false;
          this.viewButton=true;
        }
      })
    }
  });

  }

  onCarrito() {
    this.router.navigateByUrl("/carrito");
  }

  onSalir() {
    localStorage.removeItem("login");
    this.viewCar = false;
    this.viewButton=false;
    this.nombre="";
    this.router.navigateByUrl('/login');
  }

}
