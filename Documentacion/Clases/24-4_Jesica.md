Las estimaciones se vuelven mas precisas a medida que se baja de nivel. 



### Planificacion de estrategia

NO habla sobre a donde quiero llegar con el producto.

Tener en cuenta mercado, client y posicionamiento



##### Planificacion de portfolio

Define en que producto o iniciativas invertir

BUsca maximizar valor del negocio



##### Planificacion de producto

Traduce la estrategia en una vision concreta del producto.
Es una solucion concreta que genera valor al usuario.

Participan po, stakeolders y equipo



Se parte de una idea inicial y se definen recursos y restricciones. Se genera vision, backlog priorizado y roadmap. Permite organizar entregas futuras



##### Planificacion de release

Define que funcionalidades se entregarian en un periodo 

Inputs: backlogs vision, velocidad del equipo.

Outputs: plan de release (que y cuando)



Diferencia de producto y release

* El prodcuto tenemos los interesadps. Tenemos recursos y fechas, el acuerdo de confidencialidad. vision, roadmap
* Release clientes externos otros tipos de proveedores, resursos humanos no estan dentro.



##### Planificacion de Iteracion o del sprint





###### Cadencia de los sprints

Define cada cuanto se entrega valor. Mas frecuencia= mas feedback y adaptacion. 





# Estimaciones US - practico

Canonica:e tiene menor grado de incertidumbre, la vamos a dejar como 1 o 2 como mucho. La vamos a usar de referencia para comparar.



Tanto el desarrollo como las estimaciones se hacen completo.



Todo depende de la justificacion que le demos a las estimaciones. Tienen que estar Los 3 aspectos de esfuerzo, complejidad e Incertidumbre.







###### Comprar entrada

Estimacion: 3,8,5,o 13

13 es demasiado para esta us, es dificil que pueda entrar en una sprint. Se evita para una estimacion 



Siempre q podemos seguir preguntandonos sobre para que en una US entonces esta incompleta o no es clara



###### Visualizar mapa en tiempo real

Estimacion: 5,8

8 quizas por la incertidumbre.



---

### Recircula tus prendas

H0: Existe un gente interesada en vender de ropa de segunda mano en una pagina web. 



Comprar y vender esta mal, porque no sabemos si hay gente dispuesta a vender. Queremos probar la hipotesis



Roles>

Vendedor
Analista de seleccion
&#x09;Analista de publicacion  
&#x09;Administrador (no en el mvp, si en la aplicacion)  
&#x09;Comprador (en el mvp no seria rol, pero si de la aplicacion)  
&#x09;



Vendedor:

&#x20;registrar usuario  (en el mvp podemos quitar iniciar session con google pero para describirla completa si debe estar)  
&#x20;enviar formulario de prendas a enviar -   
&#x20;ver listado de prendas seleccionadas   
&#x20;ver listado de prendas no seleccionadas  
&#x20;consultar ficha de prendas en venta  
&#x20;confirmar prendas a vender  



Analista de seleccion

&#x20;seleccionar prenda -   
&#x20;generar propuesta de venta -  
&#x20;





Comprador (mal todo esto)

&#x20;comprar prendas  
&#x20;visualizar prendas  
&#x20;aplicar filtros  
&#x20;registrar una devolucion   
&#x20;registrar usuario  
&#x20;iniciar session  
&#x20;visualizar   



&#x20;Como justificas? como sepamos, debe ser una justificacion con nuestras palabras 

&#x20;
---
#### Canonica  
Estimacion: 2  
Como vendedor quiero enviar un formulario de prendas para poner las prendas a la venta  
Criterios de aceptacion:  
* Debe cargar cant prendas por categoria
* Debe seleccionar categoria de prenda
* Debe cargar una descripcion de cada prenda
* Poder cargar una foto por prenda
* Debe elegir forma de envio
* Debe poder confirmarse el envio
* Debe enviar un minimo de 10 prendas
* Debe autocompletarse con datos de usuario logueado
    
Pruebas de usuario:
* Probar ingresar todos los campos obligatorios (pasa)
* Probar no ingresar cant de prendas (falla)
* Probar cargar una foto de 512kb (pasa)
* Probar cargar menos de 10 prendas (falla)

---
Clasificacion 2  
Como Analista de Seleccion quiero Seleccionar prenda para clasificarla   
Criterios de aceptacion:  
* Debe  

Prueba de usuario:  

---
Estimacion: 3  
Como Analista de Seleccion quiero generar propuesta de venta para notificar a vendedor  
Criterios de aceptacion:  
* Debe cargar fecha
* Debe cargar cantidad de prendas
* Debe contener listado de todas las prendas seleccionadas y no seleccionadas
* Debe enviarse un mail automatico a vendedor

Prueba de usuario:
* Probar cargar todos los datos obligatorios (pasa)
* Probar no ingresar fecha (falla)
* 