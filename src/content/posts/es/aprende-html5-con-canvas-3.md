---
lang: es
type: "post"
title: "Aprende html5 con canvas haciendo protectores de pantallas (Parte 3)"
author: "Mariano Lambir"
slug: "/aprende-html-5-con-canvas-3"
date: "2013-09-27"
image:  ../images/aprende-html-3.png
imageCredits: "unsplash"
tags: ["Programación"]
---

Para continuar con esta serie de tutoriales sobre HTML5 [Canvas](https://es.wikipedia.org/wiki/Elemento_canvas), vamos a intentar recrear un protector de pantalla clásico de Windows, llamado "mystify your mind". En el siguiente video podemos ver un ejemplo del mismo:

<iframe width="560" height="315" src="https://www.youtube.com/embed/p-howMhFecQ?start=10" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Aunque vamos a tratar de darle un toque mas moderno :).

Para comenzar, partimos desde la misma base que el [tutorial anterior](/post/aprende-html-5-con-canvas-2). Un canvas vacío, de color negro, y por el lado de javascript, la inicialización del canvas  y un "loop" utilizando requestAnimationFrame.

<iframe width="100%" height="330" src="https://jsfiddle.net/mlambir/rfCRQ/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Analizando un poco el comportamiento del protector de pantallas original, podemos "reducirlo" a una serie de polígonos, con las siguientes características:

- cambian de color con el tiempo
- dejan una "estela" al moverse
- los vértices de los poligonos se mueven en linea recta
- al llegar al borde de la pantalla, los vértices cambian de dirección como si "rebotaran"

<br>

El primer paso que vamos a realizar es generar un polígono y dibujarlo en el canvas. Para poder hacer esto vamos a utilizar un conjunto de métodos y propiedades del contexto de canvas relacionadas al dibujado de "paths". Las mismas son:

```javascript
    //marca el comienzo de nuestro poligono
    context.beginPath(); 
    //mueve la posicion de dibujado, pero sin dibujar
    context.moveTo(x, y);
    //mueve la posicion de dibujado, dibujando
    context.lineTo(x, y);
    // une el ultimo punto con el primero
    context.closePath();
    //una propiedad que contiene el color que queremos usar para dibujar
    context.strokeStyle;
    //realiza el dibujado del path creado con las funciones anteriores
    context.stroke();
```

Como vemos, dibujar un polígono es un poco mas complicado que dibujar un cuadrado, simplemente por el hecho de que hay que definir al polígono antes de poder dibujarlo. Para poder entenderlo un poco mejor, vamos a ver un ejemplo, dibujando un polígono definido arbitrariamente:

<iframe width="100%" height="330" src="https://jsfiddle.net/mlambir/rfCRQ/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Como vemos, dibujar un polígono en javascript no es mucho mas complicado que dibujar una serie de puntos. Asimismo, animar al polígono tampoco sera muy complejo. Al igual que cuando animamos los puntos para el "campo de estrellas", tendremos que guardar la posición de los vértices en un array, y "moverlos" entre frame y frame.

Una diferencia importante a tener en cuenta es que no podemos inferir la dirección del movimiento con solo saber la posición del vértice, por lo cual vamos a tener que guardarla en el mismo array que guardamos las posiciones, y generarla al azar al momento de inicializar el array.

hay varias formas de guardar este dato, podríamos guardar un angulo en grados, o radianes, yo en este caso elegí guardarlo separado en dos componentes, x e y, porque me pareció mas simple para que todos los vértices se muevan a la misma velocidad.

Para generar este dato, usamos el siguiente código:

```javascript
    dir = Math.random() * Math.PI * 2;
    
    // el angulo, en radianes, es un numero entre 0 y 2*pi tomado al azar (entre 0º y 360º)
    dirx = Math.sin(dir);
    diry = Math.cos(dir);
    // usamos las funciones seno y coseno para separar las componentes del angulo
```

usando este método, el código para inicializar el array con los vértices nos quedaría así:

```javascript
    var vertices = [];
    var i;
    
    for (i = 0; i &amp;lt; 7; i++) {
        var dir = Math.random() * Math.PI * 2;
    
        vertices.push({
            &amp;quot;x&amp;quot;: Math.random() * canvas.width,
            &amp;quot;y&amp;quot;: Math.random() * canvas.height,
            &amp;quot;dirx&amp;quot;: Math.sin(dir),
            &amp;quot;diry&amp;quot;: Math.cos(dir)
        });
    }
```

Y si le sumamos el código que dibuja el polígono del array, simplemente cambiando las llamadas sucesivas a lineTo por un for que recorra el array, obtenemos lo siguiente:

<iframe width="100%" height="330" src="https://jsfiddle.net/mlambir/rfCRQ/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Con esto, logramos dibujar un polígono al azar cada vez que recargamos el ejemplo.

Ahora, para animar el movimiento, solo tenemos que mover los vértices entra cada cuadro, utilizando el vector de velocidad que habíamos generado al comienzo, y sin olvidarnos de chequear si los vértices se "escapan" del canvas.

```javascript
    for(i=0 ; i&amp;lt;vertices.length;i++) {
        vertices[i].x = vertices[i].x + vertices[i].dirx * 4;
        vertices[i].y = vertices[i].y + vertices[i].diry * 4;
        
        if(
            vertices[i].x &amp;lt; 0 || 
            vertices[i].x &amp;gt; canvas.width
        ) {
            vertices[i].dirx = - vertices[i].dirx;
        }

        if (
            vertices[i].y &amp;lt; 0 || 
            vertices[i].y &amp;gt; canvas.height
        ) {
            vertices[i].diry = - vertices[i].diry;
        }
    }
```

Acá vemos que lo que hacemos para chequear esta condición es ver si el desplazamiento en x o en y del vértice lo llevaría fuera del canvas (si fuera menor que cero, o mayor que el ancho o el alto respectivamente) y en caso de ser cierto, invertimos la dirección de movimiento en ese componente, logrando así que el vértice rebote contra los bordes de la pantalla.

También agregamos una llamada a la función clearRect del contexto, para que nuestra animación se realice desde 0 en cada cuadro. Con estos cambios logramos el siguiente efecto:

<iframe width="100%" height="330" src="https://jsfiddle.net/mlambir/rfCRQ/3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Ya el protector de pantalla esta bastante avanzado, y el efecto que logramos es muy similar al original... lo que podemos hacer para finalizar el efecto es agregar la "estela" que se genera con el movimiento. Para hacerlo, podemos usar un pequeño truco... en vez de limpiar la pantalla al 100% cada vez que dibujamos, podemos dibujar un cuadrado que ocupe toda la pantalla, pero con un 10% de opacidad... con esto logramos que cada cuadro que dibujamos se mantenga en la pantalla por 10 cuadros, cada vez con menos intensidad.

Para hacer esto, solo llamamos a drawRect, habiendo establecido el fillStyle en rgba(0,0,0,.1), y obtenemos el siguiente resultado:

<iframe width="100%" height="330" src="https://jsfiddle.net/mlambir/rfCRQ/4/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Ya estamos mucho mas cerca del original! Lo único que nos faltaría es poder manejar el color del polígono, pero esto lo vamos a aprovechar para explicar un poco las distintas formas de manejar colores, así que lo dejamos para una próxima edición.

Espero que les haya sido útil, y hasta el próximo tutorial!