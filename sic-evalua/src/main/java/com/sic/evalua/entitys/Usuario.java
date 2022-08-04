package com.sic.evalua.entitys;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="usuarios") 
public class Usuario {
	
	@Id
	@Column(name="Id") 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name="Nombre", nullable=false, length=200) 
	private String nombre;
	
	@Column(name="Email", nullable=false, length=200) 
	private String email;
	
	@Column(name="Password", nullable=false, length=200) 
	private String password;

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
		
	
	
	

}
