---
lang: es
type: "post"
title: "Instalando Erlang y Elixir con asdf"
author: "Pablo Brudnick"
slug: "/instalando-earlang-y-elixir-con-asdf"
date: "2018-02-26"
image:  ../images/instalar-elixir-con-asdf.jpg
imageCredits: "Créditos de imagen unsplash"
tags: ["Elixir", "Phoenix"]
---

Vamos a mostrarles como instalamos [Erlang](https://www.erlang.org/) y [Elixir](https://elixir-lang.org/) en Fiqus.

Elixir es un lenguaje funcional dinámico, distribuido y tolerante a fallas que viene teniendo un gran crecimiento en los últimos años y en Fiqus comenzamos a adoptarlo como una de nuestras principales tecnologías.

Para utilizar Elixir es necesario tener instalado Erlang, ya que corre sobre su máquina virtual (Erlang VM/BEAM) el código compilado a beam.

La forma más tradicional de instalación está más que clara en la [guía de instalación de Elixir](https://elixir-lang.org/install.html), pero nosotros recomendamos utilizar un Version Manager llamado [asdf](https://github.com/asdf-vm/), que además de estas tecnologías, tiene una amplia gama de [plugins](https://github.com/asdf-vm/asdf-plugins) para manejo de muchas otras.
La gran ventaja de utilizar un manejador de versiones es que podemos instalar más de una versión en nuestro sistema y cambiar libremente entre ellas para el proyecto que lo requiera.

Entonces, arrancamos:

1. Instalamos asdf como dice aquí:
https://github.com/asdf-vm/asdf#setup

No olvidar instalar las dependencias que dice abajo, por ejemplo para Ubuntu:

```
automake autoconf libreadline-dev libncurses-dev libssl-dev libyaml-dev libxslt-dev libffi-dev libtool unixodbc-dev
```

_Si no tenemos autotools se pueden instalar con apt._

2. Luego agregamos plugin de Erlang y de Elixir:

```
asdf plugin-add erlang
```

```
asdf plugin-add elixir
```
<br />

3. Instalamos las versiones deseadas de cada lenguaje:

```
asdf install erlang 20.0
```

```
asdf install elixir 1.6.1
```

Las versiones al momento de escribir este post.

4. Seteamos global o localmente la versión deseada

```
asdf global erlang 20.0
```

```
asdf global elixir 1.6.1
```

Para validar que funcionan podemos luego en una consola escribir:
`erl` (para Erlang) y `iex` (para Elixir)

También podemos instalar [rebar3](https://www.rebar3.org/), el administrador de paquetes de Erlang de la misma manera:

```
asdf plugin-add rebar
asdf install rebar 3.4.7
asdf global rebar 3.4.7
```