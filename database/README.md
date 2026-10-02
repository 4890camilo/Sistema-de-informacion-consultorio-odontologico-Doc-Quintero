# Guía de Respaldo y Restauración de Base de Datos (MongoDB)
## Consultorio Odontológico Doc Quintero

En cumplimiento con los requerimientos normativos (Resolución 1995 de 1999 y Ley 1581 de 2012) y las especificaciones técnicas del proyecto de grado, a continuación se documentan los procedimientos de copia de seguridad (*backup*) y recuperación (*restore*) de la base de datos documental.

---

### 1. Requisitos Previos
Tener instaladas las herramientas de línea de comandos de MongoDB (*MongoDB Database Tools*):
- `mongodump`
- `mongorestore`

---

### 2. Procedimiento de Respaldo (Backup)

Para generar una copia de seguridad íntegra de la base de datos `docquintero`:

```bash
# Crear directorio de respaldo con marca de tiempo
mongodump --uri="mongodb://localhost:27017/docquintero" --out="./backups/backup_$(date +%Y%m%d_%H%M%S)"
```

Para comprimir directamente en un archivo `.archive`:
```bash
mongodump --uri="mongodb://localhost:27017/docquintero" --archive="./backups/docquintero_backup.gz" --gzip
```

---

### 3. Procedimiento de Restauración (Restore)

Para restaurar la base de datos desde una copia previamente generada:

#### Opción A: Desde directorio
```bash
mongorestore --uri="mongodb://localhost:27017/docquintero" --drop ./backups/backup_YYYYMMDD_HHMMSS/docquintero
```

#### Opción B: Desde archivo comprimido (.gz)
```bash
mongorestore --uri="mongodb://localhost:27017/docquintero" --drop --archive="./backups/docquintero_backup.gz" --gzip
```

> **Nota de Seguridad:** La bandera `--drop` asegura que las colecciones existentes sean eliminadas antes de restaurar, garantizando que no existan duplicidades o conflictos en identificadores únicos y claves primarias.
