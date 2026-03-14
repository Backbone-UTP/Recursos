# Guia Previa: Sesion 02 - 2026 I

## Angular Moderno: Arquitectura, Reactividad y Seguridad del Ecosistema

---

### Informacion del Documento

- **Nombre**: Angular Moderno
- **Autor**: Sergio Estrella
- **Formato**: Guia de Lectura (Documentacion)
- **Pagina**: Front / 03-14
- **Fecha**: Marzo 2026
- **Notas**: Este documento continua la sesion anterior y prepara los conceptos que aplicaremos.

---

## Por Que Esta Guia Es Importante

En la sesion anterior vimos el panorama general de desarrollo frontend moderno. En esta segunda clase nos enfocaremos en **Angular por dentro**: como estructurar aplicaciones, como reaccionar a cambios de estado con mejor performance y como tomar decisiones tecnicas mas seguras en el ecosistema Node.

El objetivo no es memorizar teoria. El objetivo es que llegues con contexto para que, durante la practica, puedas implementar con criterio.

---

## Objetivo de la Clase (2 horas)

Al finalizar la sesion deberias poder:

- Diferenciar `NgModule` y `Standalone`, y decidir cual usar en proyectos nuevos.
- Usar `signals` para manejar estado local de componentes.
- Explicar el rol historico de `Zone.js` y por que Angular evoluciona hacia enfoques zoneless.
- Diseñar componentes y servicios con responsabilidades claras.
- Aplicar buenas practicas basicas para reducir riesgos de seguridad en dependencias NPM.
- Entender por que `pnpm` es una alternativa moderna para gestionar paquetes.

---

## Conceptos Clave Para La Sesion

### 1. Angular (Vision General)

**Descripcion**
Angular es un framework frontend orientado a construir aplicaciones escalables usando TypeScript, componentes, inyeccion de dependencias y herramientas integradas para routing, testing y compilacion.

**Como aplicarlo en clase**

- Crear o analizar una aplicacion Angular identificando su estructura principal (`src/app`, configuracion, assets).
- Entender el flujo base: componente -> template -> evento -> cambio de estado -> render.
- Usar Angular CLI para tareas repetitivas (`ng generate`, `ng serve`, `ng test`).

**Aprende mas**

- Blog/Doc: [Angular Docs - Overview](https://angular.dev/overview)
- Video: [Angular en 10 minutos](https://youtu.be/4PYwCI1LFqs)
- Video: [Masterclass Angular Moderno - 11 hrs 46 mins](https://youtu.be/R1QePsia5xk)

---

### 2. Module vs Standalone

**Descripcion**
Para tomar una buena decision aqui, primero hay que separar conceptos.

**Que significa un Module (`NgModule`)**

Un `NgModule` es una unidad de organizacion de Angular clasico. Su objetivo es agrupar piezas relacionadas de la app (componentes, directivas, pipes, servicios y modulos importados) y declarar que partes son publicas o internas.

En practica, un modulo centraliza:

- `declarations`: componentes/directivas/pipes que pertenecen al modulo.
- `imports`: otros modulos necesarios (por ejemplo `CommonModule`, `FormsModule`).
- `providers`: servicios disponibles en ese alcance.
- `exports`: piezas que otros modulos podran reutilizar.

**Que significa Standalone**

`Standalone` es un enfoque donde un componente, directiva o pipe puede funcionar sin ser declarado dentro de un `NgModule`. En lugar de depender de un modulo para saber que usa, el propio componente declara sus dependencias en `imports`.

La idea principal es: **menos capas intermedias, mas claridad local**. Esto reduce boilerplate y simplifica onboarding, especialmente en proyectos nuevos.

**Diferencia conceptual corta**

- `NgModule`: organizacion por contenedores de declaracion.
- `Standalone`: organizacion por componentes autocontenidos.

No significa que uno sea "malo" y otro "bueno". Significa que Angular evoluciono y hoy recomienda standalone para nuevos desarrollos, mientras que modulos siguen siendo validos en bases existentes.

**Ejemplo de estructura con Modules (Angular clasico)**

```text
src/
 app/
  app.module.ts
  app-routing.module.ts
  app.component.ts
  features/
   users/
    users.module.ts
    users-routing.module.ts
    pages/
     users-list.component.ts
    services/
     users.service.ts
```

En este esquema, cada feature suele tener su `*.module.ts` y el enrutamiento suele pasar por modulos de routing.

**Ejemplo de estructura con Standalone (Angular moderno)**

```text
src/
 main.ts
 app/
  app.config.ts
  app.routes.ts
  app.component.ts
  features/
   users/
    pages/
     users-list.component.ts
     users-detail.component.ts
    data-access/
     users.service.ts
    ui/
     user-card.component.ts
```

Aqui las rutas cargan componentes standalone directamente y cada componente define sus `imports` segun necesidad.

**Cuando elegir cada enfoque**

- Usa `Standalone` en proyectos nuevos o cuando inicias una feature nueva desde cero.
- Usa `NgModule` cuando trabajas sobre una base legacy que ya esta modularizada y migrar todo no aporta valor inmediato.
- Usa enfoque hibrido cuando migras por etapas (convivir modulo + standalone es posible).

**Como aplicarlo en clase**

- Revisar una estructura clasica con `AppModule` para identificar `declarations`, `imports`, `providers` y `exports`.
- Revisar una estructura moderna con `bootstrapApplication` y rutas standalone.
- Crear un componente standalone e importar explicitamente `CommonModule` u otras dependencias.
- Aplicar criterio de arquitectura: nuevo desarrollo (standalone), sistema heredado (module) o migracion gradual (hibrido).

**Aprende mas**

- Blog/Doc: [Angular Docs - Standalone Components](https://angular.dev/guide/standalone-components)
- Blog/Doc: [Angular Docs - NgModules](https://angular.dev/guide/ngmodules/overview)
- Video: [Nuevos componentes standalone en Angular (11 min)](https://youtu.be/FUXM-Qxvfqg)

---

### 3. Signals

**Descripcion**
Antes de hablar de `signals`, hay que entender **reactividad**:

- Reactividad significa que la interfaz se actualiza cuando cambia el estado, sin que tengas que forzar manualmente cada render.
- En un enfoque no reactivo, cambias un dato y luego debes coordinar a mano que partes de la UI refrescar.
- En un enfoque reactivo, declaras dependencias y el sistema recalcula solo lo necesario.

`Signals` es el modelo reactivo moderno de Angular para manejar estado de forma declarativa y predecible. Introduce tres piezas principales:

- `signal`: guarda estado mutable reactivo.
- `computed`: calcula estado derivado (solo lectura) a partir de uno o mas signals.
- `effect`: ejecuta efectos secundarios cuando cambian dependencias reactivas.

La diferencia clave entre ellas es su responsabilidad:

- `signal` = fuente de verdad.
- `computed` = transformacion pura de esa verdad.
- `effect` = integracion con el "mundo externo" (logs, localStorage, llamadas imperativas).

Regla mental rapida: si vas a **guardar**, usa `signal`; si vas a **derivar**, usa `computed`; si vas a **sincronizar fuera del estado**, usa `effect`.

**Como aplicarlo en clase**

- Paso 1: crear estado base con `signal`.

```ts
contador = signal(0);
```

- Paso 2: crear estado derivado con `computed` (sin duplicar datos).

```ts
dobleContador = computed(() => this.contador() * 2);
```

- Paso 3: usar `effect` solo para efectos secundarios.

```ts
effect(() => {
 console.log('Contador actualizado:', this.contador());
});
```

**Cuando usar cada uno**

- Usa `signal` cuando el valor cambia por interaccion del usuario, respuesta HTTP o eventos internos del componente.
- Usa `computed` cuando un valor depende de otros y no debe guardarse dos veces (evita inconsistencias).
- Usa `effect` para tareas imperativas: persistir en `localStorage`, enviar telemetria, integrar librerias externas, debug.

**Buenas practicas para no confundirse**

- No uses `effect` para propagar estado que podria resolverse con `computed`.
- Evita poner logica de negocio pesada dentro de `effect`.
- Prefiere mantener pocos signals base y mas valores derivados con `computed`.
- Piensa el flujo asi: **estado minimo -> derivacion -> efecto externo**.

**Aprende mas**

- Blog/Doc: [Angular Docs - Signals](https://angular.dev/guide/signals)
- Blog/Doc: [Angular Docs - Dependent state with computed](https://angular.dev/guide/signals#computed-signals)
- Video: [Que es y como funcionan las signals (7 mins)](https://youtu.be/fcm_PmQ-nfY)
- Video: [Angular Signals Masterclass (42 mins)](https://youtu.be/pZVWU9DAJvo)

---

### 4. Zone.js (Y por que Angular se aleja de el)

**Descripcion**
`Zone.js` permitio durante anos que Angular detectara cambios automaticamente interceptando tareas asincronas. El costo de este enfoque es que puede activar deteccion de cambios mas veces de lo necesario y volver menos predecible el rendimiento en apps grandes.

Angular moderno ha avanzado hacia estrategias mas explicitas (incluyendo `signals` y configuraciones zoneless) para tener mejor control, menor sobrecarga y mejor performance.

**Como aplicarlo en clase**

- Entender que problema resolvia `Zone.js` en Angular clasico.
- Identificar escenarios donde la deteccion implicita genera trabajo extra.
- Relacionar `signals` con un modelo mas explicito de actualizacion de UI.

**Aprende mas**

- Blog/Doc: [Angular Roadmap](https://angular.dev/roadmap)
- Video: [Guia zoneless (10 min)](https://youtu.be/EWtma0v-WzQ)

---

### 5. Components (Angular)

**Descripcion**
Los componentes son la unidad basica de construccion en Angular. Cada componente encapsula estructura (HTML), comportamiento (TypeScript) y estilo (CSS/SCSS), permitiendo reutilizacion y separacion clara de responsabilidades.

**Como aplicarlo en clase**

- Disenar componentes pequenos y enfocados (por ejemplo: tarjeta de usuario, boton de accion, formulario de login).
- Definir entradas y salidas (`@Input`, `@Output` o APIs modernas equivalentes) para comunicar componentes.
- Evitar componentes "gigantes" separando logica de negocio en servicios.

**Aprende mas**

- Blog/Doc: [Angular Docs - Components](https://angular.dev/guide/components)
- Video: [Angular - Componentes (4 min)](https://youtu.be/K_6ixeC7GbM)

---

### 6. Services (Angular)

**Descripcion**
Los servicios concentran logica reutilizable y acceso a datos (API, estado compartido, utilidades). Se consumen mediante inyeccion de dependencias, lo que mejora testabilidad y desacoplamiento.

**Como aplicarlo en clase**

- Crear un servicio para obtener datos simulados o reales via HTTP.
- Inyectar el servicio en componentes en lugar de duplicar logica.
- Definir una regla simple: el componente presenta, el servicio orquesta datos y reglas de negocio.

**Aprende mas**

- Blog/Doc: [Angular Docs - Dependency Injection](https://angular.dev/guide/di)
- Video: [Angular - Servicios (10 min)](https://youtu.be/ehv9_wYfAfU)

---

### 7. Vulnerabilidades en NPM (Supply Chain Attacks y similares)

**Descripcion**
El ecosistema NPM es enorme y util, pero tambien puede introducir riesgos: paquetes maliciosos, dependencias comprometidas, typosquatting (nombres parecidos), o librerias abandonadas con vulnerabilidades.

Un solo `npm install` sin criterio puede abrir la puerta a problemas de seguridad en desarrollo y produccion.

**Como aplicarlo en clase**

- Ejecutar auditorias (`npm audit` o herramientas equivalentes) para detectar vulnerabilidades conocidas.
- Evaluar dependencias antes de instalarlas: mantenimiento, comunidad, reputacion, frecuencia de releases.
- Aplicar higiene minima: bloquear versiones, revisar changelogs, minimizar dependencias innecesarias.

**Aprende mas**

- Blog/Doc: [npm audit documentation](https://docs.npmjs.com/cli/v10/commands/npm-audit)

---

### 8. PNPM

**Descripcion**
`pnpm` es un gestor de paquetes compatible con el ecosistema Node, enfocado en eficiencia de disco y velocidad. En lugar de duplicar archivos de dependencias por proyecto, reutiliza contenido mediante un almacenamiento global direccionado por contenido.

Esto reduce espacio, acelera instalaciones y mejora consistencia en equipos.

**Como aplicarlo en clase**

- Instalar dependencias con `pnpm install` y ejecutar scripts con `pnpm run`.
- Comparar tiempos y estructura de `node_modules` frente a npm.
- Usar `pnpm-lock.yaml` para garantizar instalaciones reproducibles.

**Aprende mas**

- Blog/Doc: [PNPM Documentation](https://pnpm.io/)
- Blog: [Why should we use pnpm?](https://pnpm.io/motivation)
- Video: [Solucion ataques npm](https://youtu.be/c3s0ZEwpolI)

---

## Agenda

 **Bloque 1:** Fundamentos de Arquitectura Angular
 **Bloque 2:** Reactividad y Render en Angular Moderno
 **Bloque 3:** Diseno de Componentes y Servicios
 **Bloque 4:** Seguridad y Herramientas del Ecosistema Node

---

## Recomendaciones Antes De La Clase

- Tener Node.js LTS instalado.
- Tener Angular CLI disponible.
- Tener instalado `pnpm` (`npm install -g pnpm`).

---

## Entregable Esperado De La Sesion

Durante la clase construiremos el repositorio base para el proyecto del Juez, con los siguientes requisitos:

- Estructura moderna (standalone).
- Al menos 2 componentes y 1 servicio.
- Ejemplo pequeno de estado con `signals`.
- Checklist rapido de seguridad de dependencias.
