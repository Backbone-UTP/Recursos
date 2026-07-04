const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Clase de backbone',
        version: '0.0.1',
        description: 'Clase de backbone, estamos aprendiendo a usar APIS REST',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./index.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;