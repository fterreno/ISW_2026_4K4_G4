Como titular quiero poder **registrar** **mis tipos de gastos** para poder mantener un registro de mis gastos.



Como titular de cuenta quiero poder **iniciar sesion** para mantener un historial de gastos guardados en mi usuario



Como titular quiero **visualizar** todos los gastos del mes en curso ordenados desde el gasto mas actual 



\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Como titular quiero registrar gasto para mantener un control de mis gastos 



Criterios de aceptacion:

&#x09;- Se debe indicar monto, tipo de gasto, fecha, si el gasto es propio o no.

&#x09;- Se puede modificar fecha por una anterior a la actual.

&#x09;- Se debe autocompletar con los datos del usuario logueado.

&#x09;- Se puede modificar el responsable del gasto.

&#x09;- Se debe autocompletar con la fecha actual.

Pruebas de usuario:

&#x09;- Registrar datos indicando monto positivo, fecha, responsable (Pasa)

&#x09;- Modificar responsable y fecha (Pasa)

&#x09;- Registrar datos indicando monto negativo (Falla)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_



##### Roles que podrian ser:

titular, titular de cuenta, familiar



* Usuario es muy generico, mejor si lo evitamos





##### User Stories que podrian ser:

Consultar, visualizar, registrar usuario, registrar dato, registrar tipo de gasto, registrar gasto, modificar gasto, iniciar session, filtrar gasto, registrar titular o responsable de gastos, cerrar sesion,



* Modificar un solo gasto no seria una user Storie, deberia ser modificar gastos
* Si tenemos un "y" probablemente haya dos user stories
* No deberiamos dividir filtrar por algo, filtrar por otra cosa, debe ser solo filtrar(lo demas va en criterios de aceptacion)

