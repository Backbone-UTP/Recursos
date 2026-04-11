const express = require('express')
const app = express()
const cors = require('cors')

// const swaggerUI = require('swagger-ui-express');
// const swaggerSpec = require('./swagger');
const mysql2 = require('mysql2/promise');

const sql = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


app.use(express.json())
app.use(cors())
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificar estado de la API
 *     description: Retorna un mensaje indicando que la API está funcionando correctamente.
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/health', async (req, res) => { 
  const [result] = await sql.query("SELECT NOW()");
  res.status(200).json({ message: 'OK', result })
})

/**
 * @swagger
 * /user/{idUser}:
 *   get:
 *     summary: Obtener un usuario
 *     description: Obtener un usuario específico por su ID.
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
app.get('/user/:idUser', (req, res) => {//obtener usuarios
  const { idUser } = req.params
  console.log({query: req.query})
  res.status(200).json({ message: 'Get resource' })
})

app.get('/users', async (req, res) => {
  const [result] = await sql.query("SELECT * FROM users");
  res.status(200).json({ message: 'Get resource', result })
})

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crear un usuario
 *     description: Crea un nuevo usuario enviando sus datos en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recurso creado
 */
app.post('/users', async (req, res) => { //crear usuarios
  console.log({req: req.body})
  const { name, password } = req.body;
  await sql.execute("INSERT INTO users (name, password) VALUES (?, ?)", [name, password]);
  res.json({ message: 'Create resource' })
})

/**
 * @swagger
 * /:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recurso actualizado
 */
app.put('/', (req, res) => { //actualizar usuarios
  console.log({req: req.body})
  res.json({ message: 'Update resource' })
})

/**
 * @swagger
 * /user/{idUser}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recurso eliminado
 */
app.delete('/user/:idUser', (req, res) => { //eliminar usuarios
  const { idUser } = req.params;
  res.status(200).json({ message: 'Delete resource' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
