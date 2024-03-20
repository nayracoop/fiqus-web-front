---
lang: es
type: "post"
title: "No me acordaba que existía hasta que lo vi!"
author: "Martin Vallone"
slug: "/no-me-acordaba-que-existia"
date: "2013-09-10"
image:  ../images/no-me-acordaba-que-existia.png
imageCredits: "unsplash"
tags: ["Programación", "Útiles"]
---

El post de hoy trata sobre javascript y jQuery; tal como dijimos en el título, vamos a ver funciones que generalmente están a mano y no usamos por estar acostumbrados a otras, o que alguna vez usamos pero por alguna razón no nos quedó en la ram de la cabeza para próximos usos.
La idea de este post es darte a conocer funciones de [jQuery](http://jquery.com/) para usar de ahora en adelante!

### grep
## function(elementoDelArray, indiceEnArray):array

Nos devuelve un array con la función filtro aplicada.
Este método borra elementos del array que no cumplan con la condición de la función filtro.
La función filtro recibe 2 parámetros: el elemento corriente del array (el que se está "usando" en la iteración) y su índice. La función filtro devuelve "true" para incluir el item que está analizando en el array resultante.

<iframe src="http://jsfiddle.net/9gq6q/embedded/" width="100%" height="300" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

### makeArray
## function(objeto):array

Convierte un objeto (convertible a array) en un array nativo de javascript. La ventaja de esta función es que devuelve un array nativo de js y no un objeto array-like que no permite el uso de algunas funciones propias del objeto en cuestión como .pop() o .reverse()

<iframe src="http://jsfiddle.net/9gq6q/1/embedded/" width="100%" height="300" frameborder="0" allowfullscreen="allowfullscreen"></iframe>


### noop
## function()

Podés usar esta función vacía cuando querés pasar como parámetro una función que no hace nada (si! no hace nada!). Es útil para quienes escriben plugins (por ejemplo) que ofrecen callbacks opcionales, para el caso en que no se quiere devolver ninguna función. Si tenés una función que acepta una función como parámetro y no querés pasarle nada como parámetro, podés pasar la función $.noop en lugar de pasar function(){}; de esta manera no se crea una nueva instancia de función (salvando memoria). Si te quedan dudas podés pasar por nuestro querido [StackOverflow](http://stackoverflow.com/questions/2069345/what-real-purpose-does-noop-serve-in-jquery-1-4)

### unique
## function(array):array

Esta función busca en el array de objetos, ordena el array y remueve los elementos duplicados. Un elemento es considerado duplicado si existe en el array un elemento exactamente igual (no es válido si tiene atributos iguales pero son elementos diferentes). Aclaración! esta función sólo funciona con arrays de elementos del [DOM](http://es.wikipedia.org/wiki/Document_Object_Model).

<iframe src="http://jsfiddle.net/bmCAR/1/embedded/" width="100%" height="300" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

## Caso vivido para que tengan en cuenta
Si ejecutamos el método html() de un selector y el html a insertar (en el selector) tiene atributos que no son "nativos" del selector que tiene el html, entonces no serán insertados!
Para verlo más claro, veamos un ejemplo:
Si quisieramos ejecutar:

```javascript
    $('#div').html(&quot;&lt;span value=&quot;5&quot; class=&quot;ui-div&quot;&gt;Hello world!&lt;/span&gt;&quot;);
```

Al ejecutar el método html del selector:

```javascript
    $('#div').html() //getter del html
```

Obtendremos como resultado un código como el siguiente:

```javascript
    &quot;&lt;span class=&quot;ui-div&quot;&gt;Hello world!&lt;/span&gt;&quot;
```

Como se puede ver, el atributo "value" desapareció por no ser nativo del elemento span.

Saludos y hasta la próxima!