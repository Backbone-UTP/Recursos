# Guia Previa: Sesion 02 - 2026 I

## Docker + Base de Datos local + Conexion desde Node.js

---

### Informacion del documento

- **Nombre**: Entorno backend con contenedores y conexion a base de datos
- **Autor**: Jhon Gaviria
- **Formato**: Guia de lectura y video previo
- **Pagina**: Back / 03-21
- **Fecha**: Marzo 2026
- **Notas**: Esta guia se revisa antes de clase para llegar con contexto tecnico y entorno listo.

---

## Por que esta lectura previa

En esta segunda sesion vamos a conectar nuestro backend a una base de datos real. Para evitar problemas de instalacion entre equipos, primero veremos Docker y luego levantaremos MySQL o PostgreSQL dentro de contenedores.

Ademas, revisaremos una conexion alternativa usando Turso para entender una opcion moderna de base de datos en la nube.

**Objetivo de esta lectura:** que llegues entendiendo el "que" y el "por que", para que en clase nos enfoquemos en el "como".

---

## REPASO - Conceptos base

### 1. Que es Docker

**Idea clave:** Docker permite ejecutar aplicaciones en contenedores aislados y reproducibles.

**Por que lo usamos en backend:**

- Evita el clasico "en mi maquina si funciona"
- Estandariza versiones (MySQL/PostgreSQL)
- Facilita compartir entornos entre todo el equipo
- Hace mas simple levantar y apagar servicios

### 2. Imagen vs Contenedor

- **Imagen**: plantilla (como la receta)
- **Contenedor**: instancia corriendo (como el plato servido)

### 3. Docker Compose

Compose permite declarar servicios en un archivo `docker-compose.yml`.

En vez de ejecutar comandos largos, definimos:

- nombre del servicio,
- imagen de DB,
- puertos,
- variables de entorno,
- volumenes para persistencia.

---

## CONCEPTOS NUEVOS - Lo que veremos en sesion

### 1. Levantar una DB con Docker (MySQL o PostgreSQL)

Vamos a iniciar una base local con contenedores para usarla desde Node.js.

**Ejemplo de decision tecnica:**

- MySQL: muy usado en apps tradicionales y stacks LAMP
- PostgreSQL: muy fuerte en SQL avanzado y buenas practicas modernas

En clase puedes usar cualquiera de los dos motores.

### 2. Variables de entorno para conexion

Una conexion backend no debe hardcodearse.

Usaremos variables como:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

### 3. Conexion desde Node.js

Una vez la DB este corriendo, el backend debe:

1. abrir conexion,
2. validar que responde,
3. manejar errores de red/autenticacion,
4. cerrar conexion cuando corresponda.

### 4. Conexion con Turso (intro)

Tambien veremos una ruta alterna con Turso para que conozcas una opcion cloud-first basada en SQLite distribuido.

**Que nos interesa de Turso en esta etapa:**

- crear base de forma rapida,
- obtener credenciales,
- conectarse desde Node.js,
- comparar con una DB local en Docker.

---

## Video base de la sesion

### Obligatorio

1. **Docker Compose con Nodejs y MySQL Tutorial**  
   <https://www.youtube.com/watch?v=Aj8E-Vhs1VM>

---

## Videos recomendados para complementar

Para llegar mas preparado, agrega 1 recurso corto por tema:

1. **Docker desde cero** (contenedores, imagenes, puertos, volumenes)
2. **PostgreSQL para principiantes** o **MySQL para principiantes**
3. **Conexion Node.js a PostgreSQL/MySQL**
4. **Turso + Node.js** (setup y primer query)

Busquedas sugeridas en YouTube:

- `Docker desde cero contenedores`
- `PostgreSQL para principiantes`
- `Node.js conectar a MySQL`
- `Node.js conectar a PostgreSQL`
- `Turso Node.js tutorial`

---

## Que haremos en la sesion

- **Bloque 1**: Docker sin humo (que problema resuelve)
- **Bloque 2**: levantar DB local con `docker compose`
- **Bloque 3**: conectar backend Node.js y ejecutar primer query
- **Bloque 4**: mini demo con Turso y comparacion de enfoques

---

## Mini curso express: instalar Docker y Docker Compose

### Windows (recomendado: Docker Desktop)

1. Activa virtualizacion en BIOS/UEFI (si no esta activa).
2. Habilita WSL2 (PowerShell como admin):

```powershell
wsl --install
```

3. Reinicia el equipo.
4. Instala Docker Desktop:
   <https://www.docker.com/products/docker-desktop/>
5. Abre Docker Desktop y espera a que diga "Engine running".
6. Verifica en terminal:

```bash
docker --version
docker compose version
```

Si ambos comandos responden, ya quedaste listo.

### Linux (Ubuntu/Debian)

1. Actualiza paquetes:

```bash
sudo apt update
```

2. Instala Docker Engine:

```bash
sudo apt install -y docker.io
```

3. Inicia y habilita el servicio:

```bash
sudo systemctl enable --now docker
```

4. Instala plugin de Compose:

```bash
sudo apt install -y docker-compose-plugin
```

5. (Opcional recomendado) evita usar `sudo` en cada comando:

```bash
sudo usermod -aG docker $USER
```

Luego cierra sesion y vuelve a entrar.

6. Verifica instalacion:

```bash
docker --version
docker compose version
docker run hello-world
```

### Solucion rapida de problemas comunes

- Si `docker compose` no existe, revisa que instalaste el plugin `docker-compose-plugin`.
- Si aparece "permission denied" en Linux, agrega tu usuario al grupo `docker` y reinicia sesion.
- Si Docker Desktop no arranca en Windows, valida WSL2 y virtualizacion.

---

## Checklist antes de clase

✅ **Entorno minimo listo:**

- Docker Desktop instalado (o Docker Engine en Linux)
- `docker --version` y `docker compose version` funcionando
- Node.js LTS instalado
- Video obligatorio visto
- Dudas anotadas (minimo 3)

✅ **Conceptos que debes ubicar:**

- diferencia entre imagen y contenedor
- para que sirve `docker-compose.yml`
- que datos necesita una cadena de conexion

---

## Despues de esta sesion

El siguiente paso sera modelar tablas, crear un CRUD inicial y comenzar a estructurar una capa de acceso a datos en el backend.

**Nos vemos en clase. Llega con preguntas tecnicas y muchas ganas de aprender**
