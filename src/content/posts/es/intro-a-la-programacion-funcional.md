---
lang: es
type: "post"
title: "Introducción a la Programación Funcional"
author: "Pablo Brudnick"
slug: "/introduccion-a-la-programacion-funcional"
date: "2017-03-22"
image:  ../images/notebook-focus.png
imageCredits: "unsplash"
tags: ["Erlang", "Elixir", "Programación funcional"]
---

En Fiqus tenemos programadores a los que aparte de programar _imperativamente_, nos gusta y nos motiva programar _funcionalmente_.

## ¿Qué es la programación funcional?

Es un paradigma de programación declarativa basado en el uso de funciones matemáticas.

Desmenuzando conceptos…

La programación funcional genera un código _lindo y declarativo_ -se lee y se entiende lo que hace-.

La diferencia entre una función matemática y «función» utilizada en programación imperativa es que esta última mencionada puede tener efectos secundarios (_side-effects_), como cambiar el valor de variables globales o pasadas por referencia. Al eliminar dichos efectos secundarios, en la programación funcional, se puede entender y predecir el funcionamiento de un programa más fácilmente, porque una función que se invoca con los mismos parámetros siempre va a retornar el mismo resultado.

Podemos nombrar algunos lenguajes de programación funcionales que ya tienen buena historia recorrida, como lo son [Haskell](https://www.haskell.org/), [Miranda](https://www.cs.kent.ac.uk/people/staff/dat/miranda/) y [Erlang](https://www.erlang.org/). También algunos más nuevos como lo son [Clojure](https://clojure.org/) y [Elixir](https://elixir-lang.org/).

Vale la pena destacar que algunos lenguajes utilizan _lazy evaluation_, como Haskell y Miranda, donde cada expresión y argumento será evaluado a medida que se necesite, o sea, que algunos argumentos quizás nunca sean evaluados; en cambio otros utilizan _eager evaluation_, como Erlang y la mayoría de los lenguajes imperativos, donde las expresiones y parámetros se evalúan al momento que se asignan.

Describamos algunas de las features más importantes de la programación funcional:

## "Variables" inmutables
"Variables" -entre comillas- porque en realidad en funcional, dichas variables nunca cambian, una vez asignado un valor para una variable, dicho valor no cambia, decimos, es inmutable. Esto trae ventajas, como eliminar posibles errores en nuestros programas por modificaciones de variables fuera de nuestro control. Aparte de tener un test unitario mucho más confiable.

## Pattern matching
Es una herramienta muy potente y clave para la programación funcional. Es muy importante a la hora de definir funciones, favorece el código declarativo y lo que hace es establecer patrones por donde debe seguir el hilo de ejecución.

Por ejemplo:

```erlang
empty([]) -> true;
empty(_) -> false.
```

Esta función en Erlang comprueba si una lista es vacía mediante pattern matching, si lo es devuelve `true`, caso contrario devuelve `false`.

## Recursividad

Se da cuando una función se llama a si misma las veces que sea necesaria para retornar un resultado, siempre con un criterio de paro.

En los lenguajes imperativos es usada sin problemas, pero en los funcionales es pieza fundamental, de hecho en vez de usar los famosos loops imperativos, en funcional se utiliza la _recursividad_. ¿Por qué? Recordemos que las variables son inmutables, lo que descalificaría la chance de usar un loop convencional.

## Concurrencia

Este concepto es importantísimo en el software, y en la programación funcional es una _key_ por sobre la imperativa porque -retomamos- los _side-effects_ son reducidos al mínimo. Al tener múltiples (decenas, cientos, miles, cientos de miles…) procesos/threads en ejecución, el hecho de que nuestras variables sean inmutables y no depender de estados, nos garantiza una concurrencia limpia.


Nos despedimos con un pensamiento «en voz alta»:

¿Será por todo esto que WhatsApp usa Erlang en sus servidores…?