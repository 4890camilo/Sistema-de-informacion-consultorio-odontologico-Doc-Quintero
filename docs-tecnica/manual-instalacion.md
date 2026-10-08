# Manual de Instalación y Despliegue
## Sistema de Información - Consultorio Odontológico Doc Quintero

Este manual detalla los pasos requeridos para poner en marcha el sistema, tanto en un entorno local de desarrollo como en la nube (producción) de forma gratuita.

---

## 1. Despliegue Local (Desarrollo)

### 1.1. Requisitos Previos
* **Java Development Kit (JDK):** Versión 17 o superior.
* **Node.js:** Versión 18 o superior con `npm` (Para el Frontend).
* **MongoDB Community Server:** Versión 6.0 o superior (Puerto `27017`).
* **Git**

### 1.2. Configuración de Base de Datos
1. Inicie el servicio de su MongoDB local.
2. Si es la primera vez, puede inicializar los datos base ejecutando:
   ```bash
   mongosh mongodb://localhost:27017/docquintero database/init-mongo.js
   ```

### 1.3. Ejecución del Backend (Spring Boot)
1. Abra una terminal en la raíz del proyecto backend.
2. Inicie la aplicación mediante Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
3. El servidor correrá en:
   * **API Base:** `http://localhost:8080/api`
   * **Swagger UI (Documentación Interactiva):** `http://localhost:8080/swagger-ui.html`

### 1.4. Ejecución del Frontend (Angular)
1. Navegue al directorio `doc-quintero-frontend`.
2. Instale los módulos de Node:
   ```bash
   npm install
   ```
3. Inicie el servidor de desarrollo:
   ```bash
   npm start
   ```
4. El sistema estará disponible en su navegador ingresando a `http://localhost:4200`

---

## 2. Despliegue en Producción (Nube Gratuita)

Para publicar el sistema en internet sin costos de servidor, utilizaremos la capa gratuita de **MongoDB Atlas** y **Render**.

### 2.1. Base de Datos en MongoDB Atlas (Gratis de por vida)
1. Vaya a [mongodb.com/atlas](https://www.mongodb.com/atlas/database) y cree una cuenta.
2. Cree un nuevo **Cluster M0 (Free Tier)**. Seleccione AWS o GCP en la región más cercana.
3. Vaya a la pestaña **Database Access** y cree un usuario (ej. `admin_quintero`) con su contraseña.
4. Vaya a **Network Access** y agregue la IP `0.0.0.0/0` para permitir conexiones desde cualquier servidor.
5. Vaya a **Databases**, haga clic en **"Connect"**, elija "Drivers" (Java) y copie la cadena de conexión (Connection String).
   * Se verá algo así: `mongodb+srv://admin_quintero:<password>@cluster0.abcde.mongodb.net/docquintero?retryWrites=true&w=majority`

### 2.2. Backend en Render (Gratis)
1. Empuje (Push) todo el código fuente del backend a un repositorio en **GitHub**.
2. Vaya a [render.com](https://render.com) y regístrese con su cuenta de GitHub.
3. Haga clic en **"New" > "Web Service"** y conecte el repositorio de su backend.
4. Configure los parámetros de entorno en Render:
   * **Environment:** `Java`
   * **Build Command:** `./mvnw clean package -DskipTests`
   * **Start Command:** `java -jar target/docquintero-0.0.1-SNAPSHOT.jar`
5. En la sección de **Environment Variables (Variables de Entorno)**, agregue:
   * `SPRING_DATA_MONGODB_URI`: *[Pegue aquí la cadena de conexión que obtuvo en Atlas]*
6. Haga clic en **Create Web Service**. ¡Render descargará el código, lo compilará y lo pondrá en internet!

### 2.3. Frontend en Render o Vercel (Gratis)
1. Cree un nuevo proyecto en Vercel o Render (Static Site) conectando el repositorio de `doc-quintero-frontend`.
2. Parámetros de compilación:
   * **Framework Preset:** Angular
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist/doc-quintero-frontend` (O como esté configurado en su `angular.json`)
3. **Importante:** Asegúrese de que dentro de los `environment.ts` del código fuente de Angular, la URL base de la API apunte a la URL pública que le dio Render en el paso anterior (ej. `https://backend-quintero.onrender.com/api`).
4. Despliegue. Su sistema estará completamente en vivo en internet con un subdominio gratuito y certificado de seguridad (HTTPS).
