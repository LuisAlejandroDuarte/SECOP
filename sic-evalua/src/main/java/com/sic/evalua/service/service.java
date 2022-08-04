package com.sic.evalua.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sic.evalua.dao.CarritoDAO;
import com.sic.evalua.entitys.Carrito;

import java.util.List;

@Service
public class service {

	@Resource
	private CarritoDAO carritoDAO;
	
	public List<Carrito> getItemsCarrito(Long IdUsuario)
	{
		return carritoDAO.getCarritoByUser(IdUsuario);
	}
	
}
