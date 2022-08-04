package com.sic.evalua.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sic.evalua.entitys.Producto;

public interface ProductoDAO extends JpaRepository<Producto, Long> {
	 //Devuelve el registro del producto enviando el Id
	 @Query("select p from Producto  p where p.id = :idProducto ")
	 List<Producto> getId(@Param("idProducto") Long idProducto);	
}
