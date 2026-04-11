

const mysql2 = require('mysql2/promise');

(async () => {

    const sql = await mysql2.createConnection({
        host: 'localhost',
        port: 3310,
        user: 'root',
        password: 'example',
        database: 'backbone'
    })
    
    const res = await sql.query("SELECT NOW()");
    
    console.log(res);
})()

