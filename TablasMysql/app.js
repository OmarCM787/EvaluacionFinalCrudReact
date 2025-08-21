const express = require('express')
const mysql = require("mysql2")
const { createTables } = require('./TablasMysql.js');
const { camposPermitidos } = require('./TablasMysql.js')
const { idTablas } = require('./TablasMysql.js')
const PORT = 3000
const cors = require('cors')

const app = express();

app.use(express.json())

const connection = mysql.createConnection(
    "mysql://root:HGmGNglnvuKcNYDXykwgYrISSTrBIYyY@metro.proxy.rlwy.net:49689/railway"
);

connection.connect(error => {
  if (error) {
    console.error('Error conectando a MySQL:', error);
    return;
  }
  console.log('Conectado a MySQL');

  createTables(connection);
});

app.use(cors());

app.get('/:table', (req, res) => {
    
    const table = req.params.table;

    const tablas = ['Menu', 'Usuarios', 'Mesas', 'Empleados', 'MetodoPago', 'Comprobante']; 

    if (!tablas.includes(table)) {
        return res.status(400).send('Tabla no permitida');
    }

    connection.query(`SELECT * FROM \`${table}\``, (error, results) => {
        
        if (error) {
            console.error('Error al obtener usuarios:', error); 
            res.status(500).send('Error al obtener usuarios'); 
            return;
        }
        res.json(results);
    })
})

app.post('/:table', (req, res) => {

    const table = req.params.table;
    const data = req.body;
    const camposvalidos = camposPermitidos[table]

    const datosValidos = {};
    const tablas = ['Menu', 'Usuarios', 'Mesas', 'Empleados', 'MetodoPago', 'Comprobante']; 

    for (let key in data) {
        if (camposvalidos.includes(key) && data[key] != null && data[key] !== '') {
            datosValidos[key] = data[key];
        }
    }
 
    if (!tablas.includes(table)) {
        return res.status(400).send('Tabla no permitida');
    }

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send('No se enviaron datos');
    }
    
    const columns = Object.keys(datosValidos); 
    const values = Object.values(datosValidos); 

    const marcadoresPosicion = columns.map(() => '?').join(', ');
    const consulta = `INSERT INTO \`${table}\` (${columns.join(', ')}) VALUES (${marcadoresPosicion})`;    

    connection.query(consulta, values, (error, results) => {
        
        if (error) {
            console.error(`Error al insertar en la tabla ${table}:`, error);
            res.status(500).send('Error al insertar los datos');
            return;
        }

        res.status(201).send(`Registro insertado en ${table} con ID ${results.insertId}`);
    })
})

app.put('/:table/:id', (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    const data = req.body;
    const camposValidos = camposPermitidos[table];
    const tablaId = idTablas[table];

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se enviaron datos' });
    }

    const datosValidos = {};
    for (let key in data) {
        if (camposValidos.includes(key) && data[key] != null && data[key] !== '') {
            datosValidos[key] = data[key];
        }
    }

    if (Object.keys(datosValidos).length === 0) {
        return res.status(400).json({ error: 'No hay campos válidos para actualizar' });
    }

    const columns = Object.keys(datosValidos);
    const values = Object.values(datosValidos);

    const actualizarValues = columns.map(campo => `\`${campo}\` = ?`).join(', ');
    const consulta = `UPDATE \`${table}\` SET ${actualizarValues} WHERE \`${tablaId}\` = ?`;
    values.push(id);

    connection.query(consulta, values, (error, results) => {
        if (error) {
            console.error(`Error al actualizar en la tabla ${table}:`, error);
            return res.status(500).json({ error: 'Error al actualizar los datos' });
        }

        res.status(200).json({
            message: `Registro actualizado en ${table}`,
            id,
            changes: datosValidos
        });
    });
});

app.delete('/:table/:id', (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    const tablaId = idTablas[table];

    const consulta = `DELETE FROM \`${table}\` WHERE \`${tablaId}\` = ?`; 
    const values = [id];

    connection.query(consulta, values, (error, results) => {
        if (error) {
            console.error(`Error al eliminar el ID ${id} de la tabla ${table}:`, error);
            return res.status(500).send(`Error al eliminar los datos del ID ${id}`);
        }

        res.status(200).send(`Datos eliminados de la tabla ${table} con ID ${id}`);
    })
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})






