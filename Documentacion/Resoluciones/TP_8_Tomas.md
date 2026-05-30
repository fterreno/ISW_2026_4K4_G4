## &#x09;		     Entrada

|Condicion Externa|Clase de Equivalencia valida|Clase de Equivalencia invalida|
|-|-|-|
|Estado del taxi|1.libre<br />2.Solicitado<br />3.Ocupado<br />4.fuera de sevicio|5.Cualquier otro estado (o no poner nada ya que el usuario no lo puede forzar)|
|Localizacion del taxi|6. que este habilitado|7.desabilitado|
|pocisionamiento del mouse|8.posicion del mouse sobre el taxi||
|Barrio|9.Brrio existente|10.Barrio inexistente|
|Patente|11.Patente valida<br />XX-000-XX<br />12.Patente valida<br />XXX-000|13.Patente con formato invalido<br />14.patente inexistente|
|Usuario logueado|15.Rol de Admin|16.Cualquir otro Rol|



## &#x09;		     Salida

|CE|CE valida|CE invalida|
|-|-|-|
|taxi ocupado|informacion del pasajero<br />Estado del taxi (colores)<br />Muestra precio, fecha y hora||
|colores estado|verde,amarillo,rojo,negro||
|taxi solicitado|muestra los datos del pasajero||
|Errores||20.sistema desactivado<br />21.taxi inexistente<br />22.formato de patente invalida<br />23.patente inexistente<br />24.No se tiene los permisos de usuario<br />25.Barrio inexistente<br />|

|Numero|Prioridad|Nombre|Clses de Eq|Precondiciones|Pasos|Resultado esperado|
|-|-|-|-|-|-|-|
|1|Alta|Ver taxis con estado libre P/barrio existente|1,6,8,9,12,15,18,25|-el ususario "moria casan" tiene permiso de administrador<br />-Sistema de localizacion encendido<br />y con resultado en la ciudad de cordoba<br />-barrio 'alberdi' cargado en el sistema<br />-Taxi libre cargado en el sistema con patente XXX-000 conectado en el sistema de localizacion en 'Alberdi'<br />-Estado libre|1.El usuario MC seleciona ver mapa<br />2.MC seleciona el barrio 'Alberdi'<br />3.MC seleciona el estado libre<br />4.MC confirma la busqueda|4.Se muestra el mapa indique el taxi libre con un icono ver y su informacion: patente,pintura, modelo,  marca.|
|2|baja|visualizar en barrio inexistente|2,6,10,11,15,21|-el ususario "moria casan" tiene permiso de administrador<br />-Sistema de localizacion encendido<br />y con resultado en la ciudad de cordoba<br />-barrio 'alberdi' cargado en el sistema<br />-Taxi solicitado cargado en el sistema con patente XX-000-XX conectado en el sistema de localizacion en 'Alberdi'<br />-Pasajero 'sALVA' solicito el taxi XX-000-XX|1.El usuario MC seleciona ver mapa<br />2.MC seleciona el barrio 'San Carlos'<br />3.MC seleciona el estado SOLICITADO<br />4.MC confirma la busqueda|4.El sistema muestra un mensaje de barrio inexistente|
||||||||
||||||||



