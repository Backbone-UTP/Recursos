const express = require('express')
const app = express()
const cors = require('cors')

const userController = require('./src/modules/user/user.controller');

// const swaggerUI = require('swagger-ui-express');
// const swaggerSpec = require('./swagger');

app.use(express.json())

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

//rutas
app.use('/users', userController);


app.listen(3000, () => {
  console.log('Server running on port 3000')
})
