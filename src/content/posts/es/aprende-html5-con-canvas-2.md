---
lang: es
type: "post"
title: "Aprende html5 con canvas haciendo protectores de pantallas (Parte 2)"
author: "Mariano Lambir"
slug: "/aprende-html-5-con-canvas-2"
date: "2013-05-27"
image:  ../images/aprende-html-2.png
imageCredits: "unsplash"
tags: ["Programación"]
---

Continuamos con esta serie de Tutoriales sobre HTML5 y Canvas. En la primera parte aprendimos como dibujar cuadrados en el canvas (la pueden ver [aquí](/post/aprende-html-5-con-canvas-1)). En esta parte vamos a ver como podemos animar estos cuadrados.

En general, lo que se hace para hacer animaciones es utilizar un loop que realice dos funciones. Actualizar el estado, y dibujar.

Para lograr esto podríamos usar un simple "while", pero en javascript, la mejor forma de hacer este loop es utilizando la función requestAnimationFrame, que recibe como parámetro una función, y la llama ni bien el navegador esta disponible para dibujar.

Para poder usar esta funcion, antes tenemos que agregar el siguiente código:

```javascript
    (function() {
        var requestAnimationFrame = window.requestAnimationFrame || 
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || 
            window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();
```

Esto es porque cada navegador llama a la funcion requestAnimationFrame de distinto modo.

Veamos como quedaría nuestro código si dibujamos repetidamente usando requestAnimationFrame

<iframe width="100%" height="330" src="https://jsfiddle.net/YcmUV/9/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Como se ve en el fiddle, agregamos todo el dibujado a una función  llamada "draw", y la llamamos usando requestAnimationFrame. También vale la pena aclarar que requestAnimationFrame solo llama a nuestra función una vez, por eso agregamos otra llamada al final de "draw".

Otro agregado que hicimos es la llamada a

```javascript
    ctx.clearRect(0, 0, canvas.width, canvas.height);
```

que lo que hace es "borrar" un rectángulo (en nuestro caso, el rectángulo se corresponde al canvas entero). Si omitiéramos esta linea, cada "frame" de nuestra animación se superpondría con el anterior.

El problema que tenemos ahora es que nuestro código solo dibuja estrellas al azar. Lo que necesitamos es mantener un estado, o sea, guardarnos la posición de las estrellas, y actualizarla antes de dibujar cada frame.

Al agregar un paso de "inicialización", donde guardamos la posición de nuestras estrellas en un array, y un paso de "actualización" de estas posiciones, el código queda de la siguiente forma:

<iframe width="100%" height="330" src="https://jsfiddle.net/YcmUV/10/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

En esta nueva versión del código se pueden ver diferenciadas las tres "etapas", inicialización, actualización y dibujado.

En la etapa de inicialización  llenamos un array con posiciones (x e y) generadas al azar, de la misma forma que generábamos la posición de las estrellas anteriormente.

En la etapa de actualización movemos las estrellas, sumándole a su posición el 10% de su distancia al centro del canvas. Esto hace que  las estrellas se muevan con mayor velocidad mientras mas lejos estén del centro.

En la etapa de dibujado simplemente limpiamos la pantalla usando clearRect, y dibujamos un cuadrado blanco como lo veníamos haciendo, en cada una de las posiciones que tenemos guardadas en nuestro array.

Con estos cambios podemos ver que el dibujado y la animación se ven muy similares a los originales... el único problema es que una vez que las estrellas se van de la pantalla, nos quedamos sin nada que dibujar (en realidad, el código sigue corriendo e intentando dibujar, pero como las estrellas están fuera del canvas no puede mostrar nada).

Para solucionar esto, lo que podemos hacer es agregar una validación a la sección de actualización  y chequear cuando una estrella esta fuera de la pantalla. Cuando esto suceda podemos cambiar su posición a una dentro de la pantalla, y asi el ciclo de estrellas va a ser infinito.

Veamos como quedaría esto:

<iframe width="100%" height="330" src="https://jsfiddle.net/YcmUV/11/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Como se puede ver, lo único que hicimos fue chequear que la posición en x sea mayor que 0 y menor que el ancho del canvas, y que la posición en y sea mayor que 0 y menor que el alto del canvas. En caso contrario le asignamos una nueva posición al azar a la estrella.

Con este ultimo cambio, nuestro protector de pantalla esta terminado, logramos imitar al campo de estrellas, y aprendimos a usar algunas funciones de javascript en el proceso.

Esperamos que les haya servido. Dejanos tu comentario, y hasta la próxima!