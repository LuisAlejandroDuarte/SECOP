//Muestra los items seleccionados por el usuario
//al menos uno debe ser agregado para que se visualice

import { ProductoUsuario } from './../../model/producto-usuario.model';
import { Component, OnInit } from '@angular/core';
import { ProductoUsuarioService } from 'src/app/service/producto-usuario.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TimerService } from 'src/resource/main.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private productoUsuarioService:ProductoUsuarioService,private router:Router,private main:TimerService) { }


  items:ProductoUsuario[]=[]; //Variable donde se almacenen los productos que se traen por usuario
  pathImagen:string = environment.base_img; // Lugar donde se encuentran las imágenes

  ngOnInit(): void {
    //Se llama al servicio para traer los datos de los items
    this.productoUsuarioService.getItemsUser().subscribe({
      next:(resp:ProductoUsuario[])=>{
        console.log("Items",resp);
        this.items = resp;
      }
    });

  }

  //Sale a  la pantalla de listado de productos
  onSalir() {
    this.router.navigateByUrl("/productos");
  }

  //Adiciona item al carro
  onAddCar(item:ProductoUsuario) {

    const productoUsuario:ProductoUsuario = new ProductoUsuario();
    productoUsuario.idProducto=item.idProducto;
    productoUsuario.idUsuario=item.idUsuario;

    this.productoUsuarioService.addCar(productoUsuario).subscribe({
      next:(resp:ProductoUsuario)=>{
        if (resp.idProducto==-1) {
          Swal.fire("PRODUCTOS","No hay mas productos","error");
        }
        else {
        this.main.mostrarTitulo();
        item.cantidad=resp.cantidad;
        Swal.fire("PRODUCTOS","Producto Agregado al carrito","success");
        }
      },
    })
  }

  //Borra item del carro
  onDeleteCar(item:ProductoUsuario) {
    const productoUsuario:ProductoUsuario = new ProductoUsuario();
    productoUsuario.idProducto=item.idProducto;
    productoUsuario.idUsuario=item.idUsuario;

    Swal.fire({
      title: 'Eliminar',
      text: "Desea eliminar el item?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoUsuarioService.deleteCar(productoUsuario).subscribe({
          next:(resp:ProductoUsuario)=>{

            if (resp.cantidad==1) {
              this.productoUsuarioService.getItemsUser().subscribe({
                next:(resp:ProductoUsuario[])=>{
                  console.log("Items",resp);
                  this.items = resp;
                  this.main.mostrarTitulo();
                }
              });

            }
            else {
            this.main.mostrarTitulo();
            item.cantidad=resp.cantidad;
            }
          },
        })

      }
    })
  }

  //Realiza el total del carro
  total() {
    let sumTotal:number=0;
    this.items.forEach(value=>{
      sumTotal =sumTotal + value.cantidad * value.precio;
    })

    return sumTotal;
  }

}
