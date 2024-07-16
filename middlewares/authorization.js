const jwt = require('jsonwebtoken');

const { JWTSecret } = process.env;

const verifyToken = (req, res, next) => {
    console.log('auth', req.headers['authorization']);
    if (req.headers['authorization']) {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            jwt.verify(token, JWTSecret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: 'Failed to authenticate token' });
                }
                req.user = decoded;

                next();
            });
        } catch (e) {
            next(e)
            return res.status(400).json({ error: 'Invalid token' });
        }
    } else {
        return res.status(403).json({ error: 'No token provided' });
        // return res.redirect('/')
    }
};

module.exports = { verifyToken };