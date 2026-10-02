// Script de inicialización para MongoDB - Consultorio Odontológico Doc Quintero
// Este script inicializa colecciones, crea índices y define el usuario administrador inicial.

const dbName = "docquintero";
db = db.getSiblingDB(dbName);

print(">>> Inicializando base de datos: " + dbName);

// 1. Colección de Usuarios
db.createCollection("usuarios");
db.usuarios.createIndex({ "email": 1 }, { unique: true });
db.usuarios.createIndex({ "active": 1 });

// Inserción de usuario administrador por defecto
// Password hasheada con BCrypt (factor de costo 10): Admin123!
db.usuarios.updateOne(
  { email: "admin@docquintero.com" },
  {
    $setOnInsert: {
      nombre: "Administrador Sistema",
      email: "admin@docquintero.com",
      password: "$2a$10$wN9aE3hM9yRkmO5aFqH4lOVbK.0kG7R3u0cIqZ5WqYQv07vD0z5e6",
      roles: ["ROLE_ADMIN"],
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  { upsert: true }
);

// 2. Colección de Pacientes
db.createCollection("pacientes");
db.pacientes.createIndex({ "identificationNumber": 1 }, { unique: true });
db.pacientes.createIndex({ "active": 1 });
db.pacientes.createIndex({ "firstName": "text", "lastName": "text", "identificationNumber": "text" });

// 3. Colección de Citas
db.createCollection("citas");
db.citas.createIndex({ "pacienteId": 1 });
db.citas.createIndex({ "odontologoId": 1 });
db.citas.createIndex({ "fechaHora": 1 });
db.citas.createIndex({ "estado": 1 });

// 4. Colección de Historias Clínicas
db.createCollection("historias_clinicas");
db.historias_clinicas.createIndex({ "pacienteId": 1 }, { unique: true });

print(">>> Inicialización y definición de índices completada con éxito.");
