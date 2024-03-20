---
lang: es
type: "post"
title: "Cómo instalar Django en Ubuntu?"
author: "FIQUS"
slug: "/como-instalar-django"
date: "2012-09-17"
image:  ../images/ubuntu-django.png
imageCredits: "Créditos de imagen unsplash"
tags: ["Ubuntu", "Django", "Python"]
---

[Django](https://www.djangoproject.com/) es un framework de desarrollo web de código abierto, escrito en Python, que cumple en cierta medida el paradigma del Modelo Vista Controlador ([Wiki](http://es.wikipedia.org/wiki/Django_(framework)))

1. Verificar que pyhton esté instalado con:

```bash
python --version
```
<br>

2. Instalar el administrador de paquetes de python:
```bash
sudo apt-get install python-pip
```
<br>

3. Instalar el paquete: virtualenv:
```bash
sudo pip install virtualenv
```
Permite crear ambientes virtuales en diferentes carpetas y podríamos por ejemplo tener distintas versiones de django en cada carpeta.
<br>

4. Si se necesita instalar los paquetes de python dev

```bash
sudo apt-get install python-dev
```
Esto crea ambiente virtual en el directorio "env".

5. Dentro del directorio ejecutamos:
```bash
. env/bin/activate
```
Este comando activa el entorno virutal. Ahora cuando ejecutemos pip, lo estaremos ejecutando dentro de este entorno.

6. Instalamos Django dentro del ambiente
```bash
pip install django
```

Django está instalado!

Si queremos verificar los paquetes instalados dentro del ambiente virtual ejecutamos con el ambiente activado:

```bash
pip freeze
```

Luego con esto se pueden volcar todos los requerimientos del ambiente en un archivo de texto con:
```bash
pip freeze > requirements.txt
```

Lo mismo para cada paquete que instalemos.

Y si quisiéramos compartir un ambiente, luego de descargarlo lo único que tendríamos que hacer es ejecutar estando con el ambiente virtual activado:
```bash
pip install -r requirements.txt
```
