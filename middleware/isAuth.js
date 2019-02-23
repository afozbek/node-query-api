const jwt = require('jsonwebtoken');

//Check to make sure header is not undefined, if so, return Forbidden (403)

module.exports = function (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({
            auth: false, message: 'No token provided.'
        });
    }

    jwt.verify(token, 'loginSecret', function (err, decoded) {
        if (err) {
            return res.status(500)
                .send({ auth: false, message: 'Failed to authenticate token.' });
        }
        console.log(decoded);
        next();
    });
}