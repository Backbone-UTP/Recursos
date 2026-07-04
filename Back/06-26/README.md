# Resumen contenido: Sesión 01 - Receso 2026

## Colas de Trabajo + BullMQ

---

### Informacion del documento

- **Nombre**: Colas de trabajo con BullMQ
- **Autor**: Backbone
- **Formato**: Guia de lectura y video
- **Pagina**: Back / 06-26
- **Fecha**: Junio 2026
- **Notas**: Esta guia amplia el contenido de la sesión virtual del 26 de junio de 2026.

---

## Por qué colas? 

¿Por qué necesitamos colas en un sistema backend? ¿Dónde es comúnmente utilizado, y cómo mejora el diseño de sistemas?

Una cola de mensajes desacopla servicios en sistemas distribuidos, habilitando la comunicación asíncrona para tareas diferibles.

Mejora el rendimiento, las respuestas, y la tolerancia al fallo permitiendo que las tareas sean encoladas, reintentadas en caso de fallo, y procesadas después. 

Esto balancea cargas, previene cuellos de botellas y admite el escalado independiente de servicios.

**Fuente (y lectura recomendada, en inglés):** [MESSAGE QUEUE - Medium](https://medium.com/@itworldeducation/message-queue-df0dc54419f4)

## Otros conceptos clave + Repaso 

- **Mensajería**: Patrón de comunicación donde una aplicación envía mensajes a una cola para que otro proceso los reciba y los procese.
- **Worker**: Proceso encargado de consumir y ejecutar los trabajos que llegan a una cola.
- **Asincronismo**: Forma de ejecutar tareas sin bloquear la aplicación mientras estas terminan de procesarse.
- **Concurrencia**: Número de trabajos que un worker puede procesar simultáneamente.
- **Evento**: Notificación emitida por una cola o un worker cuando ocurre una acción, como iniciar, completar o fallar un trabajo.
- **Flujo**: Conjunto de trabajos relacionados mediante dependencias, donde algunos solo pueden ejecutarse cuando otros han finalizado.

---

## BullMQ

### Qué es BullMQ?

**Idea clave:** Biblioteca de Node.js que implementa un sistema de colas basado en [Redis](https://redis.io/)

**Por qué lo usamos en backend?**

- Intenta entregar cada mensaje exactaemente una vez
- Fácil de escalar horizontalmente
- Consistente
- Alto rendimiento

- **Fuente (documentación oficial):** [What is BullMQ?](https://docs.bullmq.io/)

### Empezar a usar BullMQ

- **Página oficial**: https://api.docs.bullmq.io/
- **Documentación de API**: https://api.docs.bullmq.io/
- **Ejemplos de código**: https://bullmq.io/#code-examples

---

## A continuación 

El siguiente paso será crear tu primera cola de procesos, te recomendamos ver: 
[¡Escala tu API! 🚀 Colas de procesos con Node.js, BullMQ y Redis](https://www.youtube.com/watch?v=KXgSGbriUpg)
