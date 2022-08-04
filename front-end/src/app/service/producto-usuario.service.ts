import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryProductoUsuario } from 'src/repository/producto.repository';
import { ProductoUsuario } from '../model/producto-usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class ProductoUsuarioService {

  constructor(private http:HttpClient,private router:Router) { }


  //Total de items por usuario
  getTotalItemUser() {
    const idUser =JSON.parse(localStorage.getItem("login")).id;

    return this.http.get(`${base_url}/carrito/total/${idUser}`);
  }
 //Agrega un item al carrito
  addCar(datos:ProductoUsuario) {
   return this.http.put(`${base_url}/carrito/add/`,datos);
  }

  //Borra item del carro
  deleteCar(datos:ProductoUsuario) {
   return  this.http.put(`${base_url}/carrito/descontar/`,datos);
  }

  //Items por usuario
  getItemsUser() {
    const idUser =JSON.parse(localStorage.getItem("login")).id;
    return this.http.get(`${base_url}/carrito/items/${idUser}`);
  }

}
