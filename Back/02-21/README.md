# 📚 Guia Previa: Sesion 01 - 2026 I

## Introduccion a Backend con Node.js y APIs REST

---

### 📖 Informacion del Documento

- **Nombre**: Primeros pasos en desarrollo backend
- **Autor**: Equipo docente Backbone
- **Formato**: Guia de lectura y video previo
- **Pagina**: Back / 02-21
- **Fecha**: Febrero 2026
- **Notas**: Este material se debe revisar antes de la clase para aprovechar mejor la sesion practica.

---

## 👋 ¿Por que esta lectura previa?

Hola 👋 Antes de nuestra primera sesion de backend, queremos que llegues con una base clara. Esta guia te ayudara a entender el contexto de Node.js, el rol del backend en una aplicacion real y el vocabulario minimo para construir APIs.

**No necesitas dominar todo antes de clase.** El objetivo es que llegues con una vision general para que en sesion podamos enfocarnos en practica, dudas reales y buenas decisiones de implementacion.

---

## 📋 REPASO - Conceptos que ya deberias ubicar

### 1. Frontend vs Backend

**¿Por que es importante?**
Si no diferencias bien estos roles, es dificil tomar decisiones de arquitectura.

**Que deberias saber:**

- Frontend: lo que ve y usa el usuario (UI, formularios, vistas)
- Backend: logica de negocio, seguridad, datos, autenticacion y reglas
- El frontend consume endpoints del backend mediante HTTP
- Un backend puede atender web, movil y otros clientes al mismo tiempo

---

### 2. JavaScript fuera del navegador

**¿Por que importa?**
Node.js te permite usar JavaScript del lado del servidor.

**Que deberias saber:**

- Node.js es un runtime, no un framework
- Puedes ejecutar archivos `.js` desde terminal
- El backend suele manejar operaciones asincronas (I/O, DB, APIs)
- Comprender `async/await` te ahorra muchos errores

---

### 3. NPM y package.json

**¿Por que lo necesitas?**
NPM es el gestor de paquetes y scripts del ecosistema Node.

**Que deberias saber:**

- `npm init -y` crea el `package.json`
- `npm install` agrega dependencias
- `npm run <script>` ejecuta tareas del proyecto
- `node_modules/` no se edita manualmente

---

## 🚀 CONCEPTOS CLAVE de esta primera sesion

### 1. ¿Que es Node.js en terminos practicos?

Node.js permite construir servicios backend en JavaScript con alto rendimiento para tareas de I/O. En clase veras por que es tan usado en APIs y microservicios.

### 2. ¿Que es una API REST?

Una API REST es un contrato para intercambiar datos usando HTTP. Aprenderemos la idea central de recursos y metodos:

- `GET`: leer datos
- `POST`: crear datos
- `PUT/PATCH`: actualizar datos
- `DELETE`: eliminar datos

### 3. ¿Que es un endpoint?

Un endpoint es una ruta del backend que responde a una solicitud. Ejemplo:

- `GET /saludo`
- Respuesta: `{ "message": "Hola backend" }`

### 4. Flujo minimo de un proyecto backend

En sesion construiremos una base simple:

1. Crear proyecto Node
2. Definir scripts en `package.json`
3. Ejecutar codigo desde terminal
4. Preparar estructura para levantar una API

---

## 🎥 Videos para ver antes de clase

### Obligatorios (ver completos)

1. **Aprende NodeJS en 15 Minutos**  
   <https://www.youtube.com/watch?si=s0lzcPWSYhDCNKD4&v=ehTjz66L1_I&feature=youtu.be>

2. **Curso de Node.js desde cero - JSCamp by InfoJobs**  
   <https://www.youtube.com/watch?v=98U-Siuop9M>

### Recomendados (opcionales)

Si quieres llegar mas fuerte, revisa ademas 1 recurso corto de cada tema:

- **HTTP para principiantes**: metodos, headers, status codes
- **REST API para principiantes**: recursos, rutas y respuestas JSON

Busquedas sugeridas en YouTube:

- `HTTP methods GET POST PUT DELETE explicado`
- `REST API para principiantes`
- `Node.js Express API desde cero`

---

## ⏱️ Que haremos en la sesion

- **Bloque 1**: contexto backend + Node.js sin humo
- **Bloque 2**: flujo de proyecto con NPM y estructura inicial
- **Bloque 3**: introduccion a endpoints y contrato REST
- **Bloque 4**: cierre con dudas y siguiente paso (Express)

---

## 💡 Preparacion recomendada antes de entrar

✅ **Checklist rapido:**

- Node.js LTS instalado
- Editor listo (VS Code recomendado)
- Terminal funcionando
- Videos obligatorios vistos
- Minimo 3 dudas anotadas para discutir en clase

❗ **Importante:**

- No te frustres si no entiendes todo a la primera
- Queremos que llegues con contexto, no con perfeccion

---

## 🧪 Mini practica opcional (15 minutos)

Si quieres calentar antes de la sesion:

1. Crea carpeta `backend-intro`
2. Ejecuta `npm init -y`
3. Crea `index.js` con:

```js
console.log("Backend listo para iniciar");
```

4. Ejecuta `node index.js`

Si esto te funciona, llegas con el entorno listo para avanzar mas rapido en clase.

---

## 🚀 Despues de esta sesion

El siguiente paso sera construir un servidor basico con Express y crear el primer endpoint funcional para consumirlo desde cliente.

**Nos vemos en clase. Llega con curiosidad y preguntas.**
