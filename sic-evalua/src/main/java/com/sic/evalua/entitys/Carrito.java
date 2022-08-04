package com.sic.evalua.entitys;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="productos_usuarios") 
public class Carrito {   
	
	@Id
	@Column(name="Id") 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="Id_Producto", nullable=false, length=10) 
	private Long idProducto;
	
	@Column(name="Id_Usuario", nullable=false, length=10) 
	private Long idUsuario;	
	
	@Column(name="Cantidad", nullable=true, length=10 ) 
	private Long cantidad;
		


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long getIdProducto() {
		return idProducto;
	}


	public void setIdProducto(Long idProducto) {
		this.idProducto = idProducto;
	}


	public Long getIdUsuario() {
		return idUsuario;
	}


	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	

	public Long getCantidad() {
		return cantidad;
	}


	public void setCantidad(Long cantidad) {
		this.cantidad = cantidad;
	}




	
	

}
