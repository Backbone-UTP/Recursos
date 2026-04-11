const { Router } = require("express");
const userService = require("./user.service");
const router = Router();

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
router.get('/:idUser', async (req, res) => {//obtener usuarios
  try {
    const result = await userService.getUserById(req.params.idUser);
    res.status(200).json({ message: 'Get resource', user: result })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error })
  }
})
router.get('/', async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({ message: 'Get resource', result })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error })
  }
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
router.post('/', async (req, res) => { //crear usuarios
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({ message: 'Get resource', result })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error })
  }
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
router.put('/', async (req, res) => { //actualizar usuarios
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({ message: 'Get resource', result })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error })
  }
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
router.delete('/:idUser', async (req, res) => { //eliminar usuarios
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({ message: 'Get resource', result })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error })
  }
})

module.exports = router;
