# Manual de Instalación y Despliegue Local
## Sistema de Información - Consultorio Odontológico Doc Quintero

Este manual detalla los pasos requeridos para poner en marcha el sistema en un entorno on-premise local conforme a la arquitectura definida en el proyecto de grado.

---

### 1. Requisitos del Sistema
- **Java Development Kit (JDK):** Versión 17 o superior.
- **Node.js:** Versión 18 o superior con `npm`.
- **MongoDB Community Server:** Versión 6.0 o superior en puerto `27017`.
- **Git**

---

### 2. Configuración de Base de Datos
1. Iniciar el servicio de MongoDB local.
2. Ejecutar el script de inicialización con índices y datos semilla:
   ```bash
   mongosh mongodb://localhost:27017/docquintero database/init-mongo.js
   ```

---

### 3. Despliegue del Backend (Spring Boot)
1. Navegar a la raíz del proyecto backend.
2. Compilar y ejecutar pruebas:
   ```bash
   ./mvnw clean test
   ```
3. Iniciar la aplicación:
   ```bash
   ./mvnw spring-boot:run
   ```
4. La API REST y documentación interactiva quedará disponible en:
   - **API Base:** `http://localhost:8080/api`
   - **Swagger UI:** `http://localhost:8080/swagger-ui.html`

---

### 4. Despliegue del Frontend (Angular)
1. Navegar al directorio del frontend:
   ```bash
   cd doc-quintero-frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
4. Abrir en el navegador: `http://localhost:4200`
