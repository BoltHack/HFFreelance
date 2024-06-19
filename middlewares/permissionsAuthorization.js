const jwt = require("jsonwebtoken");
const HttpErrors = require("http-errors");

function verifyPermissions(role) {
    return (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return next(new HttpErrors.Unauthorized("Требуется аутентификация."));
        }

        jwt.verify(token, process.env.JWTSecret, (err, decoded) => {
            if (err) {
                return next(new HttpErrors.Unauthorized("Недействительный токен."));
            }

            if (!decoded.role || decoded.role !== role) {
                return next(new HttpErrors.Forbidden("У вас нет доступа к этому ресурсу."));
            }

            req.user = decoded;
            next();
        });
    };
}

module.exports = {verifyPermissions};
