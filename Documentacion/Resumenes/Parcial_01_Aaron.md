---
materia: Ingeniería y Calidad de Software
unidad: -
fecha: 04/05/2026
concepto: Teórico / Práctico
tema_principal: Guía de Resolución — 1er Parcial
---

## Contexto

Guía de resolución para el 1er Parcial de Ingeniería y Calidad de Software (UTN FRC).  
Extrae y generaliza todas las actividades identificadas en parciales reales, organizando cada pregunta con su fundamento teórico, variantes posibles y respuesta modelo.  
El material se basa en los resúmenes teóricos de la cátedra (SCM, Filosofía Ágil, User Stories, Estimaciones, Gestión de Productos, Componentes de Proyecto y Planificación en Scrum).

---

## Pendientes

<!-- Temas o subtemas a agregar en un futuro -->

---

## Desarrollo

### Índice

1. [Ciclo de vida del proyecto](#1-ciclo-de-vida-del-proyecto)
2. [Plan de entregas, desvíos y cambios de requerimientos](#2-plan-de-entregas-desvíos-y-cambios-de-requerimientos)
3. [Estimaciones](#3-estimaciones)
4. [Repositorio e ítems de configuración](#4-repositorio-e-ítems-de-configuración)
5. [Ciclo de vida del proyecto vs. ciclo de vida del producto](#5-ciclo-de-vida-del-proyecto-vs-ciclo-de-vida-del-producto)
6. [Definición del MVP](#6-definición-del-mvp)
7. [User Story con tarjeta completa](#7-user-story-con-tarjeta-completa)
8. [User Story canónica](#8-user-story-canónica)
9. [INVEST, DoR y DoD](#9-invest-dor-y-dod)
10. [Proceso empírico vs. definido: diferencias en una iteración](#10-proceso-empírico-vs-definido-diferencias-en-una-iteración)
11. [Triple restricción y negociación](#11-triple-restricción-y-negociación)
12. [Niveles de granularidad ágil: Tema, Épica, US](#12-niveles-de-granularidad-ágil-tema-épica-us)
13. [Preguntas de opción múltiple teóricas](#13-preguntas-de-opción-múltiple-teóricas)

- [Conceptos Clave](#conceptos-clave)
- [Preguntas de Parcial](#preguntas-de-parcial)
- [Conexiones](#conexiones)

---

### 1. Ciclo de vida del proyecto

**¿Qué pregunta?**  
Describir el ciclo de vida que se utilizará para gestionar el proyecto, justificando la elección.  
La consigna siempre indica si la empresa pide gestión **empírica** (ágil) o **definida** (tradicional); eso condiciona completamente la respuesta.

**Fundamento teórico**

- Un proceso **definido** asume que el mismo proceso puede repetirse obteniendo los mismos resultados;
  el control proviene de la predictibilidad.
- Un proceso **empírico** asume variables cambiantes; el control se ejerce mediante inspecciones
  frecuentes y adaptaciones. Es adecuado para contextos complejos y creativos.
- El ciclo de vida de un proyecto es la serie de pasos a través de los cuales el proyecto progresa:
  puede ser secuencial, iterativo o recursivo.

**Si es proceso empírico → Scrum / ciclo iterativo e incremental**

El ciclo de vida elegido es **iterativo e incremental** gestionado con Scrum. El proyecto se divide en sprints de duración fija (típicamente 1 o 2 semanas).  
Al finalizar cada sprint se produce un incremento potencialmente funcional.  
Los requisitos no se conocen completamente al inicio; el Product Backlog evoluciona sprint a sprint según las prioridades del Product Owner.

Se elige este ciclo porque:

- El cliente puede cambiar prioridades en cualquier momento.
- Se entrega valor temprano y se reduce el riesgo.
- El equipo aprende en cada iteración e inspecciona y adapta continuamente.
- El proceso empírico es adecuado para dominios complejos donde repetir el proceso puede
  dar resultados distintos.

**Si es proceso definido → Cascada / ciclo secuencial**

El ciclo de vida elegido es **secuencial** (cascada). Las fases —Requerimientos, Análisis, Diseño, Implementación, Prueba, Despliegue—
se ejecutan una tras otra sin solapamiento.  
El alcance se define completamente al inicio.

Se elige porque:

- Los requerimientos son estables y bien conocidos desde el comienzo.
- El cliente no necesita ver entregas intermedias.
- La predictibilidad del proceso permite planificar costos y tiempos con mayor precisión.

---

### 2. Plan de entregas, desvíos y cambios de requerimientos

**¿Qué pregunta?**  
En función del ciclo de vida elegido: ¿cómo será el plan de entregas? ¿Cómo se abordan los desvíos? ¿Cómo se manejan los cambios de requerimientos?  
Suele pedirse referenciar la triple restricción.

**Fundamento teórico**

- La **Triple Restricción** balancea Tiempo, Costo y Alcance/Calidad. Modificar uno impacta
  en los otros.
- En gestión **ágil**: tiempo y costo son fijos; el alcance es la variable flexible.
- En gestión **tradicional**: las tres variables se negocian mediante control de cambios formal.

**Si es proceso empírico (Scrum)**

_Plan de entregas:_ se elabora un plan de release que distribuye los ítems del Product Backlog en sprints según la velocidad histórica del equipo.  
Cada sprint produce un entregable funcional. El plan evoluciona con cada sprint.

_Desvíos:_ el tiempo del sprint es fijo (no se extiende). Si el equipo no termina lo planificado, se renegocia el **alcance** del sprint:  
los ítems no completados vuelven al Product Backlog y se re-priorizan para el siguiente sprint.

_Cambios de requerimientos:_ son bienvenidos. El Product Owner puede actualizar, agregar o eliminar ítems del backlog en cualquier momento.  
Los cambios entran en el siguiente sprint, no en el sprint en curso. La triple restricción en ágil opera con tiempo y costo fijos; la variable de ajuste es el alcance.

**Si es proceso definido (Cascada)**

_Plan de entregas:_ se elabora un cronograma (ej. Gantt) con hitos y entregables predefinidos al inicio del proyecto.

_Desvíos:_ se gestionan con un proceso formal de control de cambios: análisis de impacto, replanificación y renegociación con el cliente.  
Impacta sobre tiempo, costo o alcance según se acuerde.

_Cambios de requerimientos:_ requieren una Petición de Cambio formal, evaluación de impacto y aprobación. Una vez aprobados, se actualiza el plan.  
La triple restricción se renegocia: si se amplía el alcance, se extiende el tiempo o se aumenta el costo.

> **Nota — Diagrama de Gantt:** herramienta visual de planificación que muestra las tareas del proyecto como barras horizontales sobre una línea de tiempo.  
> Cada barra representa una tarea, su duración y su posición en el tiempo; las dependencias entre tareas se indican con flechas o solapamientos.  
> Permite ver de un vistazo qué debe hacerse, cuándo y en qué orden, lo que facilita detectar desvíos respecto al plan original.

---

### 3. Estimaciones

**¿Qué pregunta?**  
¿Qué se estimará? ¿Con qué unidad de medida? ¿Quién será responsable?  
¿En qué momento del proyecto se harán las estimaciones?

**Fundamento teórico**

- En ágil se prefiere la **estimación relativa** porque las personas somos malas estimando en términos absolutos pero buenos comparando cosas entre sí.
- El **tamaño** de una story engloba complejidad, esfuerzo (tiempo) e incertidumbre (duda). Tamaño ≠ Esfuerzo.
- Los **Story Points** son la unidad de medida relativa del equipo; combinan complejidad, riesgo (incertidumbre) y esfuerzo.
  Se usan con la escala de Fibonacci (1, 2, 3, 5, 8, 13, 21).
- La **velocidad** es la suma de Story Points de las historias completamente terminadas en un sprint. Las stories parciales no cuentan.
- En tradicional se estima en horas/persona, días o puntos de función.

**Si es proceso empírico (Scrum)**

| Dimensión | Respuesta                                                             |
| --------- | --------------------------------------------------------------------- |
| Qué       | Tamaño de cada User Story / ítem del Product Backlog                  |
| Unidad    | Story Points (escala Fibonacci)                                       |
| Quién     | El equipo de desarrollo completo (mediante Poker Planning)            |
| Cuándo    | En el refinamiento del backlog y en el Sprint Planning de cada sprint |

Cada Story Point representa una combinación de complejidad, riesgo (incertidumbre) y esfuerzo relativo comparado con una story de referencia (story canónica).  
La velocidad histórica del equipo permite proyectar cuántos sprints faltan para completar el backlog.

> **Nota — Planning Poker:** técnica de estimación colaborativa en la que cada miembro del equipo vota de forma simultánea y anónima usando cartas con valores de la escala Fibonacci.  
> Si los votos difieren, quienes eligieron el valor más alto y el más bajo explican su razonamiento; luego se vuelve a votar hasta alcanzar consenso.  
> El anonimato en la votación evita el sesgo de anclaje (que alguien influya al resto antes de que emitan su juicio).

**Si es proceso definido (Tradicional)**

| Dimensión | Respuesta                                                            |
| --------- | -------------------------------------------------------------------- |
| Qué       | Duración de tareas, costo de recursos, tamaño funcional del producto |
| Unidad    | Horas/persona, días, puntos de función                               |
| Quién     | Líder de proyecto junto a expertos de cada área                      |
| Cuándo    | Al inicio, en la fase de planificación; se revisa en cada hito       |

---

### 4. Repositorio e ítems de configuración

**¿Qué pregunta?**  
Definir la estructura del repositorio e identificar al menos 3 ítems de configuración (ICs) que
se administrarán en el proyecto, con su esquema de nombrado.

**Fundamento teórico**

- Un **Ítem de Configuración (IC)** es todo artefacto del proyecto o producto que puede sufrir
  cambios, necesita ser compartido entre los miembros del equipo y sobre el cual se necesita
  conocer su estado y evolución. Los define el equipo.
- El **repositorio** almacena los ICs, mantiene su historia y permite operaciones de check-in /
  check-out.
- Una **Línea Base (Baseline)** es una configuración revisada y acordada formalmente; solo puede cambiarse mediante un procedimiento formal de control de cambios.
- Los ICs se clasifican en: de proyecto (Plan, Cronograma), de iteración (Plan de Sprint, Reporte
  de Defectos) y de producto (ERS, Arquitectura, Código, Manual de Usuario).

**Estructura del repositorio (ejemplo genérico con Git / GitFlow)**

```
/repositorio-proyecto
/src          → código fuente
/docs         → documentación (requerimientos, diseño, actas)
/tests        → casos de prueba
/config       → archivos de configuración de entorno
/releases     → versiones empaquetadas / builds
```

Ramas: `main` (producción), `develop` (integración continua),
`feature/[nombre]`, `hotfix/[nombre]`.

**Esquema de nombrado general:**
`[tipo]-[descripcion]-v[version]-[fecha].[ext]`

**Ítems de configuración (al menos 3, ejemplos genéricos):**

| IC                                | Tipo         | Ejemplo de nombre                   |
| --------------------------------- | ------------ | ----------------------------------- |
| Código fuente                     | De producto  | `modulo-autenticacion-v1.2.java`    |
| Documento de requerimientos (ERS) | De producto  | `ERS-v2.1-2026-05-10.pdf`           |
| Casos de prueba                   | De producto  | `TC-US01-registro-v1.0.xlsx`        |
| Plan de proyecto                  | De proyecto  | `plan-proyecto-v1.0-2026-04-01.pdf` |
| Plan de sprint                    | De iteración | `plan-sprint-03-v1.0-2026-04-15.md` |

> El equipo define qué artefactos son ICs según su relevancia y la necesidad de rastreabilidad.
> No todo artefacto es necesariamente un IC.

---

### 5. Ciclo de vida del proyecto vs Ciclo de vida del producto

**¿Qué pregunta?**  
Explicar la diferencia entre el ciclo de vida del proyecto de software y el ciclo de vida del
producto de software, aplicado al dominio del enunciado.

**Fundamento teórico**

- El **ciclo de vida del proyecto** tiene un inicio y un fin definidos: comienza cuando se decide
  construir el software y termina cuando se entrega. Es temporal y orientado a objetivos.
- El **ciclo de vida del producto** comienza cuando el producto se lanza al mercado y se extiende
  mientras haya usuarios. Pasa por fases de Introducción, Crecimiento, Madurez y Declive.
- Un proyecto puede terminar y el producto continuar evolucionando. Puede haber múltiples
  proyectos a lo largo de la vida de un producto (v1, v2, mantenimiento, etc.).

**Respuesta modelo (genérica, aplicar al dominio)**

El ciclo de vida del **proyecto** abarca desde que la empresa decide construir la primera versión
del producto hasta que se entrega y cierra el proyecto (ej. 6 meses de desarrollo).  
Incluye fases como planificación, desarrollo, pruebas y cierre. Cuando el proyecto termina, el equipo se disuelve o reasigna.

El ciclo de vida del **producto** comienza cuando ese producto se lanza al mercado y puede durar años:
nuevas versiones se desarrollan (cada una como un nuevo proyecto), se hacen correcciones,
se agregan funcionalidades y eventualmente el producto entra en declive y se retira.  
El producto vive más allá de cualquier proyecto individual.

_Ejemplo ilustrativo:_ el proyecto de construir v1.0 de una app de música dura 4 meses (ciclo de vida del proyecto).  
Una vez lanzada, la app puede existir por años con actualizaciones, nuevas features y correcciones (ciclo de vida del producto).  
El primer proyecto termina; el producto continúa.

---

### 6. Definición del MVP

**¿Qué pregunta?**  
Como Product Owner, definir el MVP: identificar qué User Stories lo integran (solo frase verbal) y justificar el alcance incluyendo:  
objetivo del MVP, alcance no contemplado, criterio de selección + hipótesis a probar, listado de US incluidas.

**Fundamento teórico**

- El **MVP** (Minimum Viable Product) es la versión de un nuevo producto que permite recopilar la
  máxima cantidad de aprendizaje validado con el menor esfuerzo (Eric Ries, Lean Startup).
- Un MVP debe: tener valor suficiente para que los usuarios estén dispuestos a usarlo, demostrar
  beneficio futuro para retener a los primeros usuarios y proveer un ciclo de retroalimentación.
- El MVP no es el producto más pequeño posible; es el producto mínimo **viable**: si es de tan
  baja calidad que no permite aprender, no cumple su propósito.
- El MVP valida una **hipótesis**: una suposición sobre si el producto entrega valor real
  (hipótesis de valor) o sobre cómo crecerá (hipótesis de crecimiento).
- El criterio de selección de US para el MVP es incluir solo las funcionalidades que cubren el
  flujo mínimo de valor para el usuario y permiten probar la hipótesis central del negocio.

**a) Identificar las US del MVP (solo frase verbal)**

Listar las frases verbales de las US que cubren el ciclo mínimo de uso. Ejemplo genérico:

- [verbo] [predicado]...
- ...

Solo incluir las imprescindibles para que el producto sea usable y permita validar la hipótesis.

**b) Explicar el alcance: estructura de respuesta**

**i. Objetivo del MVP**  
El objetivo del MVP es validar que [descripción del usuario target] está dispuesto/a a [acción clave que representa el valor central del producto],  
utilizando una versión mínima funcional antes de invertir en funcionalidades adicionales.

**ii. Alcance no contemplado en el MVP**  
Todas las funcionalidades secundarias, de optimización, administrativas o de soporte que no son imprescindibles para validar la hipótesis: [listar ejemplos del dominio].  
Estas se realizarán manualmente, mediante terceros o se diferirán a versiones posteriores.

**iii. Criterio de selección + hipótesis a probar**  
Se priorizó el flujo mínimo de valor del usuario: solo las US que cubren el camino crítico desde el ingreso al sistema hasta la acción de mayor valor para el negocio.  
El resto se excluye por no ser necesario para validar la hipótesis.

Hipótesis a probar:  
_"Si [los usuarios target] pueden [realizar la acción central del producto],
entonces adoptarán el producto y justificarán el desarrollo de funcionalidades adicionales."_

**iv. Listado de US incluidas en el MVP**

| #   | Frase verbal           | Justificación de inclusión                               |
| --- | ---------------------- | -------------------------------------------------------- |
| 1   | [verbo] [predicado]... | Punto de entrada al sistema; sin esto no hay usuarios.   |
| 2   | [verbo] [predicado]... | Funcionalidad core; sin esto el producto no tiene valor. |
| ... | ...                    | ...                                                      |

Para cada US excluida: indicar si se excluye porque:  
el experto del dominío/cliente la señaló explícitamente como versión posterior, porque se realizará manualmente al inicio, o porque requiere validar primero las US incluidas.

---

### 7. User Story con tarjeta completa

**¿Qué pregunta?**  
Identificar 1 (o 2) User Story con tarjeta completa: frase verbal, descripción/contexto,
criterios de aceptación, pruebas de usuario y estimación en Story Points justificada.
La consigna suele indicar sobre qué requerimiento específico del dominio trabajar.

**Fundamento teórico**

- Las **3 C** de una User Story: Tarjeta (Card), Conversación y Confirmación.
- Los **criterios de aceptación** definen el límite de la historia, son independientes de la
  implementación y de alto nivel. Formato: `Debe / Puede <frase verbal>.`
- Las **pruebas de usuario** expresan los detalles de la conversación y se predefinan como PASA
  o FALLA. Formato: `Probar <frase verbal>. PASA / FALLA`
- El **tamaño** de una story combina tres dimensiones: Complejidad, Esfuerzo e Incertidumbre.
  El Story Point resultante es la "burbuja" que engloba las tres.
- Se usa la escala **Fibonacci** porque la complejidad crece exponencialmente, no linealmente.
  Una story de 13 puntos debería disparar la pregunta: ¿por qué no se puede dividir?
- La estimación se hace comparando con otras US del backlog (estimación relativa), especialmente
  con la story canónica de referencia.

**Estructura de tarjeta completa**

```
Como <rol>,
quiero <acción>,
para <beneficio / objetivo>.
```

_Descripción / contexto (opcional, surge de la conversación):_
Breve narrativa que amplía la frase verbal y contextualiza el comportamiento esperado.  
No es una especificación detallada; es el resultado de la conversación con el PO.

**Estimación:**

| Complejidad         | Esfuerzo            | Incertidumbre       |
| ------------------- | ------------------- | ------------------- |
| baja / media / alta | baja / media / alta | baja / media / alta |

| Método       | Valor             | Fundamento                                                                  |
| ------------ | ----------------- | --------------------------------------------------------------------------- |
| Fibonacci    | [1/2/3/5/8/13/21] | Justificación comparando con otras US y referenciando las tres dimensiones. |
| Talla remera | [XS/S/M/L/XL/XXL] | Justificación coherente con el valor Fibonacci.                             |

> Escala de referencia:
>
> - 1–2: trivial, sin lógica significativa
> - 3–5: validaciones, lógica condicional, integración externa trivial (ej: email)
> - 8: múltiples reglas de negocio, atributos dinámicos, carga multimedia
> - 13: flujos de estados complejos, integración externa de alta complejidad
> - 21: muy compleja; considerar descomposición

**Criterios de aceptación:**

- Debe [criterio 1 — comportamiento esperado principal].
- Debe [criterio 2 — validación o restricción].
- Puede [criterio opcional].
- ⚠️ [Aclaración de alcance o restricción explícita del MVP si aplica].

**Pruebas de usuario:**

| Prueba                                             | Resultado esperado |
| -------------------------------------------------- | ------------------ |
| Probar [escenario feliz — funciona correctamente]. | PASA               |
| Probar [escenario negativo — validación de error]. | FALLA              |
| Probar [caso borde].                               | PASA / FALLA       |

---

### 8. User Story canónica

**¿Qué pregunta?**  
Indicar qué User Story del conjunto elegiste como canónica y justificar la elección (solo con su frase verbal).

**Fundamento teórico**

- La **story canónica** (base story) es la story de referencia usada en Poker Planning para
  comparar el tamaño de las demás. Es la "unidad de medida" relativa del equipo.
- Debe ser una story que el equipo conoce bien, con complejidad y esfuerzo representativos
  (ni la más trivial ni la más compleja del backlog).
- Una vez definida, todas las demás US se estiman comparándose con ella: "¿esta US es más
  grande, igual o más pequeña que la canónica?"

**Respuesta modelo**

La US canónica elegida es: _"Como [rol], quiero [acción]..."_

Se elige como canónica porque:

- Tiene complejidad media: no es trivial (no sería representativa) ni excesivamente compleja
  (dificultaría la comparación).
- El equipo tiene experiencia parcial con este tipo de funcionalidad, lo que permite estimar
  sin demasiada incertidumbre.
- Su tamaño ([N] puntos) sirve como ancla para estimar el resto del backlog: US más simples
  valen menos puntos y US más complejas valen más.
- No depende de integraciones externas críticas que distorsionarían la estimación base.

---

### 9. INVEST, DoR y DoD

**¿Qué pregunta?**  
Variantes:  
(a) ¿El modelo INVEST forma parte de la DoD o de la DoR? ¿Por qué?  
(b) Definir la DoR para el proyecto.  
(c) Definir la DoD para el proyecto.

**Fundamento teórico**

- **INVEST** es un criterio de calidad para evaluar si una User Story está bien escrita:
  Independent, Negotiable, Valuable, Estimable, Small, Testable. Evalúa la calidad de la US
  _antes_ de ser trabajada.
- La **Definition of Ready (DoR)** define los criterios que una US debe cumplir para poder ser
  tomada en una iteración (sprint). INVEST es parte del DoR, no del DoD.
- La **Definition of Done (DoD)** define los criterios que un incremento debe cumplir para
  considerarse completamente terminado. Aplica al resultado del trabajo, no a la US en sí.

**¿INVEST es parte del DoD?**
No. INVEST evalúa si una User Story está suficientemente bien escrita y analizada para poder trabajarse; es un criterio de _entrada_ al sprint.  
El DoD, en cambio, define cuándo el _resultado_ del trabajo está terminado. INVEST pertenece al DoR.

**DoR — Definición de Ready (ejemplo genérico)**
Una US está lista (READY) para entrar al sprint cuando:

- Tiene frase verbal clara en formato estándar.
- Tiene criterios de aceptación definidos y testeables.
- Fue estimada por el equipo.
- No tiene dependencias bloqueantes sin resolver.
- Es suficientemente pequeña para completarse en un sprint (cumple la S de INVEST).
- El equipo tiene suficiente contexto para comenzar sin necesitar más aclaraciones.

**DoD — Definición de Done (ejemplo genérico)**
Un incremento está terminado (DONE) cuando:

- El código fue desarrollado, refactorizado y está en el repositorio.
- Pasó revisión de pares (code review).
- Las pruebas unitarias e integración fueron ejecutadas y pasaron.
- Fue validado contra todos los criterios de aceptación.
- Está deployado en el ambiente de pruebas.
- La documentación relevante fue actualizada.
- No tiene defectos conocidos sin resolver.

---

### 10. Proceso empírico vs. definido: diferencias en una iteración

**¿Qué pregunta?**  
Si se elige un ciclo de vida iterativo e incremental,  
¿cuál sería la diferencia entre plantear una iteración en un proceso empírico y en uno definido?

**Fundamento teórico**

- Ambos enfoques pueden ser iterativos, pero difieren en cómo se planifica, controla y adapta
  cada iteración.
- En empírico: la iteración es un sprint de Scrum. El control surge de la inspección y adaptación.
- En definido: la iteración es una fase predefinida. El control surge de la predictibilidad del plan.

| Aspecto            | Proceso empírico (Scrum)                                    | Proceso definido (iterativo tradicional)                        |
| ------------------ | ----------------------------------------------------------- | --------------------------------------------------------------- |
| Planificación      | Al inicio del sprint, con lo que se sabe en ese momento     | Toda la iteración se planifica detalladamente antes de comenzar |
| Alcance            | Puede cambiar entre iteraciones según prioridades del PO    | Fijo por plan; cambios requieren control formal                 |
| Control            | Inspección y adaptación continua (daily, retro, review)     | Hitos formales de control al final de la iteración              |
| Entregable         | Incremento potencialmente funcional (software que funciona) | Artefacto predefinido según la fase (diseño, código, etc.)      |
| Cambios            | Bienvenidos; entran en la siguiente iteración               | Pasan por proceso de gestión de cambios formal                  |
| Triple restricción | Tiempo y costo fijos; alcance variable                      | Las tres variables se negocian formalmente                      |

---

### 11. Triple restricción y negociación

**¿Qué pregunta?**  
Dado un cambio en el proyecto (adelanto de fecha, aumento de alcance, reducción de presupuesto),  
¿cómo se ajustan las variables de la triple restricción? Justificar.

**Fundamento teórico**

- La **Triple Restricción** establece que Tiempo, Costo y Alcance están interrelacionados.
  Modificar una variable sin compensar con otra afecta la calidad del proyecto.
- Es responsabilidad del Líder de Proyecto balancear estas tres variables.
- En ágil: tiempo y costo son fijos; el alcance es la variable de ajuste.
- En tradicional: las tres variables se negocian; cambiar una requiere ajustar al menos otra.

**Respuesta modelo (adaptable al caso del enunciado)**

_Caso: se adelanta la fecha de entrega sin modificar el presupuesto._

Si el tiempo se reduce (↓) y el costo permanece fijo (=), la única variable de ajuste es el **alcance**:  
se debe reducir el scope del entregable, priorizando las funcionalidades de mayor valor y dejando las secundarias para versiones posteriores.

Si adicionalmente se quisiera mantener el alcance original con menos tiempo, habría que aumentar
el costo (más recursos, horas extra), con el riesgo de degradar la calidad.

_Caso en ágil:_
El tiempo por sprint es fijo. El costo es fijo (equipo estable). Si el cliente quiere entregar más funcionalidad en el mismo tiempo, se negocia el alcance del sprint:  
entra más solo si sale algo de menor prioridad. La calidad no se negocia.

---

### 12. Niveles de granularidad ágil: Tema, Épica, US

**¿Qué pregunta?**  
Elaborar un ejemplo de definición de un Tema (Theme) y una Épica (Epic) para el dominio del
enunciado, con toda la información de contexto que se considere necesaria.

**Fundamento teórico**

- **User Story**: descripción de una funcionalidad concreta desde la perspectiva del usuario.
  Cabe en un sprint.
- **Epic**: una User Story grande que aún no fue descompuesta en historias más pequeñas. No cabe
  en un sprint tal como está.
- **Theme**: colección de User Stories relacionadas que pertenecen a una misma área funcional o
  de negocio.
- El flujo de refinamiento va de más abstracto a más concreto: Theme → Epic → User Stories →
  criterios de aceptación / pruebas.

**Respuesta modelo (genérica)**

_Theme:_ "Gestión de [área funcional central del dominio]"
Agrupa todas las historias relacionadas con [descripción del área]. Ejemplo: en un sistema de
música, "Gestión de reproducción de contenido".

_Epic:_ "Como [rol], quiero gestionar [funcionalidad grande] para [objetivo amplio de negocio]."
Ejemplo: "Como oyente, quiero gestionar mis listas de reproducción para organizar y escuchar
música según mis preferencias." Esta épica se descompone en US concretas: crear lista, agregar
canción, reproducir lista, etc.

_User Story (descomposición):_ "Como oyente, quiero crear una lista de reproducción con un
nombre definido, para organizar mis canciones favoritas."

> La justificación debe incluir por qué la Epic no cabe en un sprint (es demasiado grande) y
> cómo las US descompuestas sí son implementables en una iteración.

---

### 13. Preguntas de opción múltiple teóricas

**Contexto**
Estas preguntas evalúan conceptos teóricos y tienen una o más respuestas correctas (5 pts c/u).
La interpretación de la consigna es parte de lo que se evalúa.

**Patrón "No Silver Bullet" (Fred Brooks)**

Cuando la pregunta refiere a herramientas (IA, low-code, automatización) que prometen eliminar
todos los problemas del desarrollo de software, aplicar este marco:

- Las **dificultades esenciales** son inherentes al software: complejidad del dominio,
  conformidad con requerimientos cambiantes, invisibilidad del producto, comunicación con el
  cliente. Ninguna herramienta las elimina.
- Las **dificultades accidentales** son del proceso: codificación manual, compilación, ambientes,
  testing repetitivo. Las herramientas pueden reducirlas significativamente.
- La respuesta correcta siempre reconoce que las herramientas mejoran aspectos accidentales
  **pero no eliminan las esenciales**. La opción que dice "la herramienta garantizará el éxito"
  o "eliminará todos los problemas" es incorrecta.

**Patrón Triple Restricción**

Cuando la pregunta presenta un escenario de cambio (adelantar fecha, ampliar alcance, reducir
presupuesto), la respuesta correcta reconoce que:

- Las tres variables están interrelacionadas.
- Cambiar una sin ajustar otra **compromete la calidad**.
- "El equipo puede absorber el cambio sin impacto" es generalmente incorrecta.
- Reducir tiempo sin ajustar alcance ni costo generará sobrecarga y deuda técnica.

**Patrón gestión del tiempo en ágil**

Cuando la pregunta refiere a reducir la duración del sprint o acelerar entregas:

- En ágil, el tiempo por iteración es **fijo** (timebox).
- Reducir el sprint reduce la cantidad de trabajo entregable por iteración.
- Acelerar sin ajustar alcance genera **deuda técnica**.
- El tiempo puede ajustarse **entre sprints** (cambiar la duración del sprint para el siguiente),
  pero no dentro del sprint en curso.

---

## Conceptos clave

| Término                    | Descripción breve                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Proceso definido           | Proceso repetible con entradas/salidas predecibles; control por predictibilidad                       |
| Proceso empírico           | Proceso adaptativo con inspecciones frecuentes; adecuado para contextos complejos                     |
| Ciclo de vida del proyecto | Serie de pasos temporales desde el inicio hasta el cierre del proyecto                                |
| Ciclo de vida del producto | Fases del producto desde su lanzamiento hasta su retiro (Introducción, Crecimiento, Madurez, Declive) |
| Triple Restricción         | Balance entre Tiempo, Costo y Alcance/Calidad; modificar uno impacta en los otros                     |
| Ítem de Configuración (IC) | Artefacto del proyecto o producto sujeto a cambios, compartido y rastreable                           |
| Línea Base (Baseline)      | Configuración revisada y acordada formalmente; solo se modifica con control de cambios                |
| MVP                        | Versión mínima de un producto para validar una hipótesis con el menor esfuerzo                        |
| Hipótesis de valor         | Supuesto sobre si el producto entrega valor real a los usuarios; se mide con retención                |
| User Story                 | Descripción de una funcionalidad desde la perspectiva del usuario (Como... quiero... para...)         |
| Las 3 C                    | Card (tarjeta), Conversación y Confirmación: las tres partes de una User Story                        |
| Criterio de aceptación     | Condición que debe cumplir una US para considerarse completa (Debe/Puede...)                          |
| Prueba de usuario          | Caso concreto que verifica un criterio de aceptación (Probar... PASA/FALLA)                           |
| Story Point                | Unidad de medida relativa del tamaño de una US: combina complejidad, esfuerzo e incertidumbre         |
| Estimación relativa        | Estimar comparando US entre sí, no en términos absolutos (horas/días)                                 |
| Velocidad (Velocity)       | Suma de SP de US completamente terminadas en un sprint                                                |
| Story canónica             | US de referencia para comparar el tamaño de las demás en Poker Planning                               |
| INVEST                     | Criterio de calidad de una US: Independent, Negotiable, Valuable, Estimable, Small, Testable          |
| DoR                        | Definition of Ready: criterios para que una US pueda entrar al sprint                                 |
| DoD                        | Definition of Done: criterios para considerar un incremento completamente terminado                   |
| Epic                       | User Story grande sin descomponer; no cabe en un sprint                                               |
| Theme                      | Colección de User Stories relacionadas por área funcional                                             |
| Dificultades esenciales    | Complejidad inherente al software (dominio, comunicación); no las elimina ninguna herramienta         |
| Dificultades accidentales  | Del proceso (codificación, compilación); las herramientas pueden reducirlas                           |

---

## Preguntas de Parcial

- ¿Cuál es la diferencia entre un proceso definido y uno empírico? ¿Cuándo conviene cada uno?
- ¿Cuál es la diferencia entre el ciclo de vida del proyecto y el ciclo de vida del producto?
- Explicar la Triple Restricción y cómo se aplica en gestión ágil vs. gestión tradicional.
- ¿Qué es un Ítem de Configuración? ¿Cómo se clasifican? Dar 3 ejemplos.
- ¿Qué es una Línea Base y cómo se modifica?
- ¿Qué es el MVP según Eric Ries? ¿Qué debe cumplir para ser considerado viable?
- Definir el MVP de un sistema dado: objetivo, alcance, hipótesis, US incluidas y excluidas.
- Escribir la tarjeta completa de una User Story: frase verbal, criterios de aceptación, pruebas
  de usuario y estimación en SP justificada con las tres dimensiones.
- ¿Qué es la story canónica y cuáles son los criterios para elegirla?
- ¿El modelo INVEST forma parte de la DoR o de la DoD? ¿Por qué?
- ¿Cuál es la diferencia entre una iteración en proceso empírico y en proceso definido?
- Dado un cambio de contexto (ej. se adelanta la fecha de entrega), ¿cómo se ajustan las
  variables de la triple restricción?
- ¿Qué son Theme, Epic y User Story? ¿Cómo se relacionan? Dar un ejemplo para un dominio dado.
- Según Brooks ("No Silver Bullet"), ¿qué tipo de dificultades puede reducir una herramienta de
  IA y cuáles no? ¿Por qué?

---

## Conexiones

- [2026-03-27.md](2026-03-27.md) — SCM: repositorio, ICs, líneas base, control de cambios
- [2026-03-31.md](2026-03-31.md) — Filosofía Ágil, User Stories, INVEST, DoR, DoD, criterios de aceptación
- [2026-04-10.md](2026-04-10.md) — Estimaciones ágiles, Story Points, Poker Planning, Velocidad, MVP, MMF, MLP
- [2026-04-17.md](2026-04-17.md) — Componentes de proyecto, proceso definido vs. empírico, Triple Restricción, ciclos de vida
- [2026-04-21.md](2026-04-21.md) — Práctico EcoHarmony: MVP, tarjetas completas, estimaciones (referencia de formato)
- [2026-04-24_P1.md](2026-04-24_P1.md) — Planificación Scrum, DoR, DoD, velocidad, métricas ágiles
- [2026-04-24_P2.md](2026-04-24_P2.md) — Práctico Recircula: MVP, tarjetas completas, roles, estimaciones (referencia de formato)
