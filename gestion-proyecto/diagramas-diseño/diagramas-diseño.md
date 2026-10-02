# Diagramas de Arquitectura y Diseño (Modelo C4 y UML)
## Consultorio Odontológico Doc Quintero

---

### 1. Diagrama de Arquitectura de Capas (N-Tier)

```mermaid
graph TD
    subgraph Capa_Presentacion ["Capa de Presentación (Frontend)"]
        UI[Angular 21 + TypeScript]
        AuthMod[Módulo Auth]
        PacMod[Módulo Pacientes]
        CitMod[Módulo Citas & Agenda]
        HcMod[Módulo Historia Clínica]
        RepMod[Módulo Reportes]
    end

    subgraph Capa_Logica ["Capa de Lógica de Negocio (Backend)"]
        Sec[Spring Security + JWT Filter]
        Controllers[Controladores REST]
        Services[Servicios de Negocio]
        Listeners[MongoCsfleEventListener (Cifrado CSFLE)]
    end

    subgraph Capa_Datos ["Capa de Persistencia y Datos"]
        Repo[Spring Data Repositories]
        MongoDB[(MongoDB On-Premise)]
    end

    UI -->|HTTPS / REST JSON| Sec
    Sec --> Controllers
    Controllers --> Services
    Services --> Listeners
    Services --> Repo
    Repo --> MongoDB
```

---

### 2. Diagrama de Componentes del Sistema

```mermaid
classDiagram
    class UsuarioController {
        +login(LoginRequest)
        +register(RegisterRequest)
    }
    class PacienteController {
        +listar(q)
        +obtenerPorId(id)
        +crear(PacienteRequest)
        +actualizar(id, PacienteRequest)
    }
    class CitaController {
        +listarTodas()
        +crear(CitaRequest)
        +obtenerPorId(id)
        +actualizarEstado(id, CitaEstadoRequest)
    }
    class HistoriaClinicaController {
        +obtenerPorPaciente(pacienteId)
        +crear(HistoriaClinicaRequest)
        +actualizar(id, HistoriaClinicaRequest)
    }
    class ReporteController {
        +obtenerResumen()
    }

    UsuarioController ..> AuthService
    PacienteController ..> PacienteService
    CitaController ..> CitaService
    HistoriaClinicaController ..> HistoriaClinicaService
    ReporteController ..> ReporteService
```

---

### 3. Diagrama de Despliegue Local (On-Premise)

```mermaid
graph LR
    subgraph Terminales_Consultorio ["Terminales de Trabajo (LAN)"]
        Nav1[PC Recepción - Navegador Web]
        Nav2[PC Consultorio Odontólogo - Navegador Web]
    end

    subgraph Servidor_Local ["Servidor Local On-Premise"]
        subgraph Backend_App ["JVM / Spring Boot (Puerto 8080)"]
            SpringApp[doc-quintero-backend.jar]
        end
        subgraph Motor_BD ["MongoDB Engine (Puerto 27017)"]
            MongoEngine[(Base de Datos: docquintero)]
        end
    end

    Nav1 -->|HTTP:4200 / HTTP:8080| SpringApp
    Nav2 -->|HTTP:4200 / HTTP:8080| SpringApp
    SpringApp -->|TCP:27017| MongoEngine
```
