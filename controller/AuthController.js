const {UsersModel } = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const HttpErrors = require("http-errors");
const jwt = require("jsonwebtoken");

const {JWTSecret, refreshTokenSecret} = process.env;

function parseMaxAge(duration) {
    const unit = duration.slice(-1);
    const amount = parseInt(duration.slice(0, -1), 10);

    switch (unit) {
        case 's': return amount * 1000;
        case 'm': return amount * 60 * 1000;
        case 'h': return amount * 60 * 60 * 1000;
        case 'd': return amount * 24 * 60 * 60 * 1000;
        default: throw new Error('Выбраное время не найдено');
    }
}

class AuthController {
    static registerView = (req, res, next) => {
        try {
            return res.render("auth/register");
        } catch (e) {
            next(e)
        }
    }

    static registerNewUser = async (req, res, next) => {
        try {
            const {name, email, password} = req.body;

            const hashPassword = bcrypt.hashSync(password, 8)

            const newUser = new UsersModel({
                name,
                email,
                password: hashPassword,
                confirmPassword: hashPassword,
            })

            await newUser.save();
            return res.json({href: "/auth/login", message: "Успешная регистрация!"});
        } catch (err) {
            next(err);
            return res.render({error: err.message})
        }
    }


    static loginView = (req, res, next) => {
        try {
            return res.render('auth/login')
        } catch (e) {
            next(e)
        }
    }

    static loginUser = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await UsersModel.findOne({email});

            if (!user) {
                return res.render({error: "Неверный адрес или пароль."});
            }

            const pass = await bcrypt.compare(password, user.password);

            if (!pass) {
                return res.render({error: "Неверный адрес или пароль."});
            }

            const accessToken = jwt.sign({
                id: user._id,
                email: user.email,
                name: user.name,
                reviews: user.reviews,
                registerDate: user.registerDate,
                role: user.role,
                banned: user.banned
            }, JWTSecret, {expiresIn: '15m'});

            const refreshToken = jwt.sign({
                id: user._id,
                email: user.email,
                name: user.name,
                reviews: user.reviews,
                registerDate: user.registerDate,
                role: user.role,
                banned: user.banned
            }, refreshTokenSecret, {expiresIn: '10d'});

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie('token', accessToken, {httpOnly: true, secure: true, maxAge: parseMaxAge('15m')});
            res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, maxAge: parseMaxAge('10d')});

            return res.json({token: accessToken, refreshToken, user});
        } catch (e) {
            next(e);
        }
    }

    static changePassword = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { password, confirmPassword } = req.body;

            if (!password || !confirmPassword) {
                throw new HttpErrors('Неверный адрес или пароль.');
            }

            if(password !== confirmPassword) {
                throw new HttpErrors('Пароли не совпадают.');
            }

            if(password.length < 6 || password.length > 50){
                throw new HttpErrors('Пароль должен содержать минимум 6 символов и максимум 50 символов.');
            }
            if(confirmPassword.length < 6 || confirmPassword.length > 50){
                throw new HttpErrors('Пароль должен содержать минимум 6 символов и максимум 50 символов.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const updatePassword = await UsersModel.findByIdAndUpdate(
                id,
                { password: hashedPassword },
                { new: true }
            );

            if (!updatePassword) {
                throw new HttpErrors('Пользователь не найден.');
            }

            res.redirect('/')
        } catch (e) {
            console.log(e);
            next(e);
        }
    }



    static logout = (req, res, next)=>{
        req.cookies.user = null;
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        return res.json({status: "Успешный выход!"});
    }

    static test = (req, res, next)=>{
        return res.render('test');
    }

}

module.exports = AuthController;
