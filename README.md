# 🦷 Sistema de Información - Consultorio Odontológico Doc Quintero

Sistema de información integral para la gestión administrativa y clínica del **Consultorio Odontológico Doc Quintero** (Proyecto de Grado - Ingeniería de Sistemas). Digitaliza y centraliza los procesos de agendamiento, historias clínicas, gestión de pacientes y reportes gerenciales del consultorio.

---

## 🌐 Sistema en Producción (Live)

| Servicio | URL |
|----------|-----|
| 🖥️ **Frontend (Interfaz de Usuario)** | [https://doc-quintero-frontend.onrender.com](https://doc-quintero-frontend.onrender.com) |
| ⚙️ **Backend API REST** | [https://doc-quintero-backend.onrender.com/api](https://doc-quintero-backend.onrender.com/api) |
| 📚 **Documentación Swagger UI** | [https://doc-quintero-backend.onrender.com/swagger-ui.html](https://doc-quintero-backend.onrender.com/swagger-ui.html) |
| 📄 **Especificación OpenAPI (JSON)** | [https://doc-quintero-backend.onrender.com/api-docs](https://doc-quintero-backend.onrender.com/api-docs) |

> ⚠️ **Nota:** El plan gratuito de Render entra en reposo por inactividad. La **primera petición** puede tardar entre **30 y 60 segundos** en responder mientras el servidor se reactiva. Las siguientes peticiones son inmediatas.

---

## 🔑 Credenciales de Acceso para Revisión

| Campo | Valor |
|-------|-------|
| **Email** | `correo1@gmail.com` |
| **Contraseña** | `123456` |
| **Rol** | `ADMINISTRADOR` (acceso total al sistema) |

---

## 🏗️ Arquitectura del Sistema


```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE (Navegador)                  │
│         Angular 17 SPA — Render Static Site             │
│    https://doc-quintero-frontend.onrender.com           │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS / REST + JWT
┌──────────────────────▼──────────────────────────────────┐
│                   BACKEND API REST                       │
│       Spring Boot 3.2 · Java 17 — Render Web Service    │
│      https://doc-quintero-backend.onrender.com          │
└──────────────────────┬──────────────────────────────────┘
                       │ MongoDB Driver (SRV)
┌──────────────────────▼──────────────────────────────────┐
│                  BASE DE DATOS                           │
│         MongoDB Atlas — M0 Free Tier (Cloud)            │
│            Base de datos: docquintero                   │
└─────────────────────────────────────────────────────────┘
```

### Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | Angular | 17 |
| Backend | Spring Boot | 3.2.0 |
| Lenguaje | Java | 17 |
| Base de Datos | MongoDB Atlas | 6.0 |
| Seguridad | Spring Security + JWT (JJWT) | 0.11.5 |
| Documentación API | Springdoc OpenAPI (Swagger) | 2.3.0 |
| Pruebas | JUnit 5 + Mockito + JaCoCo | — |

---

## 📦 Módulos del Sistema

| Módulo | Descripción |
|--------|-------------|
| 🔐 **Autenticación** | Login con JWT, control de sesión por rol |
| 👤 **Gestión de Usuarios** | CRUD de personal con roles asignados |
| 🧑‍⚕️ **Pacientes** | Registro, búsqueda y actualización de expedientes |
| 📅 **Citas** | Agendamiento, reprogramación y cancelación |
| 📋 **Historia Clínica** | Anamnesis, evoluciones clínicas cronológicas |
| 🦷 **Odontograma** | Registro gráfico del estado dental |
| 📊 **Reportes** | Indicadores gerenciales y estadísticas operativas |

### Roles del Sistema

| Rol | Permisos |
|-----|----------|
| `ADMINISTRADOR` | Acceso total: usuarios, reportes, configuración |
| `ODONTOLOGO` | Agenda propia, historias clínicas, odontograma |
| `RECEPCIONISTA` / `AUXILIAR` | Gestión de pacientes y agendamiento de citas |

---

## 💻 Ejecución en Entorno Local (Sin Docker)

### Requisitos Previos
- **Java JDK 17** o superior
- **MongoDB Community Server 6.0** corriendo en `localhost:27017`
- **Node.js 18+** con npm (para el frontend)

### 1. Backend (Spring Boot)
```powershell
# Desde la raíz del proyecto
.\mvnw.cmd spring-boot:run
```
La API quedará disponible en `http://localhost:8080`  
Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### 2. Inicializar Base de Datos (Primera vez)
```bash
mongosh mongodb://localhost:27017/docquintero database/init-mongo.js
```

### 3. Frontend (Angular)
```bash
cd doc-quintero-frontend
npm install
npm start
```
Aplicación disponible en: [http://localhost:4200](http://localhost:4200)

---

## ☁️ Despliegue en la Nube (Gratuito)

El proyecto está configurado para desplegarse automáticamente en Render. Consulta la guía completa en:

📘 [Manual de Instalación y Despliegue](docs-tecnica/manual-instalacion.md)

Los archivos de infraestructura ya incluidos en el repositorio son:
- [`Dockerfile`](./Dockerfile) — Para el despliegue del backend en Render
- [`render.yaml`](./render.yaml) — Configuración declarativa de Render

---

## 📚 Documentación del Proyecto

| Documento | Descripción |
|-----------|-------------|
| [Manual de Usuario](docs-tecnica/manual-usuario.md) | Guía de uso por rol (Admin, Odontólogo, Recepcionista) |
| [Manual de Instalación](docs-tecnica/manual-instalacion.md) | Guía técnica de instalación local y en la nube |
| [Requerimientos](gestion-proyecto/requerimientos/requerimientos.md) | Matriz RF y RNF del sistema |
| [Historias de Usuario](gestion-proyecto/historias-usuario/historias-usuario.md) | Historias de usuario del proyecto |

---

## 🧪 Pruebas

```powershell
# Ejecutar suite de pruebas unitarias y generar reporte JaCoCo
.\mvnw.cmd clean test
```

El reporte de cobertura se genera en `target/site/jacoco/index.html`

---

## 👨‍💻 Autor

Proyecto de Grado — Ingeniería de Sistemas  
**Consultorio Odontológico Doc Quintero**
