const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const conn = require('../util/config');
const sha256 = require('sha256');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 12, (err, hash) => {
        if (err) {
            res.status(500).json({
                status: 'Failure',
                message: 'Cannot hash password!',
                err: err
            });
        }
        let sql = "insert into users (id, email, name, password) values (null, ?, ?, ?)"
        conn.query(sql, [req.body.email, req.body.name, hash], (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 'Failure',
                    message: 'Error while creating user',
                    err: err
                });
            }
            res.status(201).json({
                status: 'Success',
                message: 'User created',
                result: result
            })
        });
    });
}

exports.login = (req, res, next) => {
    let sql = "select id, password from users where email=?";
    conn.query(sql, [req.body.email], (err, result) => {
        if (err) {
            res.status(500).json({
                status: 'Failure',
                message: 'There was a problem in database',
                err: err
            });
        }
        if (!result.length) {
            return res.status(401).json({
                status: 'Failure',
                message: 'Email was wrong!'
            })
        }


        bcrypt.compare(req.body.password, result[0].password, (err, success) => {
            if (!success) {
                res.status(400).json({
                    status: 'Failure',
                    message: 'Cannot hash the password',
                    err: err
                });
            }
        })
            .then(isEqual => {
                if (!isEqual) {
                    res.status(401).json({
                        status: 'Failure',
                        message: 'Password was wrong'
                    })
                }
                //set token with userId
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
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                res.status(err.statusCode).json({
                    status: 'Failure',
                    message: 'Something wrong :(',
                    err: err
                });
            });

    });
}

exports.postQuery = (req, res, next) => {
    const query = req.body.query;
    const hash = req.body.hash;
    const tokenString = req.headers['x-access-token'] + 'Furkan' + query;
    const token = sha256(tokenString);

    console.log(token);
    console.log(hash);
    if (hash != token) {
        res.status(200).json({
            status: 'Failure',
            message: 'Not Authenticated'
        });
    }
    conn.query(query, ((err, result) => {
        if (err) {
            res.status(500).json({
                status: 'Failure',
                message: 'Hata olustu',
                err: err
            })
        }
        //Bazı durumlarda undefined!
        if (!result.length)
            res.status(201).json({ status: 'Basarili' })
        res.status(200).json({
            status: 'Success!',
            message: 'Records successfully retrieved',
            records: result
        });
    }));


}



