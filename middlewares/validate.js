const Joi = require('@hapi/joi');
const {UsersModel} = require("../models/UsersModel");
const bcrypt = require('bcrypt');

const validateRegister = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existingUser = await UsersModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Адрес электронной почты уже зарегистрирован.' });
        }


        let Schema = Joi.object({
            name: Joi.string().min(3).max(20).required().pattern(new RegExp('^[^~!@#$%^&*()+{}|?<>!"№;%:?*()]*$')).message('Имя содержит запрещенные символы.'),
            email: Joi.string().min(5).max(50).required().pattern(new RegExp('^[^~!#$%^&*()+{}|?<>!"№;%:?*()]*$')).message('Адрес содержит запрещенные символы.').email(),
            password: Joi.string().min(6).max(50).required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        }).messages({
            'any.required': 'Пожалуйста, заполните все поля ввода.',
            'string.empty': 'Пожалуйста, укажите ваше имя.',
            'string.email': 'Пожалуйста, введите корректный адрес электронной почты.',
            'any.only': 'Пароли не совпадают.',
            'string.min': 'Пароль должен содержать как минимум 6 символов.',
            'string.pattern.base': 'Поле содержит запрещенные символы.'
        });

        let {error} = Schema.validate(req.body);
        console.log('validation error', error)
        if (error) {
            return res.json({error: error.message})
        }
        next()
    } catch (e) {
        next(e)
        return res.json({error: e.message})
    }
}

const validateLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await UsersModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: 'Адрес электронной почти не найден.' });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({error: 'Неверный адрес или пароль.'});
        }

        let Schema = Joi.object({
            email: Joi.string().min(5).max(50).required().email(),
            password: Joi.string().min(6).max(50).required(),
        }).messages({
            'any.required': 'Пожалуйста, заполните все поля ввода.',
        })
        let {error} = Schema.validate(req.body);
        console.log('login error', error)
        if (error) {
            return res.json({error: error.message})
        }
        next()
    } catch (e) {
        next(e);
        return res.json({e: e.message})
    }
}

const validateReviews = async (req, res, next) => {
    try {
        let Schema = Joi.object({
            password: Joi.string().min(6).max(50).required(),
            confirmPassword: Joi.string().min(6).max(50).valid(Joi.ref('password')).required()
        }).messages({
            'any.required': 'Пожалуйста, заполните все поля ввода.',
            'string.email': 'Пожалуйста, введите корректный адрес электронной почты.',
            'any.only': 'Пароли не совпадают.',
        });

        let {error} = Schema.validate(req.body);
        console.log('validation error', error)
        if (error) {
            return res.json({error: error.message})
        }
        next()
    } catch (e) {
        next(e)
        return res.json({error: e.message})
    }
}

const validateChangePassword = async (req, res, next) => {
    try {
        let Schema = Joi.object({
            password: Joi.string().min(6).max(50).required().messages({
                'string.empty': 'Поле  не должно быть пустым.',
                'any.required': 'Пожалуйста, укажите ваше имя.',
                'string.min': 'Пароль должен содержать не менее {#limit} символов.',
                'string.max': 'Пароль должен содержать не более {#limit} символов.',
            }),
            confirmPassword: Joi.string().min(6).max(50).required().messages({
                'string.empty': 'Поле не должно быть пустым.',
                'any.required': 'Поле не должно быть пустым.',
                'string.min': 'Пароль должен содержать не менее {#limit} символов.',
                'string.max': 'Пароль должен содержать не более {#limit} символов.',
            }),
        });

        let {error} = Schema.validate(req.body);
        console.log('validation error', error)
        if (error) {
            return res.json({error: error.message})
        }
        next()
    } catch (e) {
        next(e)
        return res.json({error: e.message})
    }
}
module.exports = {validateRegister, validateLogin, validateReviews, validateChangePassword}