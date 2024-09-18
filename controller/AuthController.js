const {UsersModel } = require("../models/UsersModel");
const bcrypt = require("bcrypt");
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
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true });
            }
            return res.render(locale === 'en' ? 'en/auth/register' : 'ru/auth/register');
        } catch (e) {
            next(e)
        }
    }

    static registerNewUser = async (req, res, next) => {
        try {
            const {name, email, password} = req.body;

            const hashPassword = bcrypt.hashSync(password, 8)

            const newUser = await new UsersModel({
                name,
                email,
                password: hashPassword,
                confirmPassword: hashPassword,
                banned: [{ banType: false }],
                locale: 'en',
            })

            await newUser.save();
            return res.json({href: "/auth/login", message: "Успешная регистрация!"});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }


    static loginView = (req, res, next) => {
        try {
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true });
            }
            return res.render(locale === 'en' ? 'en/auth/login' : 'ru/auth/login');
        } catch (e) {
            next(e)
        }
    }

    static loginUser = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await UsersModel.findOne({ email });

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });
            }

            if (!user) {
                return res.status(401).json({ error: "Неверный адрес или пароль." });
            }

            const pass = await bcrypt.compare(password, user.password);

            if (!pass) {
                return res.status(401).json({ error: "Неверный адрес или пароль." });
            }

            const payload = {
                id: user._id,
                email: user.email,
                name: user.name,
                reviews: user.reviews,
                registerDate: user.registerDate,
                role: user.role,
                banned: user.banned,
                locale: user.locale,
            };

            const accessToken = jwt.sign(payload, JWTSecret, { expiresIn: '15m' });
            const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '10d' });

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie('token', accessToken, { httpOnly: true, secure: true, maxAge: parseMaxAge('15m') });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: parseMaxAge('10d') });

            return res.json({ token: accessToken, refreshToken, user, locale });
        } catch (e) {
            next(e);
        }
    }


    static changePassword = async (req, res, next) => {
        try {
            const { id } = req.user;
            const { oldPassword, password, confirmPassword } = req.body;

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true });
            }

            const user = await UsersModel.findById(id);

            const pass = await bcrypt.compare(oldPassword, user.password);

            if (!pass) {
                const errorMsg = locale === 'en' ? 'The old password is incorrect.' : 'Неверный старый пароль.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            if (!password || !confirmPassword) {
                const errorMsg = locale === 'en' ? 'Password and password confirmation are required.\n' : 'Пароль и подтверджение пароля обязательны.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            if (password !== confirmPassword) {
                const errorMsg = locale === 'en' ? 'The passwords do not match.' : 'Пароли не совпадают.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            if (password.length < 6 || password.length > 50) {
                const errorMsg = locale === 'en' ? 'The password must contain a minimum of 6 characters and a maximum of 50 characters.\n' : 'Пароль должен содержать минимум 6 символов и максимум 50 символов.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const updatePassword = await UsersModel.findByIdAndUpdate(
                id,
                { password: hashedPassword },
                { new: true }
            );

            if (!updatePassword) {
                const errorMsg = locale === 'en' ? 'User not found.' : 'Пользователь не найден.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            res.redirect('/');
        } catch (e) {
            console.log(e);
            next(e);
        }
    }




    static logout = (req, res, next)=> {
        try {
            req.cookies.user = null;
            res.clearCookie('token');
            res.clearCookie('refreshToken');
            return res.json({status: "Успешный выход!"});
        }catch (err){
            next(err)
        }
    }

}

module.exports = AuthController;
