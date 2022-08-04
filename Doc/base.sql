-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-08-2022 a las 16:08:54
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cce`
--
CREATE DATABASE IF NOT EXISTS `cce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cce`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Descripcion` varchar(300) NOT NULL,
  `Precio` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Imagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`Id`, `Nombre`, `Descripcion`, `Precio`, `Cantidad`, `Imagen`) VALUES
(1, 'Computador Portátil HP 15.6\" Pulgadas ef2501la - AMD Ryzen 5 - RAM 16GB - Disco ', 'Memoria RAM 16 GB Disco Solido 512 GB Procesador AMD R5', 1500000, 1, 'PC2.png'),
(2, 'Mouse REDRAGON Alámbrico Impact Gaming Negro', 'Apto para Manejo con Mano Diestro', 119900, 5, 'mouse.png'),
(3, 'Computador All In One LENOVO 21,5\" Pulgadas AIO 3 - AMD Ryzen 5 - RAM 4GB - Disco SSD 512GB - Negro', 'Memoria RAM 4 GB Disco Solido 512 GB Procesador AMD R5', 1845000, 10, 'PC3.png'),
(4, 'iPhone SE 64GB \"Negro', 'Memoria Interna 64 GB Tipo de Camara Frontal Sencilla Resolución Camara Frontal 1 7 Mpx', 835000, 8, 'Celular1.png'),
(5, 'Ventilador de Piso SAMURAI Tropical Plus Negro', 'Material  de las Aspas Plástico Tamaño Aspas 18 Pulgadas Funcionamiento Alámbrico', 169900, 8, 'ventilador1.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_usuarios`
--

CREATE TABLE `productos_usuarios` (
  `Id` int(11) NOT NULL,
  `Id_Producto` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Password` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Nombre`, `Email`, `Password`) VALUES
(1, 'Luis Alejandro duarte', 'ladm4@hotmail.com', 'U2FsdGVkX1/P819tqSyKeu1JWMmPT5BkypT6ooyWn8k'),
(2, 'Marco Ramirez Martinez', 'mmartinez@hotmail.com', 'U2FsdGVkX1+1U+r21MT7bv1/uqjPmANh7WdLPH+J7yE=');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `productos_usuarios`
--
ALTER TABLE `productos_usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Producto` (`Id_Producto`),
  ADD KEY `Id_Usuario` (`Id_Usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos_usuarios`
--
ALTER TABLE `productos_usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos_usuarios`
--
ALTER TABLE `productos_usuarios`
  ADD CONSTRAINT `productos_usuarios_ibfk_1` FOREIGN KEY (`Id_Producto`) REFERENCES `productos` (`Id`),
  ADD CONSTRAINT `productos_usuarios_ibfk_2` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuarios` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
