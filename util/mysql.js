const mysql = require('mysql');
class Db {
    constructor(config) {
        this.conn = mysql.createConnection(config);
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.conn.connect((err, args) => {
                // Call reject on error states,
                // call resolve with results
                if (err) {
                    return reject(err);
                }
                resolve(args);
            });
        });
    }
    //Prepare Any Query
    /**
     * 
     * @param {String} sql Query string
     * @param {Array} queryOpt Array of queryOptions
     */
    prepareQuery(sql, queryOpt) {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, queryOpt, (err, rows, fields) => {
                // Call reject on error states,
                // call resolve with results
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.conn.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = Db;