# Consultorio Odontológico Doc Quintero - Sistema de Información

Sistema de información integral para la gestión administrativa y clínica del **Consultorio Odontológico Doc Quintero**. Permite la administración de personal, gestión de pacientes, agendamiento de citas médicas, historias clínicas electrónicas y reportes de gestión.

---

## 🚀 Cómo Ver el Proyecto Desplegado (En Vivo)

Una vez completado el despliegue en **Render**, la API REST y su documentación interactiva están disponibles públicamente:

### 🌐 Enlaces de Acceso
* **Documentación Interactiva (Swagger UI):**  
  `https://<TU-SERVICIO-RENDER>.onrender.com/swagger-ui.html`  
  *(En esta interfaz podrás probar todos los endpoints y operaciones en tiempo real directamente desde tu navegador).*
* **Especificación OpenAPI (JSON):**  
  `https://<TU-SERVICIO-RENDER>.onrender.com/api-docs`
* **URL Base de la API:**  
  `https://<TU-SERVICIO-RENDER>.onrender.com/api`

### 🔑 Credenciales Iniciales de Prueba
Para autenticarte y probar los endpoints en Swagger UI o mediante Postman/Frontend:
* **Usuario:** `admin@docquintero.com`
* **Contraseña:** `Admin123!`
* **Rol:** `ROLE_ADMIN`

> **Nota:** La primera petición a un servicio gratuito de Render puede tardar entre 30 y 50 segundos mientras el servidor sale del estado de reposo (sleep mode).

---

## 🛠️ Guía Rápida: Cómo Desplegar Gratis en Render (Paso a Paso)

El proyecto incluye un archivo de infraestructura [`render.yaml`](./render.yaml) preconfigurado para realizar el despliegue automático.

### Paso 1: Configurar Base de Datos en MongoDB Atlas (Gratis de por vida)
1. Ingresa a [mongodb.com/atlas](https://www.mongodb.com/atlas/database) e inicia sesión o regístrate.
2. Crea un clúster gratuito **M0 Free Tier** (puedes elegir proveedor AWS en la región más cercana, ej. `us-east-1`).
3. Ve a **Database Access** y crea un usuario de base de datos (ejemplo: usuario `admin_quintero` con su contraseña).
4. Ve a **Network Access** y haz clic en **Add IP Address** -> selecciona **Allow Access from Anywhere (`0.0.0.0/0`)** -> confirma.
5. Ve a **Databases** > haz clic en **Connect** > selecciona **Drivers (Java)** y copia tu Connection String. Debe tener este formato:
   ```text
   mongodb+srv://admin_quintero:<TU_PASSWORD>@cluster0.xyz.mongodb.net/docquintero?retryWrites=true&w=majority
   ```
   *(Asegúrate de reemplazar `<TU_PASSWORD>` por tu contraseña real).*

### Paso 2: Conectar y Desplegar en Render
1. Ingresa a [render.com](https://render.com) e inicia sesión con tu cuenta de **GitHub**.
2. En tu Dashboard de Render, haz clic en el botón **New +** y selecciona **Blueprint** (o **Web Service**).
3. Conecta el repositorio: `4890camilo/Sistema-de-informacion-consultorio-odontologico-Doc-Quintero`.
4. Render detectará automáticamente el archivo `render.yaml`:
   * **Nombre:** `doc-quintero-backend`
   * **Entorno:** `Java`
   * **Build Command:** `./mvnw clean package -DskipTests`
   * **Start Command:** `java -jar target/docquintero-0.0.1-SNAPSHOT.jar`
5. En la sección de variables de entorno, te solicitará el valor para `SPRING_DATA_MONGODB_URI`:
   * Pega la cadena de conexión que copiaste de MongoDB Atlas en el Paso 1.
6. Haz clic en **Apply** (o **Create Web Service**).
7. Render compilará tu aplicación con Maven y te proporcionará una URL pública con HTTPS (ej. `https://doc-quintero-backend.onrender.com`).

---

## 💻 Ejecución en Entorno Local (Sin Docker)

Si deseas ejecutar el proyecto en tu máquina local:

### Requisitos
* **Java JDK:** 17 o superior
* **MongoDB Community Server:** Corriendo en `localhost:27017`

### Pasos
1. Iniciar MongoDB local.
2. Opcional: Cargar datos iniciales ejecutando:
   ```bash
   mongosh mongodb://localhost:27017/docquintero database/init-mongo.js
   ```
3. Ejecutar el backend con Maven Wrapper:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
4. Acceder localmente a Swagger: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 📚 Documentación del Proyecto
* [Manual de Usuario por Rol](docs-tecnica/manual-usuario.md): Guía de uso, acceso al programa, módulos y perfiles operativos.
* [Manual Técnico y de Instalación](docs-tecnica/manual-instalacion.md): Detalles de arquitectura, dependencias y configuración avanzada.
