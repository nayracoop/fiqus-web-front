---
lang: es
type: "post"
title: "Integración continua con Jenkins: Introducción"
author: "Fiqus"
slug: "/integracion-continua-con-jenkins"
date: "2013-05-21"
image:  ../images/integracion-continua-con-jenkins.png
imageCredits: "unsplash"
tags: ["Programación"]
---

Recientemente estuvimos haciendo una implementación de un servidor de integración continua para uno de nuestros clientes. En esta ocasión, nuestro cliente nos pidió un servidor de integración continua para sus proyectos en los que utiliza PHP.

En este artículo se desarrollará un breve resumen de las herramientas utilizadas, su función y su vinculación para alcanzar el objetivo, pero antes de eso, la primera pregunta que aparece es: qué es la integración continua?

La integración continua consiste en hacer integraciones automáticas de un proyecto lo más a menudo posible para así poder detectar fallos cuanto antes. Entendemos por integración a la compilación y ejecución de tests de todo un proyecto.

Ahora sí, pasemos a las herramientas utilizadas:

- [Git](http://git-scm.com/):Git es un software de control de versiones diseñado por Linus Torvalds, pensando en la eficiencia y la confiabilidad del mantenimiento de - versiones de aplicaciones con gran número de archivos de código fuente.
- [Gitolite](http://gitolite.com/gitolite/): Gitolite permite configurar hosting para git en un servidor central con un buen control de acceso sobre grupos y usuarios y otras - excelentes herramientas.
- [PHPUnit](https://github.com/sebastianbergmann/phpunit): PHPUnit es el estándard en unit testing para proyectos en PHP. Por un lado provee un framework para escribir tests facilmente y por el - otro, funcionalidad para correr esos tests y analizar sus resultados.
- [Apache Ant](http://ant.apache.org/): Ant es un software para procesos de automatización de compilación, similar a Make pero desarrollado en lenguaje Java y requiere la - plataforma Java. Usado para la realización de tareas mecánicas y repetitivas.
- [Jenkins](http://jenkins-ci.org/): Jenkins proporciona integración continua para el desarrollo de software. Soporta distintas herramientas de control de versiones como Git y puede ejecutar proyectos basados en Apache Ant por ejemplo.

Luego de conocer la definición de intregación continua y la definición de las herramientas utilizadas creo que nos podemos hacer una idea de como se vincularon. A modo de ejemplo: con gitolite hosteamos un repositorio git, los desarrolladores siempre realizan tests unitarios utilizando phpunit, en el repositorio de git creamos un [hook](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) para que cuando un desarrollador haga 'push' de su código se le avise a Jenkins que debe hacer una compilación de la aplicación, es así que Jenkins invoca a Ant para hacer la compilación, Ant ejecutará los test unitarios y en el caso de que sean exitosos puede, por ejemplo, copiar la versión exitosa a una determinada carpeta. Jenkins tendrá el detalle de lo que subió cada desarrollador, el estado del proyecto, las compilaciones exitosas, las fallidas, etc. Teniendo también, por ejemplo, la posibilidad de ejecutar una compilación desde Jenkins en cualquier momento.

En futuros artículos se ahondará en las configuraciones específicas de las herramientas nombradas anteriormente.