---
lang: es
type: "post"
title: "Lo que nos dejó la PyConAr 2015"
author: "Pablo Brudnick"
slug: "/lo-que-nos-dejo-la-pyconar-2015"
date: "2019-11-25"
image:  ../images/fiquspycon2015.png
imageCredits: "Créditos de imagen unsplash"
tags: ["Python","Django"]
---


Desde Fiqus viajamos a Mendoza en noviembre para asistir al evento de Python más importante del año en Argentina, la [PyCon](http://ar.pycon.org/).
La misma se organizó en diferentes charlas y talleres a lo largo de tres días con mucha oferta de temas para participar.
La idea de este post es hacer una suerte de resumen y tips importantes de las charlas a las que asistimos.

## DÍA 1

Se hizo a lo largo de todo el dia el taller “DjangoGirls”, orientado a introducción a la programación en Python y Django para mujeres, pero también fueron bienvenidos los hombres. A su vez por otro lado se hicieron *Hackatons* y otras charlas de “Python para iniciantes” a las que no asistimos.

## DÍA 2

**Practical OpenCV** (por Diego Ramírez)

http://educabot.org/

Nos mostró su caso de éxito implementando la librería de reconocimiento de imágenes OpenCV para programar robots hechos con Arduino y RaspberryPi para niños. Aparte de ver el código en sí de cómo implementó OpenCV, vimos sus robots andando y como con su cámara reconocían imágenes para interpretar qué movimientos hacer, como así también comandos.

**Encantando PythonES para masticar data** (por Juanjo Ciarlante)

Juanjo nos contó un poco como trabaja con grandes volúmenes de datos, donde tiene que leer y procesar dicha información de forma eficiente. Pasando por arquitecturas, alternativas y centrando la charla en el *mapReduce* con Python.

**Programación asincrónica en Python 3: el futuro ya llegó (por Facundo Batista)**

Esta charla comenzó con una introducción a programación asincrónica, diferencias con multi-threading y como es que funciona el *reactor* (event looper) de python que ya es nativo en python 3. Muy interesante y para seguir investigando!

Para más info, recomendamos el blog de Facundo: http://taniquetil.com.ar/plog/

**Django ORM at Scale!** (por Martín Alderete)

Martín nos dió un pantallazo de *tips* para hacer uso eficiente de accesos a base de datos desde el ORM de Django. Son esos pequeños detalles que hacen a tu aplicación más robusta y rápida.
Podemos destacar select_related() en vez de select() para hacer JOINs en One-to-one FKs. prefetch_related() para Many-to-many, only, defer. Ventajas y desventajas de save() vs. update(), uso de Managers, etc.

Luego en las **Lightning talks** que cerraban cada día (para los que no saben, son charlas de 5 minutos donde se anota el o los que quieran y en el orden en que se anotaron se van dando) hablamos las cooperativas de **FACTTIC** presentes sobre *cooperativismo*, bajo el título **"El poder del asociativismo"**.

El día lo cerró Ashwini Oruganti, directora de la Python Software Foundation con “El futuro de Python: El poder a la comunidad”, fomentando el uso de python, el significado de crecer en comunidad y abrirse a PyCon’s, sprints, etc.

## DÍA 3


**Que extrañé de Python en los últimos 4 lenguajes en los que trabajé** (por Juanjo Conti)

Estuvo basada en mostrar diferencias y similitudes entre lenguajes de programación como PHP, Ruby y algunos otros con Python.

**No es magia: descriptores al desnudo** (por Joaq y Facundo Batista)

Quizás esta fue la charla en la que precisamos aumentar en mayor nivel nuestros *sentidos programáticos* para seguir el código.

Fue muy interesante porque se explicó que son y para qué sirven los descriptores en Python, vimos ejemplos de cómo usarlos y se mostró que realmente el core de Python los utiliza para lograr mayor eficiencia.

Básicamente, un descriptor es un objeto que representa un atributo. Pero como no es tan fácil de entender así nomás, te dejamos el link a la presentación que vale la pena mirarla:

https://docs.google.com/presentation/d/1O88eRdHdPhSsL849aNp1NHcCbnB8cam4bX16LgvYx1U/edit#slide=id.gcdc1a27ef_0_37

**Python meets Selenium: automatizando al usuario** (por Julieta Valentin)

Julieta explicó como hacer tests de automatización web usando la app Selenium. Lo que hace es utilizar el browser y hacer todos los pasos que uno le pide con instrucciones para que “simule” que es el usuario el que lo hace. Es muy útil para cerrar el circuito de tests de un proyecto, cuando uno tiene unittests de los models/views y quiere asegurarse que la UI funciona como uno espera.

**Cacheando fuera de Django** (por Guillermo Narvaja)

En esta charla Guillermo nos mostró diferentes niveles de cache, desde Django (servidor) pasando por Gateway, Proxy y Browser. Ventajas y desventajas de cada uno y algunos casos ejemplo de como las utiliza en [RadioCut.fm](https://radiocut.fm/).

El evento lo cerró Simon Willison, ingeniero de software de Eventbrite mostrando “Migrando a microservicios en Eventbrite”. Explicó el caso de éxito de Eventbrite usando Django y Django REST Framework para las APIs de los microservices y un poco la arquitectura de los mismos.