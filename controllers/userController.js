const jwt = require('jsonwebtoken');
const bcrpt = require('bcryptjs');
const conn = require('../util/mysql');
const sha256 = require('sha256');

exports.getIndex = (req, res, next) => {
    res.status(200).json({
        mesaj: "Hosgeldiniz"
    })
};

exports.signup = (req, res, next) => {
    bcrpt
        .hash(req.body.password, 12, (err, hash) => {
            if (err) {
                console.log(req.body);
                console.log('Error while hashing password -> ' + err);
                res.status(500).json({
                    status: 'Failure',
                    message: 'Cannot hash password!'
                });
                throw err;
            }
            let sql = "insert into users (id, email, name, password) values (null, ?, ?, ?)"
            conn.query(sql, [req.body.email, req.body.name, hash], (err, result) => {
                if (err) {
                    console.log('Error while creating user -> ' + err);
                    throw err;
                }
                //res
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
        //result[0].password
        if (err) {
            console.log('There was a problem in database.. -> ' + err);
            throw err;
        }
        if (!result.length) {
            res.status(201).json({
                status: 'Failure',
                message: 'Email was wrong!'
            })
        }

        else {
            console.log(result)
            bcrpt.compare(req.body.password, result[0].password)
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
                    throw err;
                })
        }
    });

}
//7e9ca8d07cca8e39bf46846c244fecc488eb173a4a5036ba3f0be8bb83859ddd
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
    } else {
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

}



