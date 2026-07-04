# Guia Previa: Sesion 03 - 2026 I

## Flujos Autenticados en Angular: Guards, Protected Routes y Estado de Sesion

---

### Informacion del Documento

- **Nombre:** Flujos Autenticados en Angular
- **Autor:** Backbone UTP
- **Formato:** Guia de Lectura y Practica
- **Pagina:** Front / 07-04
- **Fecha:** Julio 2026
- **Notas:** Esta sesion se enfoca exclusivamente en frontend. La autenticacion se simulara mediante una implementacion fake reemplazable.

---

## Por Que Esta Guia Es Importante

Hasta este punto, la aplicacion puede mostrar componentes, manejar estado y navegar entre rutas. El siguiente problema aparece cuando algunas pantallas no deberian estar disponibles para cualquier usuario.

En Backbone Judge, por ejemplo, el workspace donde se resuelve un challenge deberia estar disponible solamente para una persona autenticada.

El flujo esperado es:

```text
Usuario intenta entrar a /challenge-workspace
                    |
                    v
           Angular evalua un Guard
                    |
          +---------+---------+
          |                   |
          v                   v
  Sesion valida         Sin sesion
          |                   |
          v                   v
 Carga el workspace    Redirige a /login
```

La idea central de esta sesion no es simplemente crear un archivo llamado `auth.guard.ts`.

El objetivo es entender como colaboran:

- El Router.
- Los Guards.
- El estado de sesion.
- La pantalla de login.
- Las redirecciones.
- La restauracion de sesion.
- Los componentes que dependen del usuario autenticado.
- Los futuros interceptores HTTP.

> Un Guard controla navegacion. No representa una barrera de seguridad real.

El navegador pertenece al usuario. El backend sigue siendo responsable de validar credenciales, sesiones y permisos cuando exista la integracion real.

---

## Objetivo de la Clase

Al finalizar la sesion deberias poder:

- Diferenciar autenticacion, autorizacion y proteccion de rutas.
- Explicar que responsabilidades pertenecen al frontend.
- Modelar una sesion con estados explicitos.
- Crear un Store de autenticacion usando Signals.
- Implementar Guards funcionales.
- Proteger una ruta lazy-loaded con `canMatch`.
- Redirigir al login conservando la ruta original.
- Evitar que un usuario autenticado vuelva al login.
- Simular login, restauracion de sesion y logout sin backend.
- Probar rutas protegidas usando `RouterTestingHarness`.
- Preparar la arquitectura para una futura integracion HTTP.

---

## Alcance De La Sesion

Esta es una clase exclusivamente frontend.

Durante la practica:

- No se implementara un servidor.
- No se almacenaran contrasenas reales.
- No se generaran tokens.
- No se validaran permisos reales.
- No se utilizara `localStorage` como fuente de seguridad.
- Se usara un repositorio fake para simular una API.
- Se mantendran separadas la UI, el estado y el acceso a datos.

La implementacion fake existe para poder practicar el flujo completo de navegacion.

Cuando exista backend, podremos reemplazar:

```text
FakeAuthRepository
```

por:

```text
HttpAuthRepository
```

sin modificar los componentes, Guards o Store.

Ese desacoplamiento es el verdadero objetivo arquitectonico de la clase.

---

## Estado Actual Del Proyecto

El repositorio `judge-front` utiliza una estructura moderna de Angular:

- Componentes standalone.
- Configuracion mediante `app.config.ts`.
- Rutas definidas en `app.routes.ts`.
- Lazy loading para `challenge-workspace`.
- Signals para estado reactivo.
- Vitest para testing.

La ruta principal tiene una estructura similar a:

```ts
export const routes: Routes = [
  {
    path: "",
    redirectTo: "challenge-workspace",
    pathMatch: "full",
  },
  {
    path: "challenge-workspace",
    loadChildren: () =>
      import("./features/challenge-workspace/challenge-workspace").then(
        (module) => module.challengeWorkspaceRoutes,
      ),
  },
];
```

Actualmente, cualquier usuario puede navegar directamente a:

```text
/challenge-workspace
```

Al terminar la clase, esa ruta estara protegida.

---

# Conceptos Clave Para La Sesion

## 1. Autenticacion

La autenticacion responde:

> ¿Quien es el usuario?

Ejemplos habituales:

- Email y contrasena.
- Inicio de sesion con Google.
- Sesion basada en cookie.
- Access token.
- Passkey.

En frontend representaremos al usuario con un contrato:

```ts
export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  roles: readonly UserRole[];
}
```

---

## 2. Autorizacion

La autorizacion responde:

> Ya sabemos quien es. ¿Puede realizar esta accion?

Ejemplos dentro de Backbone Judge:

- Un estudiante puede resolver challenges.
- Un reviewer puede revisar submissions.
- Un administrador puede crear challenges.
- Un usuario no deberia editar recursos de otro usuario.

Autenticacion y autorizacion estan relacionadas, pero no son lo mismo.

```text
Autenticacion: ¿Quien eres?
Autorizacion:  ¿Que puedes hacer?
```

---

## 3. Protected Route

Una ruta protegida es una ruta cuya navegacion depende de una condicion.

Ejemplo:

```text
/challenge-workspace
```

Condicion:

```text
El usuario debe tener una sesion autenticada.
```

Resultado:

```text
Autenticado -> entra al workspace
Anonimo     -> va al login
```

La ruta protegida mejora la experiencia de usuario, pero no protege por si sola los datos o endpoints reales.

---

## 4. Que Maneja Frontend Y Que Manejara Backend

### Responsabilidades del frontend

El frontend puede:

- Mostrar el formulario de login.
- Validar inicialmente sus campos.
- Guardar el usuario actual en estado.
- Restaurar visualmente una sesion.
- Mostrar u ocultar opciones de navegacion.
- Proteger rutas.
- Recordar la URL que el usuario intento visitar.
- Redirigir ante una sesion expirada.
- Mostrar una pantalla de acceso denegado.
- Adjuntar credenciales a requests cuando exista API.

### Responsabilidades del backend

El backend debera:

- Validar credenciales reales.
- Crear y revocar sesiones.
- Firmar y validar tokens, si se utilizan.
- Validar permisos en cada endpoint.
- Evitar acceso a recursos ajenos.
- Responder con estados HTTP correctos.
- Proteger informacion sensible.

> Ocultar un boton no evita que alguien invoque manualmente un endpoint.

---

## 5. Estado De Sesion

Un booleano no alcanza para representar correctamente una sesion.

Esto es insuficiente:

```ts
isAuthenticated = false;
```

Cuando la aplicacion inicia, todavia no sabemos si existe una sesion previa.

Por eso utilizaremos tres estados:

```ts
export type AuthStatus = "unknown" | "authenticated" | "anonymous";
```

### `unknown`

La aplicacion todavia no comprobo la sesion.

### `authenticated`

La aplicacion conoce al usuario autenticado.

### `anonymous`

La aplicacion comprobo que no existe una sesion.

Flujo:

```text
                    restoreSession()
unknown ----------------------------------+
   |                                      |
   | usuario encontrado                   | sin usuario
   v                                      v
authenticated                         anonymous
   |                                      |
   | logout                               | login
   +-----------------> anonymous          +------> authenticated
```

La diferencia entre `unknown` y `anonymous` evita redirecciones prematuras y parpadeos de interfaz.

---

## 6. Guards En Angular

Angular ofrece cuatro tipos principales de Guard:

| Guard              | Responsabilidad                                                   |
| ------------------ | ----------------------------------------------------------------- |
| `CanActivate`      | Decide si una ruta puede activarse                                |
| `CanActivateChild` | Protege rutas hijas                                               |
| `CanDeactivate`    | Decide si se puede abandonar una pantalla                         |
| `CanMatch`         | Decide si una configuracion de ruta puede participar del matching |

En esta sesion utilizaremos `CanMatch` porque `challenge-workspace` ya se carga de forma lazy.

Un Guard puede retornar:

```ts
boolean;
UrlTree;
RedirectCommand;
Promise;
Observable;
```

Para redirigir, debemos retornar un `UrlTree`.

No es recomendable hacer esto:

```ts
router.navigate(["/login"]);
return false;
```

Preferimos:

```ts
return router.createUrlTree(["/login"]);
```

El Guard describe el resultado de la navegacion en lugar de disparar otra navegacion por fuera del flujo del Router.

---

# Arquitectura Propuesta

Agregaremos una feature de autenticacion:

```text
src/app/features/auth/
|
+-- data-access/
|   +-- auth.repository.ts
|   +-- fake-auth.repository.ts
|
+-- guards/
|   +-- authenticated.guard.ts
|   +-- anonymous-only.guard.ts
|
+-- pages/
|   +-- login/
|       +-- login.ts
|       +-- login.html
|
+-- state/
|   +-- auth-facade.ts
|   +-- auth-session.store.ts
|
+-- types/
    +-- auth.types.ts
```

Responsabilidades:

| Pieza                | Responsabilidad                          |
| -------------------- | ---------------------------------------- |
| `AuthSessionStore`   | Mantener el estado reactivo de la sesion |
| `AuthRepository`     | Definir las operaciones disponibles      |
| `FakeAuthRepository` | Simular temporalmente la infraestructura |
| `AuthFacade`         | Orquestar los casos de uso               |
| Guards               | Tomar decisiones de navegacion           |
| `LoginPage`          | Capturar datos y mostrar estado visual   |

Flujo:

```text
LoginPage
    |
    v
AuthFacade
    |
    +----------------------+
    |                      |
    v                      v
AuthRepository       AuthSessionStore
    |
    v
FakeAuthRepository
```

El componente no conoce `sessionStorage`.

El Guard no conoce las credenciales.

El Store no navega.

El repositorio no renderiza mensajes.

Cada pieza tiene una responsabilidad concreta.

---

# Implementacion Paso A Paso

## Paso 1: Definir Los Tipos

Crear:

```text
src/app/features/auth/types/auth.types.ts
```

```ts
export type AuthStatus = "unknown" | "authenticated" | "anonymous";

export type UserRole = "student" | "reviewer" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  roles: readonly UserRole[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}
```

---

## Paso 2: Crear El Store De Sesion

Crear:

```text
src/app/features/auth/state/auth-session.store.ts
```

```ts
import { computed, Injectable, signal } from "@angular/core";

import type { AuthStatus, AuthUser } from "../types/auth.types";

@Injectable({
  providedIn: "root",
})
export class AuthSessionStore {
  private readonly statusState = signal<AuthStatus>("unknown");

  private readonly userState = signal<AuthUser | null>(null);

  readonly status = this.statusState.asReadonly();
  readonly user = this.userState.asReadonly();

  readonly isAuthenticated = computed(
    () => this.statusState() === "authenticated",
  );

  readonly isAnonymous = computed(() => this.statusState() === "anonymous");

  setAuthenticated(user: AuthUser): void {
    this.userState.set(user);
    this.statusState.set("authenticated");
  }

  setAnonymous(): void {
    this.userState.set(null);
    this.statusState.set("anonymous");
  }

  reset(): void {
    this.userState.set(null);
    this.statusState.set("unknown");
  }
}
```

El Store:

- No conoce Angular Router.
- No realiza requests.
- No lee formularios.
- No contiene mensajes de UI.
- Solamente representa el estado de la sesion.

---

## Paso 3: Definir El Contrato De Acceso A Datos

Crear:

```text
src/app/features/auth/data-access/auth.repository.ts
```

```ts
import type { Observable } from "rxjs";

import type { AuthUser, LoginCredentials } from "../types/auth.types";

export abstract class AuthRepository {
  abstract login(credentials: LoginCredentials): Observable<AuthUser>;

  abstract restoreSession(): Observable<AuthUser | null>;

  abstract logout(): Observable<void>;
}
```

Usamos una clase abstracta para obtener dos cosas:

1. Un contrato que las implementaciones deben respetar.
2. Un token que Angular puede utilizar en inyeccion de dependencias.

---

## Paso 4: Crear Una Implementacion Fake

Crear:

```text
src/app/features/auth/data-access/fake-auth.repository.ts
```

```ts
import { Injectable } from "@angular/core";
import {
  defer,
  delay,
  Observable,
  of,
  switchMap,
  throwError,
  timer,
} from "rxjs";

import type { AuthUser, LoginCredentials } from "../types/auth.types";
import { AuthRepository } from "./auth.repository";

const DEMO_SESSION_KEY = "backbone-demo-session";

const DEMO_USER: AuthUser = {
  id: "student-001",
  email: "student@backboneutp.com",
  displayName: "Backbone Student",
  roles: ["student"],
};

@Injectable()
export class FakeAuthRepository extends AuthRepository {
  login(credentials: LoginCredentials): Observable<AuthUser> {
    return timer(400).pipe(
      switchMap(() => {
        const hasValidCredentials =
          credentials.email === DEMO_USER.email &&
          credentials.password === "backbone";

        if (!hasValidCredentials) {
          return throwError(() => new Error("INVALID_CREDENTIALS"));
        }

        sessionStorage.setItem(DEMO_SESSION_KEY, "active");

        return of(DEMO_USER);
      }),
    );
  }

  restoreSession(): Observable<AuthUser | null> {
    return defer(() => {
      const hasSession = sessionStorage.getItem(DEMO_SESSION_KEY) === "active";

      return of(hasSession ? DEMO_USER : null);
    }).pipe(delay(200));
  }

  logout(): Observable<void> {
    return defer(() => {
      sessionStorage.removeItem(DEMO_SESSION_KEY);
      return of(undefined);
    }).pipe(delay(200));
  }
}
```

Credenciales de demostracion:

```text
Email:    student@backboneutp.com
Password: backbone
```

> `sessionStorage` se utiliza solamente para sostener la demostracion frontend. No guarda un token real y no debe interpretarse como un mecanismo de seguridad.

---

## Paso 5: Crear La Fachada De Autenticacion

Crear:

```text
src/app/features/auth/state/auth-facade.ts
```

```ts
import { inject, Injectable } from "@angular/core";
import { finalize, map, Observable, of, shareReplay, tap } from "rxjs";

import { AuthRepository } from "../data-access/auth.repository";
import type { AuthUser, LoginCredentials } from "../types/auth.types";
import { AuthSessionStore } from "./auth-session.store";

@Injectable({
  providedIn: "root",
})
export class AuthFacade {
  private readonly repository = inject(AuthRepository);

  private readonly session = inject(AuthSessionStore);

  private restoreRequest: Observable<boolean> | null = null;

  readonly status = this.session.status;
  readonly user = this.session.user;

  readonly isAuthenticated = this.session.isAuthenticated;

  ensureSession(): Observable<boolean> {
    const status = this.session.status();

    if (status !== "unknown") {
      return of(status === "authenticated");
    }

    if (this.restoreRequest) {
      return this.restoreRequest;
    }

    const request = this.repository.restoreSession().pipe(
      tap((user) => {
        if (user) {
          this.session.setAuthenticated(user);
          return;
        }

        this.session.setAnonymous();
      }),
      map((user) => user !== null),
      finalize(() => {
        this.restoreRequest = null;
      }),
      shareReplay({
        bufferSize: 1,
        refCount: false,
      }),
    );

    this.restoreRequest = request;

    return request;
  }

  login(credentials: LoginCredentials): Observable<AuthUser> {
    return this.repository
      .login(credentials)
      .pipe(tap((user) => this.session.setAuthenticated(user)));
  }

  logout(): Observable<void> {
    return this.repository
      .logout()
      .pipe(finalize(() => this.session.setAnonymous()));
  }
}
```

La fachada concentra los casos de uso:

```text
ensureSession
login
logout
```

Los componentes y Guards no necesitan saber si la informacion viene de:

- Un fake.
- Una API HTTP.
- Una cookie.
- Un proveedor externo.

---

## Paso 6: Registrar La Implementacion Fake

Modificar:

```text
src/app/app.config.ts
```

Agregar los imports:

```ts
import { AuthRepository } from "./features/auth/data-access/auth.repository";

import { FakeAuthRepository } from "./features/auth/data-access/fake-auth.repository";
```

Agregar el provider:

```ts
{
  provide: AuthRepository,
  useClass: FakeAuthRepository,
}
```

La configuracion queda conceptualmente asi:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: AuthRepository,
      useClass: FakeAuthRepository,
    },
  ],
};
```

Cuando exista API real, solo cambiaremos el provider:

```ts
{
  provide: AuthRepository,
  useClass: HttpAuthRepository,
}
```

---

## Paso 7: Crear El Guard Autenticado

Crear:

```text
src/app/features/auth/guards/authenticated.guard.ts
```

```ts
import { inject } from "@angular/core";
import { CanMatchFn, Router, UrlSegment } from "@angular/router";
import { map } from "rxjs";

import { AuthFacade } from "../state/auth-facade";

function buildReturnUrl(segments: UrlSegment[]): string {
  const path = segments.map((segment) => segment.path).join("/");

  return path ? `/${path}` : "/";
}

export const authenticatedGuard: CanMatchFn = (_route, segments) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  const returnUrl = buildReturnUrl(segments);

  return authFacade.ensureSession().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      }

      return router.createUrlTree(["/login"], {
        queryParams: {
          returnUrl,
        },
      });
    }),
  );
};
```

Responsabilidad del Guard:

```text
Preguntar por la sesion
        |
        +-- autenticado -> true
        |
        +-- anonimo -> UrlTree hacia /login
```

El Guard no:

- Valida contrasenas.
- Guarda usuarios.
- Renderiza errores.
- Lee directamente `sessionStorage`.
- Decide permisos del backend.

---

## Paso 8: Crear El Guard Para Usuarios Anonimos

Un usuario autenticado tampoco deberia volver manualmente al login.

Crear:

```text
src/app/features/auth/guards/anonymous-only.guard.ts
```

```ts
import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { map } from "rxjs";

import { AuthFacade } from "../state/auth-facade";

export const anonymousOnlyGuard: CanMatchFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade
    .ensureSession()
    .pipe(
      map((isAuthenticated) =>
        isAuthenticated ? router.parseUrl("/challenge-workspace") : true,
      ),
    );
};
```

Resultado:

```text
Usuario anonimo     -> puede abrir /login
Usuario autenticado -> vuelve al workspace
```

---

## Paso 9: Crear La Pagina De Login

Crear:

```text
src/app/features/auth/pages/login/login.ts
```

```ts
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize } from "rxjs";

import { AuthFacade } from "../../state/auth-facade";

function sanitizeReturnUrl(value: string | null): string {
  if (!value) {
    return "/challenge-workspace";
  }

  const isInternalUrl = value.startsWith("/") && !value.startsWith("//");

  return isInternalUrl ? value : "/challenge-workspace";
}

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./login.html",
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);

  private readonly authFacade = inject(AuthFacade);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.authFacade
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          const returnUrl = sanitizeReturnUrl(
            this.activatedRoute.snapshot.queryParamMap.get("returnUrl"),
          );

          void this.router.navigateByUrl(returnUrl);
        },
        error: () => {
          this.errorMessage.set("El correo o la contrasena no son validos.");
        },
      });
  }
}
```

---

## Paso 10: Crear El Template Del Login

Crear:

```text
src/app/features/auth/pages/login/login.html
```

```html
<main>
  <section aria-labelledby="login-title">
    <h1 id="login-title">Iniciar sesion</h1>

    <p>Ingresa para resolver challenges y consultar tus submissions.</p>

    <form [formGroup]="form" (ngSubmit)="submit()">
      <div>
        <label for="email"> Correo electronico </label>

        <input
          id="email"
          type="email"
          formControlName="email"
          autocomplete="email"
        />

        @if ( form.controls.email.touched && form.controls.email.invalid ) {
        <p role="alert">Ingresa un correo valido.</p>
        }
      </div>

      <div>
        <label for="password"> Contrasena </label>

        <input
          id="password"
          type="password"
          formControlName="password"
          autocomplete="current-password"
        />

        @if ( form.controls.password.touched && form.controls.password.invalid )
        {
        <p role="alert">La contrasena es obligatoria.</p>
        }
      </div>

      @if (errorMessage()) {
      <p role="alert">{{ errorMessage() }}</p>
      }

      <button type="submit" [disabled]="isSubmitting()">
        @if (isSubmitting()) { Ingresando... } @else { Iniciar sesion }
      </button>
    </form>
  </section>
</main>
```

---

## Paso 11: Proteger Las Rutas

Modificar:

```text
src/app/app.routes.ts
```

```ts
import { Routes } from "@angular/router";

import { anonymousOnlyGuard } from "./features/auth/guards/anonymous-only.guard";

import { authenticatedGuard } from "./features/auth/guards/authenticated.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "challenge-workspace",
    pathMatch: "full",
  },
  {
    path: "login",
    canMatch: [anonymousOnlyGuard],
    loadComponent: () =>
      import("./features/auth/pages/login/login").then(
        (module) => module.LoginPage,
      ),
  },
  {
    path: "challenge-workspace",
    canMatch: [authenticatedGuard],
    loadChildren: () =>
      import("./features/challenge-workspace/challenge-workspace").then(
        (module) => module.challengeWorkspaceRoutes,
      ),
  },
  {
    path: "**",
    redirectTo: "challenge-workspace",
  },
];
```

Flujo final:

```text
/challenge-workspace
        |
        v
authenticatedGuard
        |
        +-- authenticated
        |        |
        |        v
        |   carga lazy del workspace
        |
        +-- anonymous
                 |
                 v
/login?returnUrl=/challenge-workspace
```

---

## Paso 12: Implementar Logout

El logout debe pasar tambien por la fachada.

Ejemplo para un menu o header:

```ts
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthFacade } from "../../features/auth/state/auth-facade";

@Component({
  selector: "app-user-menu",
  standalone: true,
  template: `
    @if (authFacade.user(); as user) {
      <span>{{ user.displayName }}</span>

      <button type="button" (click)="logout()">Cerrar sesion</button>
    }
  `,
})
export class UserMenu {
  readonly authFacade = inject(AuthFacade);

  private readonly router = inject(Router);

  logout(): void {
    this.authFacade.logout().subscribe({
      next: () => {
        void this.router.navigateByUrl("/login");
      },
    });
  }
}
```

El componente no modifica directamente el Store.

---

# Interceptores: Preparacion Para La API Real

En esta clase no construiremos el backend ni el repositorio HTTP.

Sin embargo, cuando exista integracion real, los interceptores frontend podran centralizar comportamientos como:

- Adjuntar credenciales.
- Agregar headers comunes.
- Detectar respuestas `401`.
- Limpiar la sesion local.
- Redirigir al login.
- Registrar errores.

Ejemplo conceptual de un interceptor funcional:

```ts
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

import { AuthSessionStore } from "../state/auth-session.store";

export const unauthorizedInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(AuthSessionStore);

  const router = inject(Router);

  return next(request).pipe(
    catchError((error: unknown) => {
      const isUnauthorized =
        error instanceof HttpErrorResponse && error.status === 401;

      if (isUnauthorized) {
        session.setAnonymous();

        void router.navigate(["/login"], {
          queryParams: {
            returnUrl: router.url,
          },
        });
      }

      return throwError(() => error);
    }),
  );
};
```

Diferencia importante:

```text
401 -> no existe una autenticacion valida
403 -> existe autenticacion, pero no hay permiso
```

Un `403` no deberia cerrar automaticamente la sesion.

---

# Testing Del Guard

Angular proporciona `RouterTestingHarness` para probar navegacion usando un Router real de testing.

Crear:

```text
src/app/features/auth/guards/authenticated.guard.spec.ts
```

```ts
import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";
import { of } from "rxjs";
import { describe, expect, it, vi } from "vitest";

import { AuthFacade } from "../state/auth-facade";

import { authenticatedGuard } from "./authenticated.guard";

@Component({
  standalone: true,
  template: "<h1>Challenge Workspace</h1>",
})
class ProtectedPageStub {}

@Component({
  standalone: true,
  template: "<h1>Login</h1>",
})
class LoginPageStub {}

describe("authenticatedGuard", () => {
  it("allows an authenticated user", async () => {
    const ensureSession = vi.fn().mockReturnValue(of(true));

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthFacade,
          useValue: {
            ensureSession,
          },
        },
        provideRouter([
          {
            path: "challenge-workspace",
            component: ProtectedPageStub,
            canMatch: [authenticatedGuard],
          },
          {
            path: "login",
            component: LoginPageStub,
          },
        ]),
      ],
    });

    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl("/challenge-workspace", ProtectedPageStub);

    expect(harness.routeNativeElement?.textContent).toContain(
      "Challenge Workspace",
    );

    expect(ensureSession).toHaveBeenCalledOnce();
  });

  it("redirects an anonymous user", async () => {
    const ensureSession = vi.fn().mockReturnValue(of(false));

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthFacade,
          useValue: {
            ensureSession,
          },
        },
        provideRouter([
          {
            path: "challenge-workspace",
            component: ProtectedPageStub,
            canMatch: [authenticatedGuard],
          },
          {
            path: "login",
            component: LoginPageStub,
          },
        ]),
      ],
    });

    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl("/challenge-workspace", LoginPageStub);

    const router = TestBed.inject(Router);
    const url = router.parseUrl(router.url);

    expect(router.url).toContain("/login");

    expect(url.queryParams["returnUrl"]).toBe("/challenge-workspace");
  });
});
```

Los tests validan comportamiento observable:

- La ruta protegida se renderiza cuando existe sesion.
- La navegacion termina en login cuando no existe sesion.
- La URL original queda conservada.

No necesitamos probar detalles internos del Router.

---

# Casos Que Debemos Probar Manualmente

## Caso 1: usuario anonimo

1. Limpiar `sessionStorage`.
2. Abrir `/challenge-workspace`.
3. Verificar redireccion a `/login`.
4. Verificar el query param `returnUrl`.

Resultado esperado:

```text
/login?returnUrl=/challenge-workspace
```

---

## Caso 2: credenciales incorrectas

Ingresar:

```text
Email: student@backboneutp.com
Password: incorrecta
```

Resultado esperado:

- Se mantiene el login.
- Se muestra un mensaje.
- No se crea sesion.
- No se navega al workspace.

---

## Caso 3: login correcto

Ingresar:

```text
Email: student@backboneutp.com
Password: backbone
```

Resultado esperado:

- El Store cambia a `authenticated`.
- El usuario queda disponible.
- Se navega a la ruta original.
- El workspace se carga.

---

## Caso 4: recargar la pagina

1. Iniciar sesion.
2. Recargar el navegador.
3. Esperar la restauracion fake.

Resultado esperado:

- El estado inicia en `unknown`.
- `ensureSession()` consulta el repositorio.
- La sesion pasa a `authenticated`.
- El workspace permanece disponible.

---

## Caso 5: abrir login autenticado

1. Iniciar sesion.
2. Navegar manualmente a `/login`.

Resultado esperado:

```text
/challenge-workspace
```

---

## Caso 6: logout

1. Iniciar sesion.
2. Ejecutar logout.
3. Intentar volver al workspace.

Resultado esperado:

- La sesion queda en `anonymous`.
- El usuario queda en `null`.
- Se redirige al login.
- El Guard vuelve a bloquear el workspace.

---

# Errores Comunes

## Error 1: El Guard Lee Directamente SessionStorage

Evitar:

```ts
export const authGuard: CanMatchFn = () =>
  sessionStorage.getItem("session") === "active";
```

Problemas:

- El Guard queda acoplado a infraestructura.
- La logica se duplica.
- No existe un estado reactivo compartido.
- Cambiar a HTTP obliga a reescribirlo.

Preferir:

```ts
return inject(AuthFacade).ensureSession();
```

---

## Error 2: Usar Solo Un Booleano

Evitar:

```ts
isLoggedIn = signal(false);
```

No diferencia:

```text
Todavia no consulte la sesion
```

de:

```text
Consulte la sesion y no existe
```

Preferir:

```ts
type AuthStatus = "unknown" | "authenticated" | "anonymous";
```

---

## Error 3: Navegar Dentro Del Guard

Evitar:

```ts
if (!isAuthenticated) {
  router.navigate(["/login"]);
  return false;
}
```

Preferir:

```ts
return router.createUrlTree(["/login"]);
```

---

## Error 4: Convertir El Store En Un Servicio Gigante

El Store no deberia:

- Realizar requests.
- Navegar.
- Mostrar notificaciones.
- Validar formularios.
- Leer componentes.

Su trabajo es mantener estado.

---

## Error 5: Considerar El Guard Como Seguridad

Este codigo:

```ts
canMatch: [authenticatedGuard];
```

no impide que un usuario:

- Modifique JavaScript.
- Cambie manualmente valores del navegador.
- Invoque una API por fuera de Angular.

Los Guards protegen el flujo de navegacion del cliente.

La seguridad real debera existir en backend.

---

## Error 6: Guardar Contrasenas O Tokens De Demostracion

Nunca almacenar:

```text
password
refresh token
session secret
```

en el repositorio o en fixtures publicos.

La contrasena `backbone` de esta guia es un valor fake que no autentica contra ningun servicio real.

---

# Ejercicio Guiado

## Parte 1: Estado

Implementar:

- `AuthStatus`.
- `AuthUser`.
- `AuthSessionStore`.
- Valores derivados con `computed`.

## Parte 2: Infraestructura Fake

Implementar:

- `AuthRepository`.
- `FakeAuthRepository`.
- Registro del provider.

## Parte 3: Casos De Uso

Implementar:

- `ensureSession`.
- `login`.
- `logout`.

## Parte 4: Navegacion

Implementar:

- `authenticatedGuard`.
- `anonymousOnlyGuard`.
- Ruta `/login`.
- Proteccion de `/challenge-workspace`.
- Query param `returnUrl`.

## Parte 5: UI

Implementar:

- Formulario reactivo.
- Estado de carga.
- Mensajes de error.
- Logout.
- Visualizacion del usuario actual.

## Parte 6: Testing

Implementar:

- Test de acceso autenticado.
- Test de redireccion anonima.
- Verificacion de `returnUrl`.

---

# Desafios Adicionales

## Desafio 1: Guard Por Roles

Crear una fabrica:

```ts
roleGuard("admin");
```

Resultado esperado:

```text
admin    -> permite navegar
student  -> redirige a /forbidden
anonymous -> redirige a /login
```

Recordatorio:

> El backend debera volver a validar el rol cuando exista una API real.

---

## Desafio 2: CanDeactivate En El Editor

El workspace contiene un editor de codigo.

Podemos evitar que el usuario salga accidentalmente si tiene cambios pendientes.

Contrato sugerido:

```ts
export interface PendingChangesAware {
  hasPendingChanges(): boolean;
}
```

Guard:

```ts
import { CanDeactivateFn } from "@angular/router";

export const pendingChangesGuard: CanDeactivateFn<PendingChangesAware> = (
  component,
) => {
  if (!component.hasPendingChanges()) {
    return true;
  }

  return window.confirm("Tienes cambios pendientes. ¿Deseas salir?");
};
```

Esto muestra que los Guards no existen solamente para autenticacion.

Tambien pueden expresar politicas de navegacion.

---

## Desafio 3: Reemplazar El Fake

Crear:

```text
HttpAuthRepository
```

que respete el mismo contrato:

```ts
export class HttpAuthRepository extends AuthRepository {
  login(credentials: LoginCredentials) {
    // POST /auth/login
  }

  restoreSession() {
    // GET /auth/me
  }

  logout() {
    // POST /auth/logout
  }
}
```

Despues cambiar solamente:

```ts
{
  provide: AuthRepository,
  useClass: HttpAuthRepository,
}
```

Los Guards, Store, componentes y tests principales deberian seguir funcionando sin cambios estructurales.

---

# Criterios De Aceptacion

La practica esta terminada cuando:

- `/challenge-workspace` esta protegido.
- Un usuario anonimo es enviado a `/login`.
- `returnUrl` conserva la ruta solicitada.
- El formulario valida email y contrasena.
- Las credenciales fake correctas crean una sesion.
- Las credenciales incorrectas muestran un error.
- Recargar la pagina restaura la sesion fake.
- Un usuario autenticado no puede abrir `/login`.
- Logout elimina la sesion y limpia el usuario.
- El Guard tiene tests de acceso y redireccion.
- Los componentes no leen directamente `sessionStorage`.
- El Store no conoce al Router.
- El Guard no valida credenciales.
- La implementacion fake puede reemplazarse mediante DI.

---

# Recomendaciones Antes De La Clase

- Tener Node.js LTS instalado.
- Instalar las dependencias del proyecto.
- Repasar rutas standalone.
- Repasar `signal` y `computed`.
- Conocer inyeccion de dependencias con `inject`.
- Revisar formularios reactivos.
- Tener conocimientos basicos de RxJS.

---

# Recursos Complementarios

## Angular

- [Route Guards](https://angular.dev/guide/routing/route-guards)
- [Testing Routing and Navigation](https://angular.dev/guide/routing/testing)
- [RouterTestingHarness](https://angular.dev/api/router/testing/RouterTestingHarness)
- [Signals](https://angular.dev/guide/signals)
- [Reactive Forms](https://angular.dev/guide/forms/reactive-forms)
- [Dependency Injection](https://angular.dev/guide/di)
- [HTTP Interceptors](https://angular.dev/guide/http/interceptors)
- [Setting up HttpClient](https://angular.dev/guide/http/setup)

---
