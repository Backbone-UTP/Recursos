# Guía Previa: Sesión 03 - 2026 II

## Diseño de Interfaces con OpenPencil: Brief de Producto a Partir del Estado Actual

---

### Información del Documento

- **Nombre:** Diseño de Interfaces con OpenPencil
- **Autor:** Sergio Estrella
- **Formato:** Guía de Lectura (Documentación)
- **Página:** Front / 07-18
- **Fecha:** 18 de julio de 2026
- **Notas:** Material de apoyo previo para auditar Backbone Judge en su estado actual, construir un design brief de extensión hacia vistas aún no generadas, y usar OpenPencil/MCP como soporte de ejecución.
- **Taller relacionado:** [Fundamentos de Design Systems y UX con Luisa Bañol](https://www.youtube.com/live/2y55BwzpaI8).
- **Proyecto de práctica:** [Backbone Judge Frontend](https://github.com/Backbone-UTP/judge-front).
- **Diseños actuales:** [Judge v1 en Figma](https://www.figma.com/design/6pint4WKnnJeDq8vIme4uU/Judge-v1).

---

## Por Qué Esta Guía Es Importante

Diseñar una interfaz no comienza eligiendo colores o pidiéndole a una IA que “haga algo moderno”. Diseñar es **tomar decisiones**: decidir qué información aparece, en qué orden, bajo qué nombre, para quién y en qué contexto.

En Backbone Judge ya existe una base: el `challenge-workspace` y los diseños Judge v1. El trabajo de esta sesión no es inventar un producto desde cero, sino **leer lo que ya hay**, convertirlo en restricciones claras y **extender el producto** hacia las vistas que todavía faltan: Login, lista de retos, leaderboard y el resto del recorrido de competencia.

Esta guía retoma los fundamentos del taller de **Design Systems y UX**: una interfaz intuitiva no nace de decorar pantallas, sino de organizar correctamente la información y validar que esa organización tenga sentido para las personas que usarán el producto.

- [Backbone Judge Frontend](https://github.com/Backbone-UTP/judge-front)
- [Diseños Judge v1](https://www.figma.com/design/6pint4WKnnJeDq8vIme4uU/Judge-v1)

Transformaremos ese contexto en un flujo concreto:

```text
Estado actual (repo + Figma + challenge-workspace)
→ auditoría de decisiones existentes
→ usuarios + contexto + contenido del recorrido completo
→ mapa de vistas: existentes vs. pendientes
→ design brief de extensión
→ wireframes / exploraciones en OpenPencil
→ iteración con IA y MCP
→ handoff hacia issues y componentes frontend
```

El entregable central de la sesión es el **brief**. OpenPencil y la IA aceleran la ejecución, pero un brief ambiguo produce pantallas genéricas a una velocidad impresionante.

### Taller Previo Recomendado

El taller completo está disponible en:

- [Fundamentos de Design Systems y UX](https://www.youtube.com/live/2y55BwzpaI8)

Momentos relacionados con esta guía:

| Tema                                             | Momento                                                     |
| ------------------------------------------------ | ----------------------------------------------------------- |
| Diseñar es tomar decisiones                      | [03:00](https://www.youtube.com/live/2y55BwzpaI8?t=180s)    |
| Problemas de organización en productos digitales | [03:34](https://www.youtube.com/live/2y55BwzpaI8?t=214s)    |
| Primer ejercicio de Card Sorting                 | [07:42](https://www.youtube.com/live/2y55BwzpaI8?t=462s)    |
| Usuarios, contexto y contenido                   | [29:30](https://www.youtube.com/live/2y55BwzpaI8?t=1770s)   |
| Introducción a Design Systems                    | [44:31](https://www.youtube.com/live/2y55BwzpaI8?t=2671s)   |
| Ejercicio práctico de Card Sorting               | [1:02:04](https://www.youtube.com/live/2y55BwzpaI8?t=3724s) |
| Jerarquías y lógicas de navegación               | [1:21:20](https://www.youtube.com/live/2y55BwzpaI8?t=4880s) |
| Neutralidad durante investigación UX             | [1:31:37](https://www.youtube.com/live/2y55BwzpaI8?t=5497s) |

---

## Objetivo de la Sesión

Al finalizar la sesión deberías poder:

- Auditar el estado actual de Backbone Judge (repo + Figma + `challenge-workspace`) y separar hechos de supuestos.
- Analizar el producto desde usuarios, contexto y contenido del recorrido completo de competencia.
- Distinguir vistas ya existentes de vistas todavía no generadas.
- Construir un **design brief de extensión** con objetivo, flujo, tono, restricciones y criterios de aceptación.
- Definir qué hereda cada vista nueva del workspace actual (tokens, componentes, tono, densidad) y qué decide por su cuenta.
- Aplicar Card Sorting o agrupación de contenido para proponer navegación entre Login, lista de retos, workspace, leaderboard y vistas de apoyo.
- Evitar preguntas sesgadas durante una actividad de investigación UX.
- Explicar la diferencia entre un Design System y una librería de componentes.
- Traducir el brief en pages, sections, frames y layers en OpenPencil.
- Aplicar box model, jerarquía visual, Auto Layout y tamaños `Fixed`, `Fill` y `Hug`.
- Generar e iterar al menos una vista pendiente con OpenPencil o MCP sin romper la coherencia del producto.
- Pasar del brief a una propuesta de issues / estructura frontend sin copiar ciegamente el código generado.

---

## Conceptos Clave Para La Sesión

### 1. Diseñar Es Tomar Decisiones

En el taller se plantea que diseñar no equivale a decorar. Cada elemento de una interfaz representa una decisión:

- qué información aparece;
- qué información se oculta o se posterga;
- qué acción recibe mayor énfasis;
- cómo se agrupan los contenidos;
- qué palabras entiende el usuario;
- qué ocurre cuando algo sale mal.

**Registro mínimo de decisiones**

| Pregunta                                        | Decisión                                                                            | Evidencia                                      |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| ¿Qué necesita entender primero el participante? | Enunciado, restricciones y estado de la competencia                                 | Define si puede resolver y cuánto tiempo tiene |
| ¿Qué acción debe destacar?                      | Ejecutar durante la iteración y enviar cuando existe intención de evaluación        | Son acciones distintas dentro del flujo        |
| ¿Qué no puede perderse?                         | Código escrito y lenguaje seleccionado                                              | El trabajo del participante debe preservarse   |
| ¿Qué estados necesitamos?                       | Idle, running, submitting, accepted, wrong answer, compilation error y system error | Son parte del dominio del juez                 |

Cuando usemos OpenPencil, cada frame y componente debería poder explicarse como una decisión relacionada con el brief. Si un elemento existe únicamente porque “quedaba lindo”, todavía falta justificarlo.

---

### 2. Arquitectura de la Información: Usuarios, Contexto y Contenido

La arquitectura de la información define cómo se organiza, nombra y conecta el contenido para que una persona pueda encontrarlo y utilizarlo.

Esto se analiza en tres ejes:

#### Usuarios

- ¿Quiénes utilizarán el producto?
- ¿Qué conocimientos previos tienen?
- ¿Qué tareas desean completar?
- ¿Qué términos utilizan naturalmente?
- ¿Qué necesidades de accesibilidad debemos contemplar?

#### Contexto

- ¿Desde qué dispositivo acceden?
- ¿Tienen poco tiempo o pueden explorar?
- ¿Están entrenando o compitiendo?
- ¿Trabajan individualmente o en equipo?
- ¿Qué restricciones técnicas o del evento existen?

#### Contenido

- ¿Qué información debe presentar el producto?
- ¿Qué contenido es obligatorio?
- ¿Qué contenido cambia en tiempo real?
- ¿Qué elementos se relacionan?
- ¿Qué información puede crecer o quedar vacía?

Para el proyecto del juez, esto puede verse así:

```text
Usuarios
├── participante en entrenamiento
├── participante en maratón
├── equipo de competencia
├── creador de problemas
└── administrador o jurado

Contexto
├── resolver bajo presión de tiempo
├── comparar progreso durante una competencia
├── ejecutar código varias veces
├── enviar una solución oficial
└── consultar resultados y veredictos

Contenido
├── enunciado
├── ejemplos
├── restricciones
├── dificultad y metadatos
├── lenguaje
├── starter code
├── input personalizado
├── resultados de ejecución
├── veredicto
├── submissions
├── ranking
└── tiempo restante
```

El punto de intersección entre estos tres ejes define una arquitectura razonable. No debemos organizar la aplicación según cómo el backend guarda submissions, test cases o contests, sino según cómo los participantes intentan resolver problemas.

**Salida esperada antes de abrir OpenPencil**

1. Inventario de contenido.
2. Grupos o categorías iniciales.
3. Flujo principal.
4. Navegación propuesta.
5. Nombres comprensibles para cada sección.

---

### 3. UX Neutral: Investigar Sin Dirigir La Respuesta

Ser neutral durante una investigación UX significa evitar preguntas, gestos o explicaciones que empujen a la persona hacia la respuesta que esperamos.

Pregunta sesgada:

> ¿Te parece claro que Submit envía la solución definitivamente?

Pregunta más neutral:

> ¿Qué esperas que ocurra al seleccionar Submit?

Otra pregunta sesgada:

> ¿Pondrías los resultados debajo del editor?

Pregunta más neutral:

> Después de ejecutar el código, ¿dónde buscarías el resultado?

La neutralidad también aplica cuando usamos IA. Un prompt puede obligar al modelo a confirmar una solución que todavía no validamos.

Prompt sesgado:

```text
Crea un workspace con el problema a la izquierda y el editor a la derecha.
```

Prompt exploratorio:

```text
A partir del flujo de resolver un problema bajo presión de tiempo, propone tres
alternativas de distribución para enunciado, editor y resultados. Explica qué
necesidad resuelve cada alternativa, qué supuesto utiliza y qué riesgo presenta.
```

Buenas prácticas:

- preguntar por acciones, no por opiniones abstractas;
- permitir silencios y dudas;
- no defender el diseño durante la prueba;
- pedir que la persona explique qué espera encontrar;
- registrar el comportamiento antes de sacar conclusiones;
- utilizar los resultados para ajustar el brief y no para “ganar” una discusión.

---

### 4. Design Brief

Un design brief es un contrato de contexto. No define cada píxel, pero reduce ambigüedad y permite evaluar si el diseño resuelve el problema.

Debe construirse a partir de evidencia sobre usuarios, contexto y contenido. El brief no reemplaza la arquitectura de información: la documenta y la convierte en restricciones accionables para diseño, IA y desarrollo.

En esta sesión el brief tiene una forma particular: **parte del estado actual** y describe cómo extender el producto hacia vistas todavía no generadas.

Debe incluir:

#### Objetivo

¿Qué resultado busca el recorrido completo del producto?

> Permitir que un participante autentique su sesión, descubra retos disponibles, resuelva en el workspace existente y consulte su posición en el leaderboard durante una maratón.

#### Base Actual (no negociable al inicio)

¿Qué ya existe y debe heredar el resto del producto?

> `challenge-workspace` + Judge v1: tema oscuro, densidad de información controlada, acciones Run/Submit diferenciadas, estados de veredicto y tipografía monoespaciada para código.

#### Usuarios

¿Quién utilizará el producto y en qué contexto?

> Participantes universitarios en entrenamiento o maratón; también equipos que necesitan ver progreso y ranking bajo presión de tiempo.

#### Problema

¿Qué dificultad resolvemos?

> Hoy el producto tiene una experiencia fuerte de resolución, pero el recorrido previo (entrar, elegir reto) y el posterior (comparar progreso) todavía no están definidos con la misma claridad.

#### Flujo principal

```text
Login / restaurar sesión
→ lista de retos (o home de competencia)
→ challenge-workspace (base actual)
→ veredicto / submissions
→ leaderboard / progreso
→ volver a elegir otro reto
```

#### Mapa De Vistas

| Vista                             | Estado               | Rol en el flujo                          |
| --------------------------------- | -------------------- | ---------------------------------------- |
| Challenge Workspace               | Existe (base)        | Resolver, ejecutar y enviar              |
| Login / sesión                    | Pendiente            | Entrar o restaurar acceso                |
| Lista de retos                    | Pendiente            | Descubrir y elegir qué resolver          |
| Leaderboard                       | Pendiente            | Comparar progreso durante la competencia |
| Detalle de submission / historial | Pendiente u opcional | Revisar intentos previos                 |
| Perfil / equipo                   | Pendiente u opcional | Identidad y contexto de competencia      |

#### Contenido Por Vista Nueva

- **Login:** identificador, credenciales o acceso simulado, error de autenticación, redirección al destino original.
- **Lista de retos:** título, dificultad, estado (sin intentar / intentado / resuelto), aceptación, filtros o búsqueda, tiempo restante de competencia.
- **Leaderboard:** posición, equipo o participante, problemas resueltos, penalty o score, actualización reciente.

#### Tono de comunicación

> Técnico, directo y concentrado. Útil cuando algo falla. Sin mensajes ambiguos ni decoración que compita con el estado del sistema.

#### Dirección visual

> Hereda el Judge actual: tema oscuro, alto contraste, jerarquía clara, densidad controlada y mínimo ruido decorativo. Las vistas nuevas no deben sentirse como otro producto.

#### Restricciones

- Coherencia con Judge v1 y con el `challenge-workspace`.
- Componentes y tokens reutilizables antes que estilos sueltos.
- Desktop-first en workspace; lista y leaderboard deben contemplar compacto.
- Contraste suficiente; no depender solo del color para estados.
- Estructura implementable en Angular.

#### Criterios de aceptación

- Una persona entiende en qué vista está y cuál es la siguiente acción.
- Login explica qué ocurre si falla y a dónde vuelve al autenticarse.
- La lista de retos permite elegir un problema en segundos.
- El leaderboard comunica posición sin saturar.
- Las vistas nuevas se sienten parte del mismo Judge, no de un rediseño paralelo.
- Cada decisión del brief puede rastrearse a una evidencia del estado actual o a una hipótesis explícita.

---

#### Arquitectura de Información Propuesta

El brief también debería registrar:

- inventario de contenido de la base actual y de las vistas pendientes;
- categorías y navegación entre vistas;
- términos utilizados por los participantes;
- qué permanece global (timer, identidad, progreso) y qué es local a cada vista;
- dudas todavía no resueltas;
- hipótesis que necesitan validación.

#### Decisiones y Evidencia

```text
Decisión:
La lista de retos hereda badges de dificultad y tokens de estado del workspace;
no inventa una semántica visual nueva para “resuelto”.

Motivo:
El participante ya aprende ese lenguaje visual mientras resuelve.

Evidencia:
DifficultyBadge / VerdictBadge del challenge-workspace y Judge v1.

Riesgo:
Si la lista usa otro sistema de color, el ranking y el workspace se perciben como apps distintas.

Validación:
Comparar side-by-side lista + workspace con los mismos tokens.
```

---

### 5. Views, Pages, Frames, Sections y Layers

En frontend usamos el término **view** para hablar de una pantalla o estado importante de la aplicación. En una herramienta de diseño, esa vista se construye mediante páginas, frames, secciones y capas.

- **Page:** espacio de organización de alto nivel.
- **Section:** agrupación visual de pantallas o componentes relacionados.
- **Frame:** contenedor con dimensiones, hijos y reglas de layout.
- **Layer:** cualquier nodo del documento: texto, forma, frame, componente o instancia.
- **Viewport:** parte del canvas que observamos, junto con su posición y zoom.

Ejemplo:

```text
Page: Aplicación
├── Section: Flujo principal
│   ├── Frame: Home / Desktop
│   ├── Frame: Detalle / Desktop
│   └── Frame: Confirmación / Desktop
└── Section: Componentes
    ├── Component: Button
    ├── Component: Session Card
    └── Component: Input
```

Nombrar correctamente las capas importa. El árbol del documento es al diseño lo que el DOM es a la aplicación: si está desordenado, tarde o temprano alguien paga la deuda.

**Cómo lo aplicaremos**

- Separaremos pantallas, componentes y exploraciones.
- Usaremos nombres que indiquen intención.
- Revisaremos la jerarquía antes de exportar o generar código.

**Aprende más**

- [OpenPencil - Layers & Pages](https://openpencil.dev/user-guide/layers-and-pages)
- [OpenPencil - Drawing Shapes](https://openpencil.dev/user-guide/drawing-shapes)

---

---

### 6. Box Model

Todo elemento visual ocupa una caja. En CSS esa caja se entiende mediante el **box model**:

```text
margin
└── border
    └── padding
        └── content
```

- **Content:** texto, imagen o contenido interno.
- **Padding:** espacio entre el contenido y el borde.
- **Border:** límite visible; en diseño suele representarse como stroke.
- **Margin:** separación externa respecto de otros elementos.

En Auto Layout debemos diferenciar:

- `padding`: espacio interno del frame;
- `gap`: distancia entre los hijos;
- separación externa: normalmente depende del `gap` del contenedor padre.

Ejemplo:

```css
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
}
```

Traducción al diseño:

- Frame vertical.
- `gap: 12`.
- `padding: 24`.
- Stroke de `1px`.
- Radio de `16px`.

Mover elementos manualmente hasta que “se vean bien” funciona para una captura. Se rompe cuando cambia el texto, el ancho o el contenido. El layout debe expresar una regla, no una coordenada afortunada.

**Aprende más**

- [MDN - CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)

---

---

### 7. Auto Layout

Auto Layout posiciona automáticamente los hijos de un frame. OpenPencil soporta flujo horizontal, vertical, wrap y grid.

Propiedades principales:

- **Direction:** horizontal o vertical.
- **Gap:** espacio entre elementos.
- **Padding:** espacio interno.
- **Justify:** distribución sobre el eje principal.
- **Align:** alineación sobre el eje secundario.
- **Wrap:** permite continuar en otra fila o columna.
- **Grid:** organiza contenido en filas y columnas.

Cada hijo puede usar:

- **Fixed:** ancho o alto explícito.
- **Fill:** ocupa el espacio disponible.
- **Hug:** adapta su tamaño al contenido.

Ejemplo de una card:

```text
Card (Vertical / Fill width / Hug height)
├── Image (Fill width / Fixed height)
├── Content (Vertical / Gap 12 / Padding 20)
│   ├── Category (Hug)
│   ├── Title (Fill width / Hug height)
│   ├── Description (Fill width / Hug height)
│   └── Metadata (Horizontal / Wrap)
└── Actions (Horizontal / Fill width)
```

**Cómo lo aplicaremos**

- Construiremos primero la estructura y luego el estilo.
- Evitaremos posiciones absolutas innecesarias.
- Cambiaremos el ancho de los frames para probar el layout.
- Anidaremos layouts pequeños en lugar de crear un frame gigante con reglas confusas.

**Aprende más**

- [OpenPencil - Auto Layout](https://openpencil.dev/user-guide/auto-layout)

---

---

### 8. Jerarquía Visual

La jerarquía visual ayuda a responder:

1. ¿Qué debería mirar primero?
2. ¿Qué información está relacionada?
3. ¿Cuál es la acción principal?

Podemos construir jerarquía mediante:

- tamaño y peso tipográfico;
- contraste;
- proximidad;
- alineación;
- espacio en blanco;
- color;
- repetición;
- posición.

Reglas prácticas:

- Una acción principal por pantalla.
- Acciones secundarias con menor énfasis.
- Información relacionada agrupada.
- Textos reales y comprensibles.
- Estados visibles para loading, error, vacío y disabled.

Cuando todo grita, nada comunica.

---

---

### 9. Design Systems

Un Design System es un conjunto compartido de decisiones, fundamentos, componentes, patrones y documentación que permite construir experiencias consistentes.

No es solamente:

- un archivo con colores;
- una colección de botones;
- una librería de componentes;
- un tablero visual que nadie mantiene.

Un sistema completo conecta intención, diseño y código:

```text
Principios
→ fundamentos
→ tokens
→ componentes
→ patrones
→ documentación
→ implementación
```

#### Capas Del Sistema

**Principios**

Explican cómo debería sentirse y comportarse el producto.

> Claro bajo presión.  
> Consistente antes que novedoso.  
> El estado del sistema siempre debe ser visible.  
> Accesible desde el inicio.

**Fundamentos**

- color;
- tipografía;
- iconografía;
- espaciado;
- grids;
- radius;
- elevación;
- movimiento.

**Tokens**

Representan decisiones con nombres compartidos:

```text
color.action.run
color.action.submit
color.verdict.accepted
color.verdict.wrongAnswer
color.feedback.compilationError
spacing.workspace.panel
radius.control.default
font.code.medium
```

**Componentes**

Resuelven unidades reutilizables como Button, Tabs, Badge, Code Editor Toolbar, Verdict Banner o Results Panel.

**Patrones**

Combinan componentes para resolver tareas completas:

- resolver un problema;
- ejecutar con input personalizado;
- enviar una solución;
- confirmar Reset Code;
- interpretar un veredicto;
- navegar mediante teclado;
- consultar progreso de competencia.

**Documentación**

Explica cuándo usar cada elemento, cuándo no usarlo, qué estados tiene y cómo se implementa.

#### Beneficios

- consistencia entre pantallas y equipos;
- menos decisiones repetidas;
- mayor velocidad de diseño y desarrollo;
- accesibilidad incorporada;
- lenguaje compartido;
- mantenimiento más predecible.

#### Design System y OpenPencil

En OpenPencil organizaremos el sistema mediante:

```text
Page: Foundations
├── Colors
├── Typography
├── Spacing
└── Radius

Page: Components
├── Button
├── Tabs
├── Difficulty Badge
├── Verdict Badge
├── Editor Toolbar
└── Results Panel

Page: Patterns
├── Challenge Workspace
├── Run Code Flow
├── Submit Flow
└── Competition Status
```

Cada decisión debería tener una contraparte en frontend. Si diseño usa `color.verdict.accepted` y desarrollo coloca un verde distinto en cada pantalla, tenemos dos fuentes de verdad y una pequeña fábrica de bugs.

---

### 10. Componentes, Variantes y Tokens

Los componentes, variantes y tokens son la capa operativa del Design System.

Un componente es una pieza reutilizable con una responsabilidad visual clara:

- Button.
- Input.
- Badge.
- Session Card.
- Navbar.
- Empty State.
- Modal.

Las variantes permiten representar configuraciones o estados:

```text
Button
├── variant: primary | secondary | ghost
├── size: small | medium | large
└── state: default | hover | disabled | loading
```

Los **design tokens** representan decisiones compartidas:

```text
color.brand.primary
color.text.default
color.surface.elevated
spacing.2
spacing.4
radius.medium
font.size.body
```

En frontend pueden convertirse en CSS custom properties:

```css
:root {
  --color-brand-primary: #5b5bd6;
  --color-text-default: #1f2937;
  --spacing-4: 16px;
  --radius-medium: 12px;
}
```

**Cómo lo aplicaremos**

- Detectaremos elementos repetidos antes de crear componentes.
- Evitaremos convertir absolutamente todo en componente.
- Usaremos nombres semánticos para colores y espacios.
- Revisaremos consistencia antes de pasar a código.

**Aprende más**

- [OpenPencil - Components](https://openpencil.dev/user-guide/components)
- [OpenPencil - Variables](https://openpencil.dev/user-guide/variables)
- [Design Tokens Community Group](https://www.designtokens.org/)

---

---

### 11. OpenPencil

OpenPencil es un editor open source compatible con archivos `.fig` y `.pen`. Además del canvas, permite trabajar con automatización, CLI, chat con IA y MCP.

La idea central es tratar el diseño como un **árbol de nodos**, no solamente como una imagen. Esto permite:

- inspeccionar pages, frames y layers;
- crear y modificar nodos;
- aplicar Auto Layout;
- trabajar con componentes y variables;
- analizar colores, tipografía y espaciado;
- exportar imágenes, SVG, JSX o HTML/Tailwind;
- integrar agentes en el flujo.

Flujo recomendado:

```text
Brief
→ estructura de pantallas
→ wireframe
→ jerarquía y contenido
→ Auto Layout
→ componentes y tokens
→ estilo visual
→ revisión
→ adaptación a código
```

Primero construimos el edificio; después elegimos la pintura. Dale que va.

**Aprende más**

- [OpenPencil - Repositorio](https://github.com/open-pencil/open-pencil)
- [OpenPencil - Documentación](https://openpencil.dev/)
- [OpenPencil - Aplicación web](https://app.openpencil.dev/)
- [OpenPencil - User Guide](https://openpencil.dev/user-guide/)

---

---

### 12. Generar e Iterar con IA

Un prompt útil no reemplaza el brief: lo convierte en instrucciones accionables.

Prompt débil:

```text
Crea una app moderna de coding competition.
```

Prompt con contexto (brief → ejecución):

```text
Extiende Backbone Judge a partir de este brief. Ya existe un challenge-workspace
con tema oscuro, badges de dificultad/veredicto y densidad controlada.
NO rediseñes el workspace.

Objetivo:
Completar el recorrido Login → lista de retos → workspace → leaderboard.

Vista priorizada:
Lista de retos.

Contenido:
Título, dificultad, estado (sin intentar / intentado / resuelto),
aceptación simple y CTA para abrir el workspace.

Hereda:
Tema oscuro, DifficultyBadge, semántica de estados y tono técnico del Judge.

Layout:
Frames con Auto Layout, spacing consistente y componentes reutilizables.
Desktop primero; variante compacta después.

Primero estructura en escala de grises. No inventes otro sistema visual.
```

Después del primer resultado, iteramos con instrucciones pequeñas:

```text
Revisa la jerarquía de la lista de retos.
Agrupa dificultad y estado en una metadata reutilizable por fila.
Mantén el CTA “Abrir reto” como acción primaria.
```

```text
Convierte cada fila de problema en un componente ProblemRow.
Usa Auto Layout horizontal, padding consistente y gap de la escala del Judge.
Permite que el título crezca a dos líneas sin romper la fila.
```

```text
Genera una variante compacta de 390 px.
Apila metadata bajo el título cuando no exista espacio horizontal.
Conserva filtros mínimos y la prioridad de abrir un reto.
```

**Regla de oro:** pedir, revisar, corregir y volver a medir. Un solo prompt rara vez produce una solución lista para implementar.

---

---

### 13. MCP: OpenPencil Trabajando con un Agente

MCP permite que un cliente compatible utilice herramientas de OpenPencil para leer, crear, modificar y exportar diseños.

```text
Agente
→ cliente MCP
→ servidor MCP de OpenPencil
→ documento abierto
→ operaciones sobre nodos
```

#### Instalación

```bash
pnpm add -g @open-pencil/mcp
```

Verifica que el binario esté disponible:

```bash
openpencil-mcp --help
```

La aplicación de escritorio debe estar abierta y tener un documento cargado para operar sobre el canvas activo mediante `stdio`.

#### Configuración por cliente

Cada herramienta usa un archivo y una forma ligeramente distinta. El comando del servidor es el mismo: `openpencil-mcp`.

##### VS Code

Archivo: `.vscode/mcp.json` (workspace) o la configuración de usuario vía `MCP: Open User Configuration`.

```json
{
  "servers": {
    "open-pencil": {
      "type": "stdio",
      "command": "openpencil-mcp"
    }
  }
}
```

En VS Code, MCP funciona con GitHub Copilot en modo Agent. Después de guardar, usa `MCP: List Servers` para iniciar o reiniciar el servidor.

##### Cursor

Archivo: `.cursor/mcp.json` (proyecto) o la configuración MCP global de Cursor.

```json
{
  "mcpServers": {
    "open-pencil": {
      "command": "openpencil-mcp"
    }
  }
}
```

Reinicia Cursor o recarga los servidores MCP si el cliente no detecta el cambio de inmediato.

##### OpenCode

Archivo: `opencode.json` en la raíz del proyecto, o `~/.config/opencode/opencode.json` para configuración global.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "open-pencil": {
      "type": "local",
      "command": ["openpencil-mcp"],
      "enabled": true
    }
  }
}
```

También puedes registrarlo desde la terminal:

```bash
opencode mcp add open-pencil -- openpencil-mcp
```

##### Resumen rápido

| Cliente  | Archivo típico     | Clave raíz   |
| -------- | ------------------ | ------------ |
| VS Code  | `.vscode/mcp.json` | `servers`    |
| Cursor   | `.cursor/mcp.json` | `mcpServers` |
| OpenCode | `opencode.json`    | `mcp`        |

No copies el bloque de un cliente a otro sin ajustar la clave y la estructura: VS Code usa `servers`, Cursor usa `mcpServers` y OpenCode usa `mcp` con `type: "local"` y `command` como arreglo.

#### Flujo recomendado

```text
1. Leer el documento y el árbol de la página.
2. Identificar frames, componentes y selección.
3. Crear o modificar una parte concreta.
4. Exportar o renderizar el resultado.
5. Comparar contra el brief.
6. Corregir inconsistencias.
7. Guardar el documento.
```

Prompt de ejemplo:

```text
Usa el servidor MCP de OpenPencil.

Contexto: brief de extensión de Backbone Judge. El challenge-workspace ya existe;
vamos a diseñar una vista pendiente (Login, lista de retos o leaderboard).

1. Inspecciona la página actual.
2. Resume su estructura antes de modificarla.
3. Crea la vista priorizada del brief en un frame desktop.
4. Respeta la herencia visual documentada (tema oscuro, badges, densidad).
5. Usa Auto Layout y componentes reutilizables.
6. Exporta una imagen para revisar el resultado.
7. Indica qué criterios del brief cumple y cuáles faltan.
```

Buenas prácticas:

- Autoriza únicamente las herramientas necesarias.
- Evita deshabilitar permisos globalmente.
- Revisa el documento antes y después de cambios grandes.
- Trabaja sobre una copia al experimentar.
- Limita el acceso a archivos mediante `OPENPENCIL_MCP_ROOT`.
- No aceptes cambios masivos sin inspeccionar el resultado.

**Aprende más**

- [OpenPencil - MCP Server](https://openpencil.dev/programmable/mcp-server)
- [OpenPencil - Automation](https://openpencil.dev/programmable/)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

---

### 14. Del Diseño al Código

OpenPencil puede mostrar o exportar una selección como JSX y Tailwind. Esto ayuda a reconocer:

- jerarquía de contenedores;
- dirección de layout;
- padding y gap;
- tamaños;
- estilos visuales;
- oportunidades de componentización.

Ejemplo conceptual:

```html
<article class="flex flex-col gap-4 rounded-xl border p-5">
  <header class="flex flex-col gap-2">
    <span class="text-sm">Frontend</span>
    <h2 class="text-xl font-semibold">Diseño con OpenPencil</h2>
  </header>

  <div class="flex flex-wrap gap-3">
    <span>18 de julio</span>
    <span>10:00 a. m.</span>
    <span>Presencial</span>
  </div>

  <button type="button">Ver sesión</button>
</article>
```

Antes de integrar código generado debemos revisar:

- semántica HTML;
- accesibilidad;
- responsive;
- estados interactivos;
- design tokens;
- separación entre presentación y datos;
- reutilización;
- convenciones del proyecto;
- tests.

La herramienta acelera la traducción. La arquitectura sigue siendo responsabilidad del equipo.

---

---

## Checklist de Revisión

### Brief De Extensión

- ¿El brief parte del estado actual y no inventa otro producto?
- ¿Queda claro qué se hereda del `challenge-workspace` / Judge v1?
- ¿Login, lista de retos y leaderboard tienen propósito, contenido y criterios?
- ¿El fuera de alcance está explícito?
- ¿Cada decisión cita evidencia o una hipótesis marcada como tal?
- ¿La IA agregó contenido o patrones que no estaban en el brief?

### Decisiones

- ¿Cada pantalla responde a un objetivo del recorrido?
- ¿La acción primaria de cada vista nueva es obvia?
- ¿Podemos explicar por qué existe cada bloque?

### Arquitectura de Información

- ¿El mapa distingue vistas existentes, pendientes y fuera de alcance?
- ¿El inventario cubre el recorrido completo, no solo el editor?
- ¿Los nombres son comprensibles para participantes de maratón?
- ¿La navegación refleja el flujo Login → lista → workspace → leaderboard?
- ¿Las dudas del Card Sorting quedaron documentadas?

### Flujo Del Juez

- ¿Una persona sabe en qué vista está y cuál es la siguiente acción?
- ¿Login contempla error y destino post-autenticación?
- ¿La lista permite elegir un reto bajo presión de tiempo?
- ¿El leaderboard comunica posición sin saturar?
- ¿Lo global (timer, identidad, progreso) está separado de lo local a cada vista?

### Coherencia Con La Base Actual

- ¿Las vistas nuevas reutilizan tono, tema y semántica de estados?
- ¿Badges, tokens y densidad se sienten del mismo Judge?
- ¿Se evitó rediseñar el workspace “de paso”?

### Estructura Del Documento / Layout

- ¿Las capas tienen nombres claros?
- ¿Los frames tienen una responsabilidad?
- ¿Se usan correctamente Auto Layout, `Fixed`, `Fill` y `Hug`?
- ¿La variante compacta conserva la acción primaria?

### Design System

- ¿Los elementos repetidos utilizan componentes?
- ¿Las variantes representan estados reales (idle, loading, empty, error)?
- ¿Los valores visuales provienen de tokens?
- ¿Los estados no dependen únicamente del color?

### Contenido y Accesibilidad

- ¿La pantalla utiliza datos realistas de competencia?
- ¿Los errores explican cómo continuar?
- ¿Existe contraste suficiente en el tema oscuro?
- ¿Los controles tienen focus visible y uso por teclado?

### Investigación UX

- ¿Las preguntas fueron neutrales?
- ¿Se registró lo que hicieron los participantes antes de interpretarlo?
- ¿Las observaciones están separadas de las conclusiones?
- ¿El brief cambió cuando la evidencia contradijo una suposición?

---

## Actividad Práctica

Durante la sesión trabajaremos sobre **Backbone Judge**, un juez de programación estilo LeetCode o HackerRank orientado a entrenamiento y maratones.

El objetivo de la actividad **no** es rediseñar el `challenge-workspace` desde cero. Es producir un **design brief de extensión**: documentar qué ya existe, qué se hereda y cómo deben comportarse las vistas que todavía no están generadas.

### Material Base

- [Repositorio del frontend](https://github.com/Backbone-UTP/judge-front)
- [Diseños actuales en Figma](https://www.figma.com/design/6pint4WKnnJeDq8vIme4uU/Judge-v1)
- Feature actual (base): `challenge-workspace`
- Problema fixture disponible: `Two Sum`
- Sesión previa relacionada: flujos autenticados y ruta protegida hacia el workspace ([Front / 07-04](../07-04/README.md))
- Acciones existentes o planificadas en el workspace: seleccionar lenguaje, editar código, ejecutar, enviar, restablecer y consultar resultados

### Escenario De Producto

Backbone Judge será utilizado durante una maratón universitaria. Un participante necesita completar este recorrido:

```text
Autenticarse o restaurar sesión
→ ver la lista de retos de la competencia
→ elegir un problema
→ resolver en el challenge-workspace (base actual)
→ interpretar veredicto
→ consultar leaderboard / progreso
→ volver a la lista y continuar
```

Hoy la pieza más avanzada es el workspace. Login, lista de retos y leaderboard existen como necesidad de producto, no como experiencia cerrada. El brief debe cerrar esa brecha sin inventar otro lenguaje visual.

### Usuarios

#### Participante En Entrenamiento

- Puede explorar con calma.
- Ejecuta varias pruebas.
- Consulta hints o submissions anteriores.
- Busca aprender del feedback.

#### Participante En Maratón

- Trabaja con tiempo limitado.
- Necesita entrar rápido, elegir problemas y cambiar entre ellos.
- Requiere estados claros y acciones predecibles.
- No puede perder código por navegación o errores.

#### Equipo De Competencia

- Comparte decisiones y estrategia.
- Revisa problemas resueltos y pendientes.
- Necesita entender ranking y estado de la competencia.

### Restricciones De La Actividad

- Partir del estado actual: repo + Judge v1 + `challenge-workspace`.
- No rediseñar el workspace salvo para documentar qué se hereda.
- No copiar Figma a ciegas: primero auditarlo.
- Las vistas nuevas deben sentirse del mismo producto.
- Tema oscuro con contraste suficiente.
- Desktop-first; contemplar variante compacta en lista y leaderboard.
- Evitar depender únicamente del color para estados.
- Contemplar keyboard-first y estructura implementable en Angular.
- El entregable principal es el brief; OpenPencil apoya una exploración, no reemplaza el contrato.

---

### Fase 1: Auditoría Del Estado Actual

Cada equipo revisará el Figma y el frontend actual para responder: **¿qué ya decide el producto por nosotros?**

#### Qué Debemos Observar

- distribución del `challenge-workspace` (problema, editor, resultados);
- jerarquía de título, metadatos y tabs;
- lenguaje visual de dificultad, acciones y veredictos;
- tokens implícitos: color, spacing, radius, tipografía;
- qué rutas o pantallas faltan para completar el flujo de maratón;
- qué decisiones del workspace deberían volverse globales.

#### Registro De Hallazgos

```text
Hallazgo:
El workspace ya comunica estados de veredicto con semántica propia.

Impacto:
Login, lista y leaderboard no pueden inventar otro sistema de “éxito / error”.

Hipótesis:
DifficultyBadge, VerdictBadge y la paleta oscura deben ser foundations del brief.

Validación:
Mapear cada vista pendiente a tokens/componentes reutilizables del estado actual.
```

La salida será una tabla con:

| Decisión actual | Se hereda | Vista impactada | Evidencia | Riesgo si se ignora |
| --------------- | --------- | --------------- | --------- | ------------------- |

---

### Fase 2: Mapa De Vistas — Existentes Vs. Pendientes

Antes de inventariar contenido, fijamos el mapa del producto:

| Vista                    | Estado               | Pregunta que responde          |
| ------------------------ | -------------------- | ------------------------------ |
| Challenge Workspace      | Base actual          | ¿Cómo resuelvo y envío?        |
| Login / sesión           | Pendiente            | ¿Cómo entro y a dónde vuelvo?  |
| Lista de retos           | Pendiente            | ¿Qué puedo resolver ahora?     |
| Leaderboard              | Pendiente            | ¿Cómo vamos en la competencia? |
| Historial de submissions | Pendiente u opcional | ¿Qué intenté antes?            |
| Perfil / equipo          | Pendiente u opcional | ¿Quién soy en este contest?    |

Cada equipo marca:

- **debe diseñarse en esta sesión** (prioridad del brief);
- **queda como supuesto** (mencionado, no resuelto);
- **fuera de alcance** (explícitamente excluido).

Prioridad sugerida para el brief: Login → Lista de retos → Leaderboard, usando el workspace como referencia de coherencia.

---

### Fase 3: Inventario De Contenido Del Recorrido

Inventario mínimo por vista. El workspace ya tiene mucho resuelto; el esfuerzo va a las vistas nuevas y a lo compartido.

```text
Compartido / global
├── identidad del participante o equipo
├── nombre de la competencia
├── tiempo restante
├── navegación entre vistas
└── estado de sesión

Login
├── identificador / credenciales (o acceso simulado)
├── errores de autenticación
├── recuperar o restaurar sesión
└── destino post-login

Lista de retos
├── título del problema
├── dificultad
├── estado (sin intentar / intentado / resuelto)
├── aceptación o métricas simples
├── filtros / búsqueda
└── CTA para abrir el workspace

Challenge Workspace (base — documentar, no rediseñar)
├── enunciado, ejemplos, restricciones
├── editor, lenguaje, run / submit
├── resultados y veredictos
└── submissions / hints

Leaderboard
├── posición
├── participante o equipo
├── problemas resueltos
├── score / penalty
└── indicación de actualización
```

El equipo decide, por ítem, si es:

- permanente;
- contextual;
- secundario;
- sensible al tiempo;
- parte de un estado de error;
- **heredado del workspace** vs. **nuevo**.

---

### Fase 4: Card Sorting Del Recorrido De Competencia

Agruparemos tarjetas del producto completo, no solo del editor:

```text
Login
Restore Session
Contest Home
Problem List
Difficulty
Solved Status
Open Challenge
Description
Code Editor
Run Code
Submit
Verdict
Submissions History
Contest Timer
Leaderboard
Team Score
Announcements
Profile
Logout
```

El equipo documentará:

- grupos encontrados;
- nombres propuestos para navegación;
- tarjetas difíciles de ubicar;
- qué debe permanecer global (timer, identidad, progreso);
- qué vive solo dentro de una vista;
- diferencias entre entrenar y competir.

La pregunta central será:

> Si el workspace ya existe, ¿qué pantallas faltan para que una maratón sea usable de punta a punta — y en qué orden?

---

### Fase 5: Design Brief De Extensión

Esta es la fase principal. Cada equipo completa un brief usando la plantilla de la sección _Design Brief_, con estas piezas obligatorias:

#### 1. Objetivo Del Recorrido

Una frase que cubra autenticación → selección → resolución → comparación de progreso.

#### 2. Base Actual

Lista corta de decisiones del `challenge-workspace` / Judge v1 que **no se renegocian** en las vistas nuevas (tono, tema, badges, densidad, CTAs).

#### 3. Flujo Principal

Diagrama del recorrido completo, marcando qué es base y qué es extensión.

#### 4. Vistas En Alcance

Para cada vista pendiente prioritaria (Login, Lista de retos, Leaderboard):

| Campo                   | Contenido                              |
| ----------------------- | -------------------------------------- |
| Propósito               | Qué logra el usuario aquí              |
| Contenido mínimo        | Qué información debe verse             |
| Acción primaria         | Una sola acción dominante              |
| Estados                 | idle, loading, empty, error, success   |
| Hereda de               | tokens / componentes del estado actual |
| Decide por sí           | layout o patrones propios de esa vista |
| Criterios de aceptación | 3–5 checks observables                 |

#### 5. Fuera De Alcance

Lista explícita de lo que el brief no resuelve todavía.

#### 6. Criterios Globales De Aceptación

Ejemplos:

- Una persona entiende en qué vista está y cuál es la siguiente acción.
- Login falla con mensaje útil y preserva el destino original.
- La lista permite abrir un reto en segundos bajo presión de tiempo.
- El leaderboard comunica posición sin competir con el workspace.
- Las tres vistas nuevas se sienten del mismo Judge.
- Cada decisión cita evidencia del estado actual o una hipótesis marcada como tal.

Plantilla mínima para pegar en el documento del equipo:

```text
# Design Brief — Backbone Judge (extensión)

## Objetivo
...

## Base actual (herencia)
- ...

## Usuarios y contexto
- ...

## Problema
- ...

## Flujo principal
Login → Lista de retos → Workspace (base) → Leaderboard → ...

## Vistas
### Login
- propósito:
- contenido:
- acción primaria:
- estados:
- hereda:
- criterios:

### Lista de retos
...

### Leaderboard
...

## Tono y dirección visual
...

## Restricciones
...

## Fuera de alcance
...

## Decisiones / evidencia / riesgos
...

## Criterios globales de aceptación
- [ ] ...
```

---

### Fase 6: Exploración En OpenPencil (Desde El Brief)

Con el brief cerrado, cada equipo traduce **una** vista pendiente a OpenPencil. No se explora el workspace salvo como referencia visual.

Estructura sugerida del documento:

```text
Page: Judge Extension Brief
├── Section: Base Actual (capturas / notas del workspace)
├── Section: Mapa De Vistas
└── Section: Brief Resumido

Page: Priority View Exploration
├── Section: Information Architecture
├── Section: Desktop
│   ├── Frame: Idle
│   ├── Frame: Loading
│   ├── Frame: Empty o Error
│   └── Frame: Populated
└── Section: Compact Variant
```

Reglas:

- elegir **una** vista prioritaria del brief (Login, Lista o Leaderboard);
- nombrar layers por intención (`PrimaryAction`, `ContestTimer`, `ProblemRow`);
- usar Auto Layout en contenedores principales;
- reutilizar la semántica visual documentada en la Fase 1;
- si algo no estaba en el brief, o se agrega al brief o se descarta.

---

### Fase 7: Iteración Con IA / MCP Contra El Brief

El agente deberá:

1. leer o recibir el brief del equipo;
2. inspeccionar el documento OpenPencil si ya existe;
3. resumir la estructura antes de modificar;
4. generar o ajustar **solo** la vista priorizada;
5. mantener coherencia con la base actual;
6. exportar una imagen;
7. comparar el resultado contra los criterios del brief;
8. señalar supuestos no validados.

Prompt sugerido:

```text
Usa OpenPencil para extender Backbone Judge a partir de este brief.

Contexto:
Ya existe un challenge-workspace con tema oscuro, badges de dificultad/veredicto
y densidad de información controlada. NO rediseñes el workspace.

Brief (pegar el del equipo):
...

Tarea:
1. Resume qué hereda la vista nueva del estado actual.
2. Diseña la vista priorizada: [Login | Lista de retos | Leaderboard].
3. Incluye estados idle, loading y empty/error como mínimo.
4. Usa Auto Layout y nombres semánticos.
5. No inventes un sistema visual distinto al Judge actual.
6. Exporta el resultado y marca qué criterios del brief cumple o incumple.
```

---

### Fase 8: Handoff Hacia El Frontend

El brief se traduce a trabajo implementable en Angular, alineado con lo que ya existe:

```text
app/
├── auth/                      ← Login / sesión (extensión)
├── challenges/
│   ├── challenge-list/        ← Lista de retos (extensión)
│   └── challenge-workspace/   ← Base actual
├── leaderboard/               ← Leaderboard (extensión)
└── shared/
    ├── tokens/
    └── ui/                    ← badges, timer, rows reutilizables
```

Cada equipo entrega:

- brief completo (Fase 5);
- mapa de vistas existentes vs. pendientes;
- exploración OpenPencil de una vista prioritaria;
- árbol de componentes propuesto para esa vista;
- lista de issues derivadas (una issue ≈ una unidad de trabajo revisable);
- decisiones que deben confirmarse antes de implementar.

---

## Agenda

### Bloque 1: Estado Actual De Backbone Judge — 20 min

- Qué problema resuelve un online judge.
- Recorrido por Judge v1 y el `challenge-workspace`.
- Diseñar es tomar decisiones.
- Auditoría: qué se hereda y qué falta.

### Bloque 2: Del Recorrido Al Brief — 30 min

- Usuarios, contexto y contenido del flujo completo.
- Mapa de vistas: existentes vs. pendientes.
- Inventario y Card Sorting del recorrido.
- Redacción del design brief de extensión (Login, lista, leaderboard).

### Bloque 3: OpenPencil Como Ejecución Del Brief — 25 min

- Pages, sections, frames y layers.
- Box model, Auto Layout, Fixed / Fill / Hug.
- Exploración de una vista pendiente priorizada.

### Bloque 4: Design System Como Herencia — 15 min

- Foundations y tokens ya implícitos en el Judge.
- Componentes compartidos vs. específicos de cada vista.
- Accesibilidad y keyboard-first.

### Bloque 5: IA, MCP y Handoff — 20 min

- Del brief al prompt.
- Iteración de la vista priorizada.
- Comparación contra criterios de aceptación.
- Issues y estructura Angular propuesta.

### Bloque 6: Cierre — 10 min

- Lectura cruzada de briefs.
- Decisiones tomadas y supuestos pendientes.
- Próximas issues.

---

## Recomendaciones Antes De La Clase

- Leer esta guía.
- Revisar el [taller de Design Systems y UX con Luisa Bañol](https://www.youtube.com/live/2y55BwzpaI8), especialmente los segmentos enlazados al inicio.
- Revisar el [repositorio de Backbone Judge](https://github.com/Backbone-UTP/judge-front) y ubicar el `challenge-workspace`.
- Recorrer los [diseños Judge v1](https://www.figma.com/design/6pint4WKnnJeDq8vIme4uU/Judge-v1).
- Anotar tres cosas que el producto **ya decidió** y tres vistas que **todavía faltan**.
- Revisar la sesión de autenticación ([Front / 07-04](../07-04/README.md)) para conectar Login con el brief.
- Probar la [aplicación web de OpenPencil](https://app.openpencil.dev/).
- Instalar la aplicación de escritorio si se utilizará MCP sobre el canvas activo.
- Tener Node.js y PNPM disponibles.
- Instalar el servidor MCP:

```bash
pnpm add -g @open-pencil/mcp
```

- Tener disponible un cliente compatible con MCP: VS Code, Cursor u OpenCode.
- Configurar el servidor según el cliente (ver sección MCP).
- No preocuparte por “diseñar bonito”. Primero necesitamos un brief con estructura.

---

## Entregable Esperado De La Sesión

Al finalizar, el entregable principal es un **design brief de extensión** de Backbone Judge. Como soporte, cada equipo incluye evidencia de auditoría y una exploración visual.

### Obligatorio

- Auditoría breve del estado actual (qué se hereda).
- Mapa de vistas: existentes vs. pendientes vs. fuera de alcance.
- Inventario de contenido del recorrido (con foco en Login, lista y leaderboard).
- Resultado del Card Sorting o agrupación de navegación.
- Design brief completo: objetivo, base actual, flujo, tono, restricciones, decisiones y criterios.
- Especificación por vista prioritaria: propósito, contenido, acción primaria, estados, herencia y aceptación.
- Registro de supuestos pendientes.

### Deseable / De Apoyo

- Exploración OpenPencil de **una** vista pendiente.
- Variante compacta de esa vista.
- Iteración con IA o MCP evaluada contra el brief.
- Exportación visual.
- Propuesta de estructura Angular e issues derivadas.
- Lista de tokens/componentes compartidos a extraer del workspace.

Estructura sugerida:

```text
Research
├── current state audit
├── view map (existing vs pending)
├── content inventory
├── card sorting
└── information architecture

Design Brief   ← entregable central
├── objective
├── base actual (herencia)
├── users and context
├── main flow
├── views
│   ├── login
│   ├── challenge list
│   └── leaderboard
├── tone and visual direction
├── restrictions
├── out of scope
├── decisions and evidence
└── acceptance criteria

OpenPencil
├── Page: Brief
├── Page: Architecture
├── Page: Priority View Exploration
└── Page: Handoff

Frontend Proposal
├── routes / feature folders
├── shared tokens and components
├── issues
└── open questions
```

---

## Recursos Complementarios

| Concepto            | Tipo                | Referencia                                                                                                        |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Design Systems y UX | Taller Backbone UTP | [Taller con Luisa Bañol](https://www.youtube.com/live/2y55BwzpaI8)                                                |
| Backbone Judge      | Repositorio         | [Backbone-UTP/judge-front](https://github.com/Backbone-UTP/judge-front)                                           |
| Backbone Judge      | Diseños             | [Judge v1 en Figma](https://www.figma.com/design/6pint4WKnnJeDq8vIme4uU/Judge-v1)                                 |
| Backbone Judge      | Issues              | [Challenge View](https://github.com/Backbone-UTP/judge-front/issues)                                              |
| Auth / Login        | Sesión previa       | [Front / 07-04 — Flujos autenticados](../07-04/README.md)                                                         |
| OpenPencil          | Repositorio         | [github.com/open-pencil/open-pencil](https://github.com/open-pencil/open-pencil)                                  |
| OpenPencil          | Documentación       | [openpencil.dev](https://openpencil.dev/)                                                                         |
| OpenPencil          | Aplicación web      | [app.openpencil.dev](https://app.openpencil.dev/)                                                                 |
| Organización        | Documentación       | [Layers & Pages](https://openpencil.dev/user-guide/layers-and-pages)                                              |
| Layout              | Documentación       | [Auto Layout](https://openpencil.dev/user-guide/auto-layout)                                                      |
| Componentes         | Documentación       | [Components](https://openpencil.dev/user-guide/components)                                                        |
| Variables           | Documentación       | [Variables](https://openpencil.dev/user-guide/variables)                                                          |
| Automatización      | Documentación       | [Automation](https://openpencil.dev/programmable/)                                                                |
| MCP                 | Documentación       | [MCP Server](https://openpencil.dev/programmable/mcp-server)                                                      |
| CSS                 | Documentación       | [MDN Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model) |
| MCP                 | Protocolo           | [Model Context Protocol](https://modelcontextprotocol.io/)                                                        |

---

## Después de la Sesión

El siguiente paso será tomar el brief de extensión e implementar una de las vistas pendientes (por ejemplo Login o lista de retos) como feature Angular, reutilizando tokens y patrones del `challenge-workspace`.

No evaluaremos solamente si “se parece”. También revisaremos si las decisiones pueden rastrearse hasta el brief, la auditoría del estado actual y el dominio del juez. Además:

- si la vista nueva hereda el lenguaje visual del Judge;
- si la estructura es mantenible;
- si los componentes compartidos tienen sentido fuera del workspace;
- si los estados del brief están contemplados;
- si el flujo Login → lista → workspace → leaderboard sigue resolviendo el objetivo inicial.

El canvas es un medio. El brief es el contrato. El producto es la experiencia que construimos.

---

¡Nos vemos en la sesión! Trae preguntas, criterio y ganas de convertir el Judge actual en un recorrido completo — sin rediseñar lo que ya funciona.
