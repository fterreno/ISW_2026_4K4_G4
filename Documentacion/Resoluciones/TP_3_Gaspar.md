como vendedor quiero enviar un formulario de prendras para saber si mis prendas pueden venderse
Criterio de aceptacion:
- Debe indicar cantidad de prendas por categoria, descripcion /
- Puede incluir una foto de no mas de 512 kbytes /
- Si se selecciona la recoleccion por un negocio amigo, debe indicar puntos de recoleccion /
- Debe ingresar un minimo de 10 prendas por formulario /
- Debe enviar un mail de confirmacion al vendedor y a la empresa /
- Debe seleccionar la forma de envio /

Pruebas de usuario:
- Probar registrando 10 prendas con la cantidad de prendras por categoria, descripcion, seleccionando forma de envio valida, enviando un mail de confirmacion (pasa)
- Probar registrar cantidad de prendas invalida (falla)
- Probar cargar una foto mayor a 512 kbytes (falla)
- Probar cargando foto valida (pasa)
- Probar no seleccionar forma de envio (falla)
- Probar seleccionar punto de envio (pasa)

Estimacion: 3

Complejidad:
Esfuerzo:
Incertidumbre:

Como Analista de seleccion quiero seleccionar una prenda para validar aquellas prendras que cumplan con las politicas de venta.
Criterios de aceptacion:
- Debe registrar categoria, marca, seleccion.  /
- Debe registrar estado de prendas seleccionadas (hay que poner cuales estados son). /
- Debe registrar motivo de segunda seleccion a prendras de segunda seleccion seleccionadas. /
- Debe generar un codigo QR unico por prenda el cual visualize los datos de la misma. /
- Debe registrar prendas no seleccionadas y motivo de no seleccion. /
Pruebas de usuario:
- Probar registrar prendra con categoria, marca, seleccionada e indicando su estado de seleccion, generando un QR (pasa)
- Probar registrar motivo de segunda seleccion a prendas de segunda seleccion seleccionadas (pasa)
- Probar no registrar motivo de segunda seleccion a prendas de segunda seleccion seleccionadas (falla)
- Probar no registrando categoria, marca, seleccion y estado de seleccion (falla)
- Probar generar codigo QR valido brindando informacion del producto (pasa)

Estimacion: 5

Complejidad: Medio. No tiene muchas relaciones y no se relaciona directamente con otras partes y hace uso de librerias externas mas alla del QR lo que es lo que aumenta nuestra complejidad de forma considerable.
Esfuerzo: Alto. El ingreso de datos de forma secuencial y repetitivo constituye un esfuerzo elevado por parte del Analista
Incertidumbre: Bajo. No hay desconocimiento a la hora de plantear los datos que deben de ser registrados.

Como Analista de Publicacion quiero generar la propuesta de venta para notificar al vendedor sobre las prendas seleccionadas disponibles para su venta.
Criterios de aceptacion:
- Debe visualizar los datos de la prenda mediante el escaneo de un codigo QR
- Debe cargar hasta 5 fotos con un peso maximo de 1Mb
- Debe registrar nombre de la prenda, pero en kilogramos, precio sugerido, y atributos dinamicos segun la categoria.
- Debe calcularse el precio sugerido en base a una lista de precio por categoria, marca, estacionalidad, y estado de la prenda.
- Puede modificar el precio sugerido de la prenda por un monto positivo.
- Debe notificar al vendedor por mail.
- La propuesta debe contener fecha y cantidad de prendas, el listado de todas las prendas seleccionadas y la ganancia que obtendrá al venderse,
     también el listado de todas las prendas que no quedaron seleccionadas. 
Pruebas de Usuario:
- Probar consultar los datos mediante el escaneo del codigo QR (pasa)
- Probar cargar hasta 5 fotos con un peso de 1Mb (pasa)
- Probar cargar mas de 5 fotos con un peso mayor a 1Mb (falla)
- Probar cargando nombre de la prenda, peso en kiloframos, precio sugerido y atributos dinamicos. (pasa)
- Probar modificar el precio sugerido (pasa)

Estimacion: 8

Justificacion: Contamos con la lectura y la desencriptacion de un Codigo QR, una notificacion via mail, y un algoritmo de calculo de precio sugerido el cual debe de obtenerse en base a un listado de precios que contamos en la base de datos. Se requiere el ingreso de distintos datos como las fotos, nombre de la prenda, peso, precio, y los demas atributos dinamicos segun la categoria, ademas debe de completarse la propuesta con todos estos datos anteriores. Son muchas funcionalidades distintas (envio de mail, lectura de QR, carga de fotos y carga de datos mediante formulario). No se como se implementa la lectura y desencriptacion de un codigo QR. Y no se sabe como se calcula en especifico el algoritmo de calculo de costos.
