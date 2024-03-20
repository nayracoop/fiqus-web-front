---
lang: es
type: "post"
title: "Aprende html5 con canvas haciendo protectores de pantallas (Parte 1)"
author: "Mariano Lambir"
slug: "/aprende-html-5-con-canvas-1"
date: "2013-05-27"
image:  ../images/aprende-html-1.png
imageCredits: "unsplash"
tags: ["Programación"]
---

En esta serie de posts intentaremos compartir, utilizando como ejemplos distintos protectores de pantalla, el conocimiento necesario para poder dibujar y animar imágenes en una pagina web.

Para probar y mostrar el codigo, vamos a usar la pagina [jsfiddle](http://jsfiddle.net/). Así clickeando en los distintos tabs van a poder ver el css, html y javascript que usamos en cada paso.

En este primer tutorial vamos a imitar a uno de los protectores mas simples, y mas usados en su momento... el conocido "campo de estrellas" de windows (si no lo conocen, pueden ver un video del mismo en [youtube](https://www.youtube.com/watch?v=n3n3m2B0KFo)).

Vamos directo al código.

<iframe width="100%" height="330" src="http://jsfiddle.net/mlambir/YcmUV/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Para este primer paso, creamos una pagina html básica, con un `<body>` y un `<canvas>` dentro del mismo. El canvas tiene como id "canvas" y las propiedades "width" y "height" establecidas.

En la pestaña css solo le establecimos el color de fondo negro a nuestro canvas, para usarlo como fondo del campo de estrellas.

En la pestaña de javascript utilizamos el método getElementById para obtener al canvas, y usamos el metodo getContext del mismo para traer el contexto '2d'. Este objeto será el que usemos a lo largo del tutorial para realizar todo lo referente a dibujado en el canvas.

Si vamos a la pestaña "result" vamos a ver que tenemos un cuadrado negro... nada muy emocionante, pero es el principio de nuestro campo de estrellas. Igualmente antes de correr hay que caminar, así que antes de dibujar un campo de estrellas, vamos a dibujar una estrella.

En nuestro protector de pantalla, las estrellas son representadas por cuadrados blancos. En el contexto 2d hay métodos dedicados a dibujar rectángulos: fillRect y strokeRect (llenar rectángulo y trazar rectangulo, respectivamente). Como nuestras estrellas son rectángulos "llenos" vamos a dibujarlas utilizando fillRect.

El método fillrect recibe 4 parámetros: X, Y, Alto y Ancho.

Entonces, para dibujar una "estrella" de 2x2 a 30 pixeles de distancia de cada lado usamos el siguiente método:

```javascript
    ctx.fillRect(30, 30, 2, 2);
```

<br>

Si agregamos este código a nuestra pagina, vamos a ver que nada sucede... Esto es porque antes de poder dibujar algo en un canvas debemos decirle "como" queremos que lo dibuje. En este caso lo que nos falto fue modificar la propiedad fillStyle del contexto, que lo que establece es el color con el que se realizará el fillRect. Entonces, el código que debemos agregar queda de la siguiente forma:

```javascript
    //para que pinte nuestro rectangulo de blanco
    ctx.fillStyle = &amp;amp;quot;white&amp;amp;quot;; 
    ctx.fillRect(30, 30, 2, 2);
```

<br>

Y ahora si, usando jsfiddle podemos ver nuestra primera estrella

<iframe width="100%" height="330" src="https://jsfiddle.net/mlambir/YcmUV/3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<br>

Imponente no? pero una solitaria estrella no es lo que teníamos en mente cuando comenzamos este tutorial, así que veamos como podemos hacer para dibujar mas.

Para esto, declaramos una variable N_STARS en la que guardamos la cantidad de estrellas que queremos dibujar, y una variable STAR_SIZE, en la que guardamos el alto y ancho de cada estrella.

Luego, en vez de dibujar una estrella, utilizamos un for y dibujamos 100 estrellas, pero para cada una de ellas generamos una posición al azar, utilizando el método Math.random, que nos devuelve un numero al azar, y multiplicándolo por el ancho y el alto del canvas (canvas.width y canvas.height respectivamente). Esto nos da una posición dentro de nuestro canvas.

En el siguiente fiddle podemos ver el resultado:

<iframe width="100%" height="330" src="https://jsfiddle.net/mlambir/YcmUV/4/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Ya estamos mucho mas cerca del resultado deseado, aunque todavía nos queda lograr que nuestras estrellas se muevan hacia nosotros, pero ya nos estamos extendiendo demasiado, asi que las animaciones las dejamos para el próximo post.

Esperamos que les haya servido. Dejanos tu comentario, y hasta la próxima!