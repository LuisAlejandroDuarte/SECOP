import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryProducto } from 'src/repository/producto.repository';
import { Producto } from '../model/producto.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class ProductoService {

  constructor(private http:HttpClient,private router:Router) { }

  //Devuelve todos los productos
  getAll(){
    const id =JSON.parse(localStorage.getItem("login")).id;
    return this.http.get(`${base_url}/producto/`);
  }
  //Consulta un producto por Id
  consultar(id:number) {
    return this.http.get(`${base_url}/producto/${id}`);
  }

}
