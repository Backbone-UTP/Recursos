# 📚 Guía Previa: Sesión 01 - 2026 I

## Diseño Moderno con Angular, Sistemas de Diseño y AI IDEs

---

### 📖 Información del Documento

- **Nombre**: Conceptos Fundamentales en Desarrollo Frontend Moderno
- **Autor**: Sergio Estrella
- **Formato**: Guía de Lectura (Documentación)
- **Página**: Front / 02-14
- **Fecha**: Febrero 2026
- **Notas**: Este documento es material de apoyo previo a la sesión. Se recomienda leerlo con atención antes de asistir.

---

## 👋 ¿Por Qué Esta Lectura Previa?

Hola 👋 Antes de nuestra sesión, queremos que llegues preparado. Esta guía te introduce a los conceptos clave que cubriremos, desde fundamentos que probablemente ya conoces, hasta técnicas modernas que revolucionan la forma en que desarrollamos interfaces.

**No te preocupes si algunos conceptos parecen nuevos o complejos.** El objetivo de esta lectura es que entiendas el "qué" y el "por qué" antes de ver el "cómo" en clase. Así aprovecharemos mejor el tiempo juntos.

---

## 📋 REPASO - Conceptos que Ya Conoces

### 1. Node.js

**¿Por qué lo necesitas?**
Node.js es lo que permite ejecutar JavaScript en tu computadora como si fuera una aplicación de escritorio. Sin Node, todo lo que hagas en Angular/React/Astro/etc solo funcionaría en el navegador. Es como el "corazón" de tu entorno de desarrollo.

**Qué deberías saber:**

- Al instalar, busca la versión LTS (Long Term Support) para estabilidad
- Iniciar un proyecto con `npm init` (crea el archivo `package.json`)
- Instalar paquetes con `npm install` (es el gestor de librerías JavaScript)
- Ejecutar comandos del proyecto con `npm run`
- Angular CLI y muchas otras herramientas dependen de Node para funcionar

**Aprende más:**

- [Node.js Oficial - nodejs.org](https://nodejs.org/)
- [Explicación animada ¿Qué es Node.js? - 3 mins](https://youtu.be/xJzzu7MVZXw)
- [Node.js Curso Intensivo - 2 hrs 11 mins](https://youtu.be/z4x1OGfJkek)

---

### 2. NPM (Node Package Manager)

**¿Por qué lo necesitas?**
NPM es el "supermercado" de código JavaScript. Te permite descargar librerías, herramientas y dependencias que otros desarrolladores han creado. Sin NPM, tendrías que escribir todo desde cero.

**Qué deberías saber:**

- `npm install` descarga las dependencias listadas en `package.json` (el archivo que dice "qué necesita este proyecto")
- `npm run` ejecuta scripts predefinidos (por ejemplo, `npm run dev` inicia el servidor de desarrollo)
- `package.json` es como una lista de compras del proyecto: "Necesito Angular, TypeScript, Prettier, etc."
- `node_modules/` es la carpeta donde NPM guarda todas las librerías (nunca la edites manualmente)

**¿Necesito entender cómo funciona todo?**
No. Básicamente: cuando clonas un proyecto, ejecutas `npm install` y listo. NPM se encarga del resto. En la siguiente sesión veremos este concepto en detalle, y durante el semestre lo usaremos en proyectos reales.

**Aprende más:**

- [NPM Official Docs](https://docs.npmjs.com/)

---

### 3. TypeScript

**¿Por qué lo necesitas?**
TypeScript es JavaScript super-potenciado. Imagina JavaScript pero con "contratos" que especifican qué tipo de datos espera cada función. Esto evita bugs y hace el código más legible y mantenible.

**Qué deberías saber:**

- **Tipos**: En lugar de solo escribir `let nombre`, escribes `let nombre: string = "Juan"`
- El compilador de TypeScript te atrapa errores ANTES de ejecutar el código (Compilation Time)
- Angular está escrito en TypeScript, así que es inevitable aprenderlo
- Al final, TypeScript se "compila" a JavaScript normal que entiende el navegador (Transpilation)

**Un ejemplo simple:**

```typescript
// Sin tipos (JavaScript) - fácil cometer errores
function saludar(persona) {
  return "Hola " + persona;
}

// Con tipos (TypeScript) - más seguro
function saludar(persona: string): string {
  return "Hola " + persona;
}
```

**¿No parece mucho trabajo?**
Al principio sí, pero evita errores tontos y hace debugging más fácil. Además, el autocompletado inteligente de VS Code funciona mejor con TypeScript.

**Aprende más:**

- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TypeScript en 15 minutos](https://youtu.be/9bmd15UgWtM)
- [TypeScript Curso Completo - 1 hr 42 mins](https://youtu.be/fUgxxhI_bvc)

---

### 4. Angular v21

**¿Por qué lo necesitas?**
Angular es un framework (una colección de herramientas prehechas) que te facilita construir aplicaciones web complejas y profesionales. En lugar de empezar desde cero, Angular te proporciona la estructura y las mejores prácticas ya incluidas.

En estas sesiones usaremos Angular v21, la última versión, que incluye mejoras de rendimiento, nuevas características y mejor integración con herramientas modernas.

**Qué deberías saber:**

- Los componentes son "bloques" reutilizables (piezas de LEGO que armas en aplicaciones grandes)
- El routing te permite navegar entre diferentes páginas sin recargar (Dependiendo del tipo de generación, veremos cómo funciona el routing moderno)
- Los servicios centralizan datos y lógica que múltiples componentes necesitan
- El patrón de inyección de dependencias hace que tu código sea más modular y testeable
- Angular CLI te ayuda a generar código y manejar tareas comunes

**¿Es complicado?**
Angular tiene una curva de aprendizaje, pero es extremadamente poderoso. En esta clase iremos paso a paso integando conceptos nuevos con Angular.

**Aprende más:**

- [Angular Documentation](https://angular.dev/overview)
- [Angular en 10 minutos](https://youtu.be/4PYwCI1LFqs)
- [Masterclass Angular Moderno - 11 hrs 46 mins](https://youtu.be/R1QePsia5xk)

---

### 5. Figma

**¿Por qué lo necesitas?**
Figma es "la verdad" sobre cómo debe verse tu aplicación. Es donde los diseñadores crean cómo se ve todo, pero aquí viene lo importante: **tú como desarrollador debes poder extraer información de Figma y convertirla en código.**

En nuestro caso, nos veremos involucrados en un flujo de trabajo donde el diseño y el desarrollo están estrechamente conectados. Figma no es solo para diseñadores, es una herramienta clave para los desarrolladores frontend modernos.

**Qué deberías saber:**

- En la etapa de diseño crean wireframes (bocetos) y prototipos en Figma
- Adicionalmente, documentan un Sistema de Diseño con componentes reutilizables (Veremos esto en clase)
- Puedes acceder a los colores exactos, tamaños de fuente, espaciados desde Figma
- La colaboración en tiempo real permite que diseño y desarrollo trabajen juntos

**¿Necesito saber diseño?**
No. Pero necesitas entender cómo leer y extraer información de Figma para implementarla en código. En clase veremos exactamente cómo hacer esto.

**Aprende más:**

- [Figma Official Guide](https://www.figma.com/best-practices/)
- [El curso de Figma más corto del mundo - 6 mins](https://youtu.be/D67dsBh1_uc)
- [Curso de Introducción a Figma - 2 hrs](https://youtu.be/VdS9ZGHHXWQ)

---

## 🚀 CONCEPTOS NUEVOS - El Futuro del Desarrollo Frontend

Estos conceptos pueden ser nuevos para ti, pero representan cómo está evolucionando la industria. **Veremos que están todos conectados**, y en la clase entenderás por qué importan.

### 1. Sistemas de Diseño

**¿Qué es en realidad?**
Imagina que trabajas en un equipo de varios desarrolladores. Cada uno hace botones, inputs, cards diferentes. Esto se puede volver un caos muy fácilmente. Un Sistema de Diseño es el acuerdo que dice: "Esto es un botón. Se ve exactamente así. Estas son sus variantes. Lo usamos igual en toda la app."

**Por qué cambió el juego:**

- Documentar componentes reutilizables como Button, Input, Card (cada uno con reglas claras)
- Crear una "biblia del diseño" que todos puedan consultar
- Que diseño y desarrollo hablen el mismo idioma
- Implementar estos componentes en nuestro front para reutilizarlos en toda la app

**Cómo lo verás en clase:**
Crearemos el sistema de diseño de nuestro proyecto (Juez de programación) en Figma, y luego lo implementaremos en Angular. Verás cómo esto hace que tu código sea más limpio y tu app más consistente.

**Para aprender más:**

- [Desiging Systems - Atomic Design](https://atomicdesign.bradfrost.com/chapter-1/)
- [Sistemas de Diseño ¿Qué son? ¿Cómo se hacen? - 1 hr 30 mins](https://www.youtube.com/live/7ayKxGFnulk?si=QlrDYFRmquao5BPL)

---

### 2. Tokens en Diseño

**¿Quieres una metáfora fácil?**
Los tokens son como las "constantes" en código, pero para diseño. En vez de escribir el color azul #0056B3 en cien lugares diferentes en tu código, defines una variable llamada `--color-primary` que representa ese color. Si luego el diseño cambia, cambias un solo lugar.

**Cómo funcionan:**

- Tokens de color: `--primary`, `--secondary`, `--success`, `--error`
- Tokens de espaciado: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`
- Tokens de tipografía: `--font-size-body`, `--font-size-heading`
- Todo esto sincronizado entre Figma y tu código

**La magia:**
¿Imaginaste que el cliente quiere cambiar su color principal en toda la app? En vez de editar 100 archivos, cambias un token. Boom. Todo se actualiza.

**Para aprender más:**

- [Tokens, variables and styles. Introduction to design systems - 13 mins](https://youtu.be/JyCmacSyDY4)

---

### 3. Diseño Atómico

**¿Cómo estructurar un proyecto sin perder la cabeza?**
El Diseño Atómico nos da una respuesta clara. Es como construir con LEGO: primero piezas pequeñas, luego más complejas.

**La pirámide:**

- **Átomos** son elementos básicos: Un botón, un input de texto, un icono, una etiqueta
- **Moléculas** combinan átomos: Un input + label = un campo de formulario
- **Organismos** son secciones completas: Un formulario entero, una barra de navegación
- **Templates** son esqueletos de páginas
- **Páginas** son el producto final

**Por qué lo usaremos:**
Angular y Sistemas de Diseño imponen esta estructura naturalmente. Si entiendes el Diseño Atómico, tu código será más limpio y tu app más mantenible.

**Para aprender más:**

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Atomic Design paso a paso - 8 mins](https://youtu.be/iwcBI13ids8)

---

### 4. AI IDEs

**¿La IA escribiendo código por ti?**
Sorpresa: ya está aquí. Un AI IDE es tu editor de código pero con "superpoderes": sugiere código mientras escribes, autocompletar inteligente, can generar tests automáticamente, y mucho más.

**Lo práctico:**

- Escribes un comentario describiendo lo que quieres hacer
- La IA sugiere el código
- Aceleras desarrollo drásticamente
- Tienes más tiempo para pensar en lógica y problemas complejos

**Importante:**
¿La IA te hará obsoleto? No. Pero quien aprenda a usar estas herramientas será mucho más productivo. En esta clase veremos cómo incorporar IA en tu flujo de trabajo.

**Para aprender más:**

- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Introducción a GitHub Copilot](https://www.youtube.com/live/EEJraJdHprM?si=wLuBV6rN3xR99iN7)

---

### 5. MCP (Model Context Protocol)

**¿Te imaginas tu IDE inteligente conectado a múltiples IAs y herramientas?**
MCP es el estándar que permite que eso suceda. Es como un "lenguaje común" que permite que la IA entienda y acceda a tus herramientas de desarrollo.

**Cómo lo usarás:**

- La IA no solo te sugiere código, sino que puede ejecutar comandos
- Puede abrir archivos, ejecutar tests, ver errores en tiempo real
- Automatiza tareas repetitivas: "Agéga tests para este componente"
- Un protocolo estándar que funciona con múltiples herramientas

**Por qué importa:**
Es el futuro de cómo los desarrolladores interactuarán con sus herramientas. Mientras antes entiendas esto, mejor preparado estarás.

**Para aprender más:**

- [Anthropic MCP Documentation](https://modelcontextprotocol.io/)
- [¿Qué es MCP? - 5 mins](https://youtu.be/QLsgTPzf32g)
- [Curso MCP - 1 hr 30 mins](https://youtu.be/wnHczxwukYY)

---

### 6. AGENTS.md

**¿Quiénes son los "agentes" en el desarrollo moderno?**
Son herramientas automatizadas que hacen trabajo por ti sin necesidad de que escribas cada línea. Pueden ser IAs, scripts, o flujos automáticos.

Ejemplos:

- Un agente que ejecuta tests cada vez que haces commit
- Una IA que genera documentación del código automáticamente
- Un script que formatea tu código para que siempre se vea igual

**Cómo influyen en tu trabajo:**

- Reducen tareas repetitivas
- Mejoran consistencia
- Permiten que te enfoques en lógica compleja
- Son cada vez más inteligentes (IA)

**En la clase:**
Veremos ejemplos de cómo agentes modernos optimizan el desarrollo frontend.

**Para aprender más:**

- [Programar sin AGENTS.MD es perder el tiempo - 7 mins](https://youtu.be/C3kn4fL8kFc)
- [Agentic Workflows Guide](https://www.anthropic.com/research)

---

### 9. Spec Driven Development

**¿Cómo deberías desarrollar en 2026?**
La respuesta: **siguiendo las especificaciones al pie de la letra.** No interpretaciones, no suposiciones.

**Cómo funciona:**

1. Diseñador crea especificación en Figma (colores, tamaños, interacciones)
2. Tú lees esa especificación
3. Implementas exactamente lo que dice (ni más, ni menos)
4. Escribes tests que validan que tu código sigue la spec
5. La calidad mejora drásticamente

**Por qué importa:**

- No hay debates sobre "el botón debería ser más grande"
- El diseñador ve rápidamente si el código respeta su visión
- Los bugs disminuyen porque hay clara definición de qué esperar

**Esto es el futuro del desarrollo frontend moderno.** Te mostraremos ejemplos prácticos en la clase.

**Para aprender más:**

- [Spec-Driven Development - 9 mins](https://youtu.be/pGcBdY7hgyc)
- [Design to Code Workflow - Medium](https://medium.com/search?q=spec+driven+development)

---

## 📚 Recursos Complementarios

Estos enlaces te ayudarán si quieres aprender más antes de la clase (opcional, pero recomendado):

| Concepto | Tipo | Referencia |
|----------|------|-----------|
| Node.js | Documentación | <https://nodejs.org/> |
| NPM | Documentación | <https://docs.npmjs.com/> |
| TypeScript | Documentación | <https://www.typescriptlang.org/docs/> |
| Angular | Framework | <https://angular.dev/> |
| Figma | Herramienta | <https://www.figma.com/> |
| Design Systems | Artículo | <https://www.nngroup.com/articles/design-systems-101/> |
| Design Tokens | Herramienta | <https://tokens.studio/> |
| Atomic Design | Libro | <https://atomicdesign.bradfrost.com/> |
| GitHub Copilot | Herramienta | <https://github.com/features/copilot> |
| MCP Protocol | Protocolo | <https://modelcontextprotocol.io/> |

---

## ⏱️ Qué Esperar en la sesión

La clase está diseñada para ser práctica y conectada:

- **10 min**: Bienvenida + Repasamos juntos Node, NPM, TypeScript, Angular y Figma (sin entrar en detalles profundos)
- **30 min**: Nos sumergimos en Sistemas de Diseño, Tokens y Diseño Atómico (aquí comenzamos lo nuevo)
- **30 min**: **Demostración en vivo**: Cómo implementar Spec Driven Development con ejemplo real
- **30 min**: AI IDEs, MCP y herramientas modernas en acción
- **20 min**: Q&A (tus preguntas) + Próximos pasos en tu carrera

---

## 💡 Consejos Antes de la Clase

✅ **Recomendado:**

- Instala Node.js (versión LTS) si no lo tienes
- Aprende los comandos básicos de NPM (`npm install`, `npm run`)
- Revisa los conceptos básicos de TypeScript (tipos, interfaces)
- Ten acceso a una cuenta de Figma (gratis)
- Lee esta guía completamente antes de llegar

❓ **Si tienes dudas entre ahora y la clase:**

- Revisa los enlaces "Para aprender más" en cada sección
- No intentes aprender todo de golpe, la clase está diseñada para conectar los puntos

🎯 **Mentalidad correcta:**

- Esta clase no es para "expertos", es para desarrolladores como tú que quieren actualizarse
- Los conceptos son nuevos para muchos, así que no te preocupes
- La práctica en la clase te aclarará todo

---

## 🚀 Después de la Sesión

Después del clase, tendremos:

- Acceso al repositorio con el código del proyecto
- Guía de Spec Driven Development paso a paso
- Configuración recomendada de VS Code

**Tu siguiente paso** será practicar lo aprendido. Estaremos disponibles para preguntas.

---

**¡Nos vemos en la sesión! Trae tus preguntas y tu curiosidad.** 🚀
