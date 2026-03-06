# 📚 Guía Previa: Sesión 01 - 2026 I

## Introducción a Backend con Node.js y APIs REST

---

### 📖 Información del Documento

- **Nombre**: Primeros pasos en desarrollo backend
- **Autor**: Jhon Gaviria
- **Formato**: Guía de lectura y vídeos introductorios
- **Página**: Back / 02-21
- **Fecha**: Febrero 2026
- **Notas**: Este material se debe revisar antes de la clase para aprovechar mejor la sesión práctica.

---

## 👋 ¿Por qué esta lectura previa?

Hola 🦒 Antes de nuestra primera sesión de backend, queremos que llegues con una base clara. Esta guía te ayudara a entender el contexto de Node.js, el rol del backend en una aplicación real y el vocabulario mínimo para construir APIs.

**No necesitas dominar todo antes de clase.** El objetivo es que llegues con una visión general para que en sesión podamos enfocarnos en práctica, dudas reales y buenas decisiones de implementación.

---

## 📋 REPASO - Conceptos que ya deberías ubicar

### 1. Frontend vs Backend

**¿Por qué es importante?**
Si no diferencias bien estos roles, es difícil tomar decisiones de arquitectura.

**Qué deberías saber:**

- Frontend: lo que ve y usa el usuario (UI, formularios, vistas)
- Backend: lógica de negocio, seguridad, datos, autenticación y reglas
- El frontend consume endpoints del backend mediante HTTP
- Un backend puede atender web, móvil y otros clientes al mismo tiempo

---

### 2. JavaScript fuera del navegador

**¿Por qué importa?**
Node.js te permite usar JavaScript del lado del servidor.

**Qué deberías saber:**

- Node.js es un runtime, no un framework
- Puedes ejecutar archivos `.js` desde terminal
- El backend suele manejar operaciones asíncronas (I/O, DB, APIs)
- Comprender `async/await` te ahorra muchos errores

---

### 3. NPM y package.json

**¿Por qué lo necesitas?**
NPM es el gestor de paquetes y scripts del ecosistema Node.

**Qué deberías saber:**

- `npm init -y` crea el `package.json`
- `npm install` agrega dependencias
- `npm run <script>` ejecuta tareas del proyecto
- `node_modules/` no se edita manualmente

---

## 🚀 CONCEPTOS CLAVE de esta primera sesión

### 1. ¿Qué es Node.js en términos prácticos?

Node.js permite construir servicios backend en JavaScript con alto rendimiento para tareas de I/O. En clase veras por qué es tan usado en APIs y microservicios.

### 2. ¿Qué es una API REST?

Una API REST es un contrato para intercambiar datos usando HTTP. Aprenderemos la idea central de recursos y métodos:

- `GET`: leer datos
- `POST`: crear datos
- `PUT/PATCH`: actualizar datos
- `DELETE`: eliminar datos

### 3. ¿Qué es un endpoint?

Un endpoint es una ruta del backend que responde a una solicitud. Ejemplo:

- `GET /saludo`
- Respuesta: `{ "message": "Hola backend" }`

### 4. Flujo mínimo de un proyecto backend

En sesión construiremos una base simple:

1. Crear proyecto Node
2. Definir scripts en `package.json`
3. Ejecutar código desde terminal
4. Preparar estructura para levantar una API

---

## 🎥 Vídeos para ver antes de clase

### Obligatorios (ver completos)

1. **Aprende NodeJS en 15 Minutos**  
   <https://www.youtube.com/watch?si=s0lzcPWSYhDCNKD4&v=ehTjz66L1_I&feature=youtu.be>

2. **Curso de Node.js desde cero - JSCamp by InfoJobs**  
   <https://www.youtube.com/watch?v=98U-Siuop9M>

### Recomendados (opcionales)

Si quieres llegar más fuerte, revisa ademas 1 recurso corto de cada tema:

- **HTTP para principiantes**: métodos, headers, status codes
- **REST API para principiantes**: recursos, rutas y respuestas JSON

Búsquedas sugeridas en YouTube:

- `HTTP methods GET POST PUT DELETE explicado`
- `cómo funciona el protocolo HTTP`
- `REST API para principiantes`
- `Node.js Express API desde cero`

---

## ⏱️ Qué haremos en la sesión

- **Bloque 1**: contexto backend + Node.js sin humo
- **Bloque 2**: flujo de proyecto con NPM y estructura inicial
- **Bloque 3**: introducción a endpoints y contrato REST
- **Bloque 4**: cierre con dudas y siguiente paso (Express)

---

## 💡 Preparación recomendada antes de entrar

✅ **Checklist rópido:**

- Node.js LTS instalado
- Editor listo (VS Code recomendado)
- Terminal funcionando
- Vídeos obligatorios vistos
- Mínimo 3 dudas anotadas para discutir en clase

❗ **Importante:**

- No te frustres si no entiendes todo a la primera
- Queremos que llegues con contexto, no que te vuelvas experto de la noche a la mañana

---

## 🧪 Mini práctica opcional (15 minutos)

Si quieres calentar antes de la sesión:

1. Crea una carpeta `backend-intro`
2. Ejecuta en la carpeta `npm init -y`
3. Crea un archivo `index.js` con:

```js
console.log("Backend listo para iniciar");
```

4. Ejecuta en consola `node index.js`

Si esto te funciona, llegas con el entorno listo para avanzar mas rápido en clase.

---

## 🚀 Después de esta sesión

El siguiente paso será construir un servidor básico con Express y crear el primer endpoint funcional para consumirlo desde cliente.

**Nos vemos en clase. Llega con curiosidad y preguntas.**
