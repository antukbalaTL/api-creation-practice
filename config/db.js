require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

// const sql = 'select * from details';

// pool.execute(sql, (err, result) => {
//     if (err) throw err;

//     // console.log(result);
//     result.forEach((person) => {
//         console.log(`${person.name}-${person.university}`);
//     });
// });

module.exports = pool.promise();
