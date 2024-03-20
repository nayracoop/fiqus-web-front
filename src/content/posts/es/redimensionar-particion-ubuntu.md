---
lang: es
type: "post"
title: "Redimensionar partición de ubuntu con bloques defectuosos"
author: "FIQUS"
slug: "/redimensionar-particion-de-ubuntu-con-bloques-defectuosos"
date: "2013-06-10"
image:  ../images/experiencia-de-intercooperacion-header.jpg
imageCredits: "Créditos de imagen unsplash"
tags: ["badblocks", "gparted","ubuntu"]
---


Hace poco me encontré con la necesidad de agrandar mi partición de Ubuntu, ante esto inicié sesión con el live cd de Ubuntu, abrí la aplicación [gparted](http://es.wikipedia.org/wiki/GParted), hice un swapoff de la partición swap de Ubuntu y como contaba con espacio libre antes de la partición ext4 de ubuntu intenté redimensionar la partición hacia la izquierda. El proceso iba bien hasta que en cierto momento me encontré con el siguiente error:

```bash
Error while reading block at sector xxx
```
<br>
Ante este error de lectura ejecuté el siguiente comando para obtener todos los bloques defectuosos:

```bash
sudo badblocks -sv -b 512 /dev/sda 
```
<br>
Luego de un par de horas esta fue la salida:


```bash
Checking blocks 0 to 1465149167
Checking for bad blocks (read-only test):   0.00% done, 0:00 elapsed. (0/0/0 err1383265512ne, 2:25:19 elapsed. (0/0/0 errors)
1383265513ne, 2:25:23 elapsed. (1/0/0 errors)
1383265514ne, 2:25:27 elapsed. (2/0/0 errors)
1383265515ne, 2:25:31 elapsed. (3/0/0 errors)
1383265516ne, 2:25:34 elapsed. (4/0/0 errors)
1383265517ne, 2:25:38 elapsed. (5/0/0 errors)
1383265518ne, 2:25:42 elapsed. (6/0/0 errors)
1383265519ne, 2:25:46 elapsed. (7/0/0 errors)
done                          
                       
Pass completed, 8 bad blocks found. (8/0/0 errors)
```
<br>

>Algo adicional para verificar el estado del disco rígido es utilizando "disk utility" y corriendo "SMART data".
Para poder continuar con el proceso de redimensionar la partición, lo que se puede hacer es verificar que la lectura de cada bloque falle y asegurarnos de que es un bloque defectuoso:

```bash
sudo dd if=/dev/sda of=/dev/null iflag=direct bs=512 skip=numero_de_bloque count=1 
```
<br>
Para luego intentar escribir el bloque con ceros:

```bash
sudo dd if=/dev/zero of=/dev/sda oflag=direct bs=512 seek=numero_de_bloque count=1
```

Luego de hacer esto con todos los bloques defectuosos, y obteniendo los resultados esperados, podemos volver a intentar redimensionar la partición con gparted y esta vez no deberíamos obtener el error de lectura en el sector.