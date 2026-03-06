# 📚 Guía Previa: Sesión 03 - 2026 I

## Documentación técnica para Desarrolladores

---

### 📖 Información del Documento

- Nombre: Introducción a la Documentación Técnica
- Autor: Paula Castro
- Formato: Guía de Lectura (Documentación)
- Página: Otros Recursos / Technical Documentation / 03-07
- Fecha: Marzo 2026
- Notas: Se adelanta sesión de Technical Writing

## 👋 Antes de comenzar 

- Lee esta guía completa antes de la sesión, encontrarás recursos en inglés, si no es tu fuerte intenta apoyarte en el traductor, subtítulos o doblaje automático
- No pienses en la documentación como el manual de la nevera que nadie lee, piensa en ella como el paso a paso para armar tus muebles, sin el cual solo tendrías un montón de piezas sin orden
- Revisa la documentación de alguna herramienta o tecnología que uses frecuentemente, por ejemplo:
    - NodeJS
    - una librería de NPM que hayas usado recientemente

❓ Si tienes dudas antes de la clase:

- revisa los enlaces de **"Aprende más"** en cada sección
- prepara tus preguntas para la sesión

🎯 Mentalidad para la sesión:

- La documentación es ~inevitable~ indispensable en un proyecto de software, no debes temerle ni verla como tu enemiga
- No necesitas ser un gran escritor para escribir buena documentación

## 📋 Conceptos básicos

### 1. Qué es documentación 

La **documentación técnica** es cualquier información que explica cómo usar, entender, mantener o contribuir a un software.

Los desarrolladores interactuan con documentación **todos los días**, incluso si no lo notan.

Piensa en la última vez que:

- aprendiste una librería nueva
- buscaste cómo usar una API
- copiaste un ejemplo de código
- miraste un README en GitHub

Todo eso **es documentación**.

**Sin documentación, no hay open source.**

El código responde:

> ¿Cómo funciona esto internamente?

La documentación responde:

> ¿Cómo uso esto?

En esta sesión veremos **qué tipos de documentos existen y cómo escribirlos**.

#### Aprende más

- 📺 [Como LEER DOCUMENTACIÓN para DESARROLLADORES | Explicación completa (8 min)](https://www.youtube.com/watch?v=eVfpTD1ieIw)
 [REQUERIDO]

### Explora documentación

- 📚 [Documentación de Python 3.14.3](https://docs.python.org/es/3/)
[RECOMENDADO]


### 2. Quién escribe documentación
En los proyectos de software, **los desarrolladores siempre escriben algún tipo de documentación**, incluso cuando no lo llaman así.

Esto puede aparecer como:

- un README
- ejemplos de uso
- comentarios en el código
- documentación de una API
- instrucciones para ejecutar o configurar el proyecto

Muchas veces esta documentación está pensada **principalmente para otros desarrolladores**, como compañeros de equipo o personas que quieren contribuir al proyecto.

Esto ocurre porque los desarrolladores son quienes:

- conocen cómo funciona el sistema
- implementan nuevas funcionalidades
- entienden los detalles técnicos de la API o la arquitectura

En algunos equipos también existe el rol de **Technical Writer**.

El objetivo de este rol no es reemplazar la documentación que escriben los desarrolladores, sino **trabajar junto con ellos para hacerla más clara, consistente y fácil de usar**.

Por ejemplo, un technical writer puede ayudar a:

- organizar la documentación del proyecto
- estructurar la información en guías, referencias y conceptos
- mejorar la claridad y el flujo del contenido
- adaptar la documentación para diferentes audiencias

Los desarrolladores aportan **el conocimiento técnico del sistema**, y los technical writers ayudan a **convertir ese conocimiento en documentación clara y accesible para distintos lectores**.

#### Aprende más

- 🎓 [Technical Writing One - Google Developers (2 horas)](https://developers.google.com/tech-writing/one) [RECOMENDADO]
- 📚 [Los consejos para aprender a escribir documentación técnica como un Dev Senior](https://www.codemotion.com/magazine/es/dev-life-es/consejos-para-escribir-documentacion-tecnica-como-un-dev-senior/) [REQUERIDO]

## 💻 Documentos en un proyecto

La documentación no es un solo documento. Normalmente se divide en diferentes tipos según lo que el usuario necesita.

**Recuerda que los desarrolladores también son usuarios**

Los más comunes son:

### 1. Getting Started (Tutorials)

Sirve para que alguien pueda **usar el proyecto por primera vez**.

Normalmente incluye:

- Instalación
- Configuración básica
- Primer ejemplo funcionando

La meta es que alguien pueda **usar el proyecto en pocos minutos**.

#### Ejemplo: 

💡 [Welcome to Figma](https://help.figma.com/hc/en-us/categories/360002051613-Get-started) (Página de navegación de tutoriales básicos - INGLÉS)

### 2. Guides (How-to)

Explican cómo resolver **tareas específicas**.

Ejemplos:

- How to deploy the application
- How to configure authentication
- How to connect to the database

Responden a la pregunta:

> ¿Cómo hago X?

#### Ejemplo: 

💡 [OAuth 2.0: Configuring a new API proxy - Apigee](https://docs.cloud.google.com/apigee/docs/api-platform/security/oauth/understanding-default-oauth-20-configuration?hl=es) (Guía técnica avanzada)

### 3. API Reference

Describe **cómo funciona exactamente una API**.

Incluye información como:

- endpoints
- parámetros
- respuestas
- errores
- ejemplos de requests

Este tipo de documentación suele ser **precisa y directa**, porque se usa como referencia.

#### Ejemplo: 

💡 [Documentación APIs - API conecta - Nequi](https://docs.conecta.nequi.com.co/?api=cashInOut#) (Se recomienda profundizar en el consumo de APIs)

### 4. Otros documentos

- **Release Notes**  
  Registro de cambios entre versiones: nuevas funcionalidades, mejoras, correcciones de bugs y posibles breaking changes.

- **Troubleshooting**  
  Guía para diagnosticar y resolver problemas comunes durante la instalación, configuración o uso.

- **Knowledge Base**  
  Colección de artículos cortos que responden preguntas frecuentes o explican casos específicos que no encajan en la documentación principal.

- **Concepts / Architecture**  
  Explicación de los conceptos clave y de cómo está estructurado el sistema (componentes, flujos y decisiones de diseño) para entender cómo funciona antes de integrarlo o modificarlo.

### Aprende más

- 📚 [Fundamental Concepts of Technical Documentation: Style - RedHat](https://people.redhat.com/~jlaska/documentation-guide-en/sn-tech-docs-fundamentals.html) [RECOMENDADO - INGLÉS]
- 📺 [API Documentation and Why it Matters](https://www.youtube.com/watch?v=39Tt1IkLiQQ) [RECOMENDADO - INGLÉS]

## 👨‍💻 Documentar como desarrollador

### 1. README

El README es normalmente **la puerta de entrada a un proyecto**.

Generalmente incluye:

- qué hace el proyecto
- cómo instalarlo
- cómo ejecutarlo
- enlaces a documentación más completa

#### Aprende más:

- 📚 [Cómo escribir un readme increíble en tu github](https://www.aluracursos.com/blog/como-escribir-un-readme-increible-en-tu-github)

### 2. OpenAPI y Swagger

**OpenAPI** es una **especificación estándar** para describir APIs REST de forma estructurada.

Permite definir elementos como:

- endpoints
- parámetros
- tipos de datos
- respuestas

Con esta información se pueden generar automáticamente:

- documentación interactiva de la API
- validaciones

**Swagger** es un conjunto de **herramientas que utilizan la especificación OpenAPI** para visualizar y trabajar con la documentación de una API.

Por ejemplo, **Swagger UI** permite mostrar la documentación de una API en una página web interactiva donde los desarrolladores pueden explorar y probar los endpoints.

Ejemplo simple de OpenAPI:

```yaml
openapi: 3.0.0
info:
  title: Example API
  version: 1.0.0

paths:
  /users:
    get:
      summary: Get users
      responses:
        '200':
          description: Successful response
```
#### Aprende más:

- 📚 [Que es OpenAPI y Swagger](https://www.youtube.com/watch?v=39Tt1IkLiQQ) [REQUERIDO]

### 3. Code as documentation

Otra práctica común es que **el código mismo sirva como documentación**.

Esto ocurre cuando el código incluye información que ayuda a entender **qué hace, cómo se usa y qué esperar de él**.

Esto puede incluir:

- nombres claros de funciones y variables
- comentarios que expliquen decisiones importantes
- ejemplos de uso
- documentación generada automáticamente a partir del código

#### Aprende más:
- 📺 [Self-Documenting Code Explained – Can You Make Your Code Speak for Itself? ](https://www.youtube.com/watch?v=TJuPBszWXgM) [REQUERIDO - INGLÉS]

## Qué esperar en la sesión

La clase está diseñada para ser **práctica y conversacional**.

No veremos teoría de escritura en abstracto, sino **cómo documentan los desarrolladores en proyectos reales**.

Estructura aproximada de la sesión:

**10 min — Introducción**

- Por qué la documentación es fundamental en proyectos de software
- El rol de los desarrolladores y technical writers

**20 min — Tipos de documentación en proyectos reales**

Exploraremos los documentos más comunes:

- Getting Started
- Guides
- API ReferenceS

Y veremos **cuándo se usa cada uno y algunos ejemplos**.

**25 min — Cómo documentan los desarrolladores**

Veremos ejemplos reales de Open API y Swagger.

**15 min — Analizando nuestra documentación**

Revisaremos nuestros proyectos e identificaremos:

- qué tipos de documentos necesitamos
- el estado de la documentación que ya existe

**10 min — Preguntas y discusión**

Discutiremos nuestra experiencia con la documentación, expectativas y dudas 

## 🚀 Después de la sesión

Después de esta clase deberías poder:

- reconocer los tipos de documentación más comunes en un proyecto
- entender cuándo usar cada uno
- escribir documentación básica para un proyecto o una API
- identificar buenas prácticas en documentación técnica

Como siguiente paso, podrás practicar:

- mejorando el README de un proyecto
- escribiendo un **Getting Started**
- documentando un endpoint de una API
- agregando ejemplos de uso a funciones o librerías

La mejor forma de aprender documentación es **leyéndola y escribiéndola en proyectos reales**.
