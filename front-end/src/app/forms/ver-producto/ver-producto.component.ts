import { Producto } from './../../model/producto.model';
import { ProductoService } from './../../service/producto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { ProductoUsuarioService } from 'src/app/service/producto-usuario.service';
import { ProductoUsuario } from 'src/app/model/producto-usuario.model';
import Swal from 'sweetalert2';
import { TimerService } from 'src/resource/main.service';
const imagenRuta:string = environment.base_img;
@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {
  imagen:string;
  nombre:string;
  descripcion:string;
  precio:number;
  idProducto:number;
  idUsuario:number =JSON.parse(localStorage.getItem("login")).id;
  constructor(private activatedRoute: ActivatedRoute,private serviceProducto:ProductoService,private router:Router,
    private spinner: NgxSpinnerService,private productoUsuario:ProductoUsuarioService,private main:TimerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.params.subscribe(
      (params: {id: number}) => {
        this.idProducto=params.id;
        //ejecuta el servicio para ver el producto
       this.serviceProducto.consultar(params.id).subscribe({
        next:(producto:Producto)=>{
          this.imagen =`${imagenRuta}${producto.imagen}` ;
          this.nombre=producto.nombre;
          this.descripcion=producto.descripcion;
          this.precio=producto.precio;
          this.spinner.hide();
        }
       });
    });
  }
 //Sale al listado de productos
  onSalir() {
      this.router.navigateByUrl("/productos");
  }

  //Agrega un item al carro
  onAddCar() {

    const productoUsuario:ProductoUsuario = new ProductoUsuario();
    productoUsuario.idProducto=this.idProducto;
    productoUsuario.idUsuario=this.idUsuario;

    this.productoUsuario.addCar(productoUsuario).subscribe({
      next:(resp:ProductoUsuario)=>{
        if (resp.idProducto==-1) {
          Swal.fire("PRODUCTOS","No hay más productos","error");
        }
        else {
        this.main.mostrarTitulo();
        Swal.fire("PRODUCTOS","Producto Agregado al carrito","success");
        }
      },
    })
  }

}
