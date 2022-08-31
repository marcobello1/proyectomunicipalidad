CREATE DATABASE dbUsers;
USE dbUsers;
CREATE TABLE `buyers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dni` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `domiciliomi` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` int(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
)