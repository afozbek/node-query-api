const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sha256 = require('sha256');

const Db = require('../util/mysql');
const config = require('../util/config');

const conn = new Db(config);


exports.getIndex = async (req, res, next) => {
    const url = req.query.url;
    console.log(url);
    if (!url) {
        return res.status(200).json({
            mesaj: "HELLO WORLD",
        })
    }
    res.status(200).json({
        canGet: canGetUrl(url)
    })
};
exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12)
        let sql = "insert into users (id, email, name, password) values (null, ?, ?, ?)"
        const result = await conn.prepareQuery(sql, [req.body.email, req.body.name, hash]);
        res.status(201).json({
            status: 'Success',
            message: 'User created!',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.login = async (req, res, next) => {
    let sql = "select id, password from users where email=?";

    try {
        const result = await conn.prepareQuery(sql, [req.body.email]);
        if (!result.length) {
            throw new Error('User not exists');
        }

        const isEqual = await bcrypt.compare(req.body.password, result[0].password);
        if (!isEqual) {
            const error = new Error('Password is wrong!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            id: result[0].id
        }
            , 'loginSecret'
            , { expiresIn: '1h' });
        res.status(201).json({
            status: 'Success',
            message: 'User login succesfull!',
            token: token
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.postQuery = async (req, res, next) => {
    const query = req.body.query;
    const hash = req.body.hash;
    const tokenString = req.headers['x-access-token'] + 'Furkan' + query;
    const token = sha256(tokenString);

    console.log(hash); //our body hash
    console.log(token); //our generated hash
    try {
        if (hash != token) {
            const err = new Error('Not Authenticated');
            err.statusCode = 401;
            throw err;
        }
        const result = await conn.prepareQuery(query, null);
        if (!result.length)
            return res.status(201).json({ status: 'Basarili' })
        res.status(200).json({
            status: 'Success!',
            message: 'Records successfully retrieved',
            records: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}






