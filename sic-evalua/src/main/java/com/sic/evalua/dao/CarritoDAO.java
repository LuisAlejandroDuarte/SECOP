package com.sic.evalua.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.sic.evalua.entitys.Carrito;

public interface CarritoDAO extends JpaRepository<Carrito, Long> {		
	//Devuelve los itemns del carrito por usuario
	 @Query("select p from Carrito p where p.idUsuario = :user ")
	 List<Carrito> findByUsuario(@Param("user") Long user);	
	 
	 //Deveulve el total de items agregados
	 @Query("select sum(p.cantidad) from Carrito p where p.idUsuario = :user ")
	 Long totalItems(@Param("user") Long user);
	 
	 //Deveulve los items del carrito por usuario y producto
	 @Query("select p from Carrito p where p.idProducto = :idProducto and p.idUsuario=:idUsuario")
	 Carrito getCarrito(@Param("idProducto") Long idProducto,@Param("idUsuario") Long idUsuario);
	 
	 //Deveulve el detalle de tos los items de carrito por usuario
	 @Query("select c from Carrito c, Producto p where p.id=c.idProducto and c.idUsuario =:idUsuario")	 
	 List<Carrito> getCarritoByUser(@Param("idUsuario") Long idUsuario);			 
}
