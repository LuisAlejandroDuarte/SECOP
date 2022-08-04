package com.sic.evalua.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sic.evalua.dao.ProductoDAO;
import com.sic.evalua.entitys.Producto;


@RestController
@RequestMapping("/api/producto") 
public class ProductoREST {
	
	@Autowired
	private ProductoDAO productoDAO;
	
	// Listado de los productos
	@GetMapping
	public ResponseEntity<List<Producto>> getProductos()  {

		List<Producto> productos = productoDAO.findAll();
		
		return ResponseEntity.ok(productos);
		
	}
	

	// Consultar un producto en particular 
	@RequestMapping(value="{productoId}")
	public ResponseEntity<java.util.Optional<Producto>> getProducto(@PathVariable("productoId") Long productoId)  {

		 System.out.println("Buscar un producto "+productoId);
		java.util.Optional<Producto> optionalProducto = productoDAO.findById(productoId);
		
		if ( optionalProducto.isPresent() ) {
			
			return ResponseEntity.ok(optionalProducto);
			
		}
		else {
			return ResponseEntity.noContent().build();
		}
		
	}			
	
}
