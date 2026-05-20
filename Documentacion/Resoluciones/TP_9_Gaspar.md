

||Entradas||
|-|-|-|
|Condiciones Externas|CE validas|CE Invalidas|
|Fecha |1. Formato valido de dd/mm/aaaa Valor >= dia actual valor = dia en que esta abierto el parque|4. formato invalido<br />5. valor < dia actual<br />6. valor distinto a parque habilitado<br />fecha nula|
|Cantidad|7. valor > 0 y valor <= 10|9. valor < 0 <br />10. valor > 11<br />valor nulo|
|Edad|11. valor >= 1 y valor <= 120|13. valor < 0<br />14. valor > 120<br />valor nulo|
||||
|Forma de pago|17. Efectivo<br />18. Mercado Pago|18. forma de pago invalida|
|Tipo de pase|19. Vip<br />20. Regular|20. Formato invalido|
|Usuario|21. Usuario logueado con perfil cliente|Usuario logueado sin perfil cliente<br />No esta registrado|



||Salida||
|-|-|-|
|Condiciones Externas|CE Validas|CE Invalidas|
|Mail de confirmacion|23. mail enviado al usuario con la fecha de visita, la cantidad de entradas, edad de cada visitante y tipo de pase||
|Mensaje de Confirmacion|24. Informar la fecha de visita, la cantiadad de entradas.|No informa los datos pertinentes|
|Errores||No ingresa fecha<br />No ingresa cantidad de entrada<br />Ingresa cantidad de entrada menor o igual  a 0<br />No ingresa edad<br />Ingresa edad invalida<br />Ingresa tipo de pase invalido<br />No ingresa tipo de pase<br />Forma de pago distinto a efectivo o tarjeta<br />fecha invalida<br />|
|Redireccion a Mercado pago|25. Redireccion a mercado pago para obtener los datos de la tarjeta|No se redirecciono a mercado pago|
|Monto|26. Monto total a pagar||
||||
||||
||||









|Numero|Prioridad|Nombre|Clases de Eq |Precondiciones|Pasos|Resultado esperado|
|-|-|-|-|-|-|-|
|1|alta|Comprar entrada con mercadopago|1,7,11,18,19,21,23,24,25,26|- Usuario "Gaspar" lgueado con permisos de cliente<br />- Tarjeta cargada en mercadopago<br />-Dias en los que el parque va a estar abierto siendo estos de martes 18/5/2026 a domingo 23/5/2026<br />- Tipo de pases cargados siendo este el VIP.<br />- Usuario con mail cargado "gaspar@gmail.com"|1. Gaspar selecciona la opcion de comprar entrada<br />2. Ingresa la fecha 18/5/2026, con una cantidad de 1 entrada, la edad de 1, tipo de pase VIP. <br />3. Selecciona confirmar<br />4. Se selecciona forma de pago en mercado pago.<br />5. Es redirigido a mercado pago<br />7. Confirma la compra<br />|6. Se muestra el monto total.<br />8. Se envia el mail a "gaspar@gmail.com" con la fecha 18/5/2026, 1 entrada, edad de la persona de la entrada 1, tipo de pase VIP, forma de pago mercadopago.<br />9. Se muestra la fecha de visita y la cantidad de entradas|
||||||||



