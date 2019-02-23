const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'furkan',
    password: 'admin',
    database: 'user_api'
});

conn.connect((err) => {
    if (err) {
        console.log('Error while connecting database' + err);
    } else {
        console.log('Database connection successfull');
    }
})
module.exports = conn;

