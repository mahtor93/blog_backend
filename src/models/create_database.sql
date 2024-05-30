DROP TABLE IF EXISTS Rol_usuario;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS usuario_owns_articulo;
DROP TABLE IF EXISTS keyword;
DROP TABLE IF EXISTS article_has_keyword;
DROP TABLE IF EXISTS saved_article;
DROP TABLE IF EXISTS comentario ;
DROP TABLE IF EXISTS usuario_comenta_articulo;
DROP TABLE IF EXISTS carrouselHeader;
DROP TABLE IF EXISTS image_in_carrousel ;
DROP TABLE IF EXISTS Image;


CREATE TABLE rol_usuario (
id UUID  default gen_random_uuid() PRIMARY KEY NOT NULL UNIQUE,
nombre_rol VARCHAR(50) NOT NULL UNIQUE);

CREATE TABLE usuario (
id UUID  default gen_random_uuid() PRIMARY KEY NOT NULL UNIQUE,
fk_rol_usuario UUID NOT NULL,
nombre_usuario VARCHAR(255) NOT NULL UNIQUE,
email_usuario VARCHAR(128) NOT NULL UNIQUE,
hash_passwd VARCHAR(512) NOT NULL);

CREATE TABLE article (
id_article INTEGER PRIMARY KEY NOT NULL UNIQUE,
date_article TIMESTAMP NOT NULL,
title_article VARCHAR(128) NOT NULL,
status BOOLEAN NOT NULL,
contenido TEXT NOT NULL,
header_image UUID NOT NULL);

CREATE TABLE usuario_owns_articulo (
id_user_owns_article INTEGER PRIMARY KEY NOT NULL UNIQUE,
fk_user UUID NOT NULL,
fk_article INTEGER NOT NULL);

CREATE TABLE keyword (
id INTEGER PRIMARY KEY NOT NULL UNIQUE,
keyword VARCHAR(32) NOT NULL UNIQUE);

CREATE TABLE article_has_keyword (
id_key_art INTEGER PRIMARY KEY NOT NULL UNIQUE,
fk_article INTEGER NOT NULL,
fk_keyword INTEGER NOT NULL);

CREATE TABLE saved_article (
id_saved_article INTEGER NOT NULL UNIQUE,
fk_user UUID NOT NULL,
fk_article INTEGER NOT NULL);

CREATE TABLE comentario  (
id UUID  default gen_random_uuid() PRIMARY KEY NOT NULL UNIQUE,
comentario  VARCHAR(300) NOT NULL,
date TIMESTAMP NOT NULL,
fk_usuario_comentario INTEGER NOT NULL);

CREATE TABLE usuario_comenta_articulo (
id_usuario_comentario INTEGER PRIMARY KEY NOT NULL,
fk_usuario UUID NOT NULL,
fk_articuko INTEGER NOT NULL);

CREATE TABLE carrouselHeader (
carrouselId INTEGER PRIMARY KEY NOT NULL,
articleCarrousel INTEGER NOT NULL);

CREATE TABLE image_in_carrousel  (
imageId INTEGER PRIMARY KEY NOT NULL,
carrouselId  INTEGER NOT NULL,
fk_image UUID NOT NULL);

CREATE TABLE Image (
image_id UUID  default gen_random_uuid() PRIMARY KEY NOT NULL,
image_name VARCHAR(120) NOT NULL UNIQUE);

ALTER TABLE usuario ADD CONSTRAINT usuario_fk_rol_usuario_Rol_usuario_id FOREIGN KEY (fk_rol_usuario) REFERENCES Rol_usuario(id);
ALTER TABLE article ADD CONSTRAINT article_header_image_Image_image_id FOREIGN KEY (header_image) REFERENCES Image(image_id);
ALTER TABLE usuario_owns_articulo ADD CONSTRAINT usuario_owns_articulo_fk_user_usuario_id FOREIGN KEY (fk_user) REFERENCES usuario(id);
ALTER TABLE usuario_owns_articulo ADD CONSTRAINT usuario_owns_articulo_fk_article_article_id_article FOREIGN KEY (fk_article) REFERENCES article(id_article);
ALTER TABLE article_has_keyword ADD CONSTRAINT article_has_keyword_fk_article_article_id_article FOREIGN KEY (fk_article) REFERENCES article(id_article);
ALTER TABLE article_has_keyword ADD CONSTRAINT article_has_keyword_fk_keyword_keyword_id FOREIGN KEY (fk_keyword) REFERENCES keyword(id);
ALTER TABLE saved_article ADD CONSTRAINT saved_article_fk_user_usuario_id FOREIGN KEY (fk_user) REFERENCES usuario(id);
ALTER TABLE saved_article ADD CONSTRAINT saved_article_fk_article_article_id_article FOREIGN KEY (fk_article) REFERENCES article(id_article);
ALTER TABLE comentario  ADD CONSTRAINT comentario_fk_usuario_comentario_usuario_comenta_articulo_id_usuario_comentario FOREIGN KEY (fk_usuario_comentario) REFERENCES usuario_comenta_articulo(id_usuario_comentario);
ALTER TABLE usuario_comenta_articulo ADD CONSTRAINT usuario_comenta_articulo_fk_usuario_usuario_id FOREIGN KEY (fk_usuario) REFERENCES usuario(id);
ALTER TABLE usuario_comenta_articulo ADD CONSTRAINT usuario_comenta_articulo_fk_articuko_article_id_article FOREIGN KEY (fk_articuko) REFERENCES article(id_article);
ALTER TABLE carrouselHeader ADD CONSTRAINT carrouselHeader_articleCarrousel_article_id_article FOREIGN KEY (articleCarrousel) REFERENCES article(id_article);
ALTER TABLE image_in_carrousel  ADD CONSTRAINT image_in_carrousel_carrouselId_carrouselHeader_carrouselId FOREIGN KEY (carrouselId ) REFERENCES carrouselHeader(carrouselId);
ALTER TABLE image_in_carrousel  ADD CONSTRAINT image_in_carrousel_fk_image_Image_image_id FOREIGN KEY (fk_image) REFERENCES Image(image_id);

