package com.sic.evalua.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sic.evalua.dao.CarritoDAO;
import com.sic.evalua.dao.ProductoDAO;
import com.sic.evalua.dto.CarritoDTO;
import com.sic.evalua.entitys.Carrito;
import com.sic.evalua.entitys.Producto;
import com.sic.evalua.service.service;


@RestController
@RequestMapping("/api/carrito") 
public class CarritoREST {	
	@Autowired
	private CarritoDAO carritoDAO;	
	@Autowired
	private ProductoDAO productoDAO;	
	@Autowired
	private service joinQueryService;
	
	// Listado carrito
	@GetMapping
	public ResponseEntity<List<Carrito>> getCarritos()  {
		List<Carrito> productos = carritoDAO.findAll();		
		return ResponseEntity.ok(productos);		
	}
	

	// Listado del carrito por usuarios
	
	@RequestMapping(value="{usuarioId}")
	public ResponseEntity<List<Carrito>> getCarrito(@PathVariable("usuarioId") Long usuarioId)  {
	 List<Carrito> optionalCarrito = carritoDAO.findByUsuario(usuarioId);
		if ( optionalCarrito != null && optionalCarrito.size() > 0 ) {			
			return ResponseEntity.ok(optionalCarrito);			
		}
		else {
			return ResponseEntity.noContent().build();
		}				 
	}
	
	//Total de items por usuario
	@RequestMapping(value="/total/{idUsuario}", method = RequestMethod.GET)
	public Long getTotalItemsUser(@PathVariable("idUsuario") Long usuarioId) {		
		return carritoDAO.totalItems(usuarioId);
	}
	
	//Devuele el listado detallado de items en el carrito 
	@RequestMapping(value="/items/{idUsuario}", method = RequestMethod.GET)
	public List<CarritoDTO> getItemsUser(@PathVariable("idUsuario") Long usuarioId) {
		List<CarritoDTO> lista = new ArrayList<CarritoDTO>();		
		List<Producto> producto;
		CarritoDTO carrito;
		List<Carrito> datos = joinQueryService.getItemsCarrito(usuarioId);				
		for(int i=0; i < datos.size(); i++){		
			producto = productoDAO.getId(datos.get(i).getIdProducto());
			carrito = new CarritoDTO(datos.get(i).getId(),datos.get(i).getIdUsuario(),datos.get(i).getIdProducto()
					,producto.get(0).getNombre(),producto.get(0).getDescripcion(),producto.get(0).getPrecio(),
					producto.get(0).getImagen(),datos.get(i).getCantidad());
			lista.add(carrito);			
		}				
		return lista;
	}
	
	
	
	// Agrgega un item al carrito 	
	@PutMapping("/add")
		public ResponseEntity<Carrito> addProductoCarrito(@RequestBody Carrito carrito)  {			       		
			java.util.Optional<Producto> optionalProducto = productoDAO.findById(carrito.getIdProducto());			
			if ( optionalProducto.isPresent() ) {				     	       
     	      // Verifica que tenga en productos mas de un item en cantidad 
     	      if ( optionalProducto.get().getCantidad() >  0 )
     	      {      	            	    	  
     	       // Disminuye en 1 de la cantidad de productos y lo guarda	  
     	       optionalProducto.get().setCantidad(optionalProducto.get().getCantidad() - 1);     	       
     	       productoDAO.save(optionalProducto.get());     	       
     	      Carrito findCarrito = carritoDAO.getCarrito(carrito.getIdProducto(), carrito.getIdUsuario());
	     	  if ( findCarrito==null) {	     	
	     		 findCarrito = new Carrito();
	     		 findCarrito.setIdProducto(carrito.getIdProducto());
	     		 findCarrito.setIdUsuario(carrito.getIdUsuario());
	     		 findCarrito.setCantidad(1L);
	     		 carritoDAO.save(findCarrito);
	     	   } else {
	     		  findCarrito.setCantidad(findCarrito.getCantidad()+1);
	     		 carritoDAO.save(findCarrito);
	     	   }
	     	    return ResponseEntity.ok(findCarrito);     	           	            	       	         			  
     	      }
     	      else  // No puede adicionar mas porque el inventario es Cero
     	      {
     	    	  carrito.setIdProducto(-1L);
   			   return ResponseEntity.ok(carrito);
     	      }
     	    	  
			}
			else {
				// Producto No existe pone no Content
				return ResponseEntity.noContent().build();
			}			    	       
		}
			
	// Elimina un item del carrito 	
	@PutMapping("/descontar")
		public ResponseEntity<Carrito> minusProductoCarrito(@RequestBody Carrito carrito)  {			       
			
			java.util.Optional<Producto> optionalProducto = productoDAO.findById(carrito.getIdProducto());			
			// Si existe el producto
			if ( optionalProducto.isPresent() ) {				
		  	       // Aumenta en 1 de la cantidad de productos del imventario y lo guarda	  
		  	       optionalProducto.get().setCantidad(optionalProducto.get().getCantidad() + 1);		  	       
		  	       productoDAO.save(optionalProducto.get());		  	       		  	       
		  	       // Disminuye en 1 la cantidad del carrito y lo guarda  
		  	       Carrito findCarrito = carritoDAO.getCarrito(carrito.getIdProducto(), carrito.getIdUsuario());
		  	       if (findCarrito.getCantidad()==1) {
		  	    	 carritoDAO.deleteById(findCarrito.getId());
		  	       	} else {
		  	    	 findCarrito.setCantidad(findCarrito.getCantidad()-1);
		  	    	 carritoDAO.save(findCarrito);
		  	       }		  	       		  	       		  	       		  	       		  	      
		  	       return ResponseEntity.ok(findCarrito);
		  	       		  	     		  	      
	            }  
			else {
				// Producto No existe pone no Content
				return ResponseEntity.noContent().build();
			}				
	} 
			
	
}
