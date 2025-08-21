
function createTables(connection) {
  connection.query(`
    CREATE TABLE IF NOT EXISTS Usuarios (
      IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
      Nombre VARCHAR(20),
      Apellido VARCHAR(20),
      Direccion VARCHAR(100),
      Edad INT
    )
  `, handleResult('Usuarios'));
}

function handleResult(tableName) {
  return (err) => {
    if (err) {
      console.error(`❌ Error creando tabla ${tableName}:`, err.message);
    } else {
      console.log(`✅ Tabla ${tableName} lista`);
    }
  };
}

const camposPermitidos = {
  Usuarios: ['Nombre', 'Apellido', 'Direccion', 'Edad'],
};

const idTablas = {
  Usuarios: 'IdUsuario',
}

module.exports = {
  createTables,
  camposPermitidos,
  idTablas
};
