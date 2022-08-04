package com.sic.evalua.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sic.evalua.dao.UsuariosDAO;
import com.sic.evalua.entitys.Usuario;

@RestController
@RequestMapping("/api/usuario") 
public class UsuariosREST {
	
	@Autowired
	private UsuariosDAO usuarioDAO;
				
	@PostMapping
	public ResponseEntity<java.util.Optional<Usuario>> getUsuario(@RequestBody Usuario usuario)  {				
       	 java.util.Optional<Usuario> optionalUsuarioId = usuarioDAO.findByClave(usuario.getEmail());						  		  		
		if ( optionalUsuarioId.isPresent() ) {						 
			return ResponseEntity.ok(optionalUsuarioId);
			
		}
		else {
			
			// Retona No Content Error 204
			System.out.println("NO Encontrado ");
			return ResponseEntity.badRequest().build();
		}		
	}	
}
