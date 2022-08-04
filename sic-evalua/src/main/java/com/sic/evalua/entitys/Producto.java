package com.sic.evalua.entitys;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;

@Entity
@Table(name="productos") 
public class Producto {   
	
	@Id
	@Column(name="Id") 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name="Nombre", nullable=false, length=100) 
	private String nombre;

	@Column(name="Descripcion", nullable=false, length=300) 
	private String descripcion;

	@Column(name="Precio", nullable=false, length=10) 
	private Long precio;
	
	@Column(name="Cantidad", nullable=false, length=10 ) 
	private Long cantidad;
		
	
	@Column(name="Imagen", nullable=false, length=500) 
	private String imagen;
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getDescripcion() {
		return descripcion;
	}


	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	public Long getPrecio() {
		return precio;
	}


	public void setPrecio(Long precio) {
		this.precio = precio;
	}


	public Long getCantidad() {
		return cantidad;
	}


	public void setCantidad(Long cantidad) {
		this.cantidad = cantidad;
	}


	public String getImagen() {
		return imagen;
	}


	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	
	
	
	

}
