package com.sic.evalua.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sic.evalua.entitys.Usuario;

public interface UsuariosDAO extends JpaRepository<Usuario, Long> {
	 //Validación del usuario	
	 @Query("select p from Usuario p where p.email = :email")
	 java.util.Optional<Usuario> findByClave(@Param("email") String email);	

}


