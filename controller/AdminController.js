const {UsersModel} = require("../models/UsersModel");
const {NewsModel} = require("../models/NewsSchema");
const {AdminModel} = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const HttpErrors = require("http-errors");

class AdminController {
    static sendNewsAdmin = (req, res, next) => {
        const user = req.user;
        return res.render('admin/sendNews', {user});
    }

    static allUsersAdmin = async (req, res, next) => {
        try {
            const users = await UsersModel.find({role: 'User'});
            res.render('admin/allUsers', { users });
        } catch (err) {
            next(err);
        }
    }
    static allNewsAdmin = async (req, res, next) => {
        try {
            const news = await NewsModel.find();
            res.render('admin/allNews', {news});
        } catch (err) {
            next(err);
        }
    }
    static sendLinksAdmin = async (req, res, next) => {
        const links = await AdminModel.find();
        return res.render('admin/sendLinks', {links});
    }
    static requestUnbanAdmin = async (req, res, next) => {
        try {
            const users = await UsersModel.aggregate([
                { $match: { role: 'User' } },
                {
                    $match: {
                        'requestUnban': { $exists: true, $ne: [] }
                    }
                }
            ]);

            res.render('admin/requestUnban', { users });
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }


    static deleteUserAdmin = async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await UsersModel.findById(id);
            if(!user){
                res.status(404).json({error: 'Пользователь не найден.'});
            }
            await UsersModel.findByIdAndDelete(id);
            setTimeout(() => {
                res.redirect('/admin/allUsers');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (err){
            next(err)
        }
    }

    static deleteNewsAdmin = async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await NewsModel.findById(id);
            if(!user){
                res.status(404).json({error: 'id не найден.'});
            }
            await NewsModel.findByIdAndDelete(id);
            setTimeout(() => {
                res.redirect('/admin/allNews');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (err){
            next(err)
        }
    }


static sendNewsPost = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const newNews = new NewsModel({
            title: title,
            content: content
        });

        await newNews.save();

        res.redirect('/admin/sendNews');
    } catch (err) {
        console.error('Ошибка:', err);
        res.status(500).json({ error: err.message });
    }
}

static changePasswordAdmin = async (req, res, next) => {
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

            setTimeout(() => {
                res.redirect('/admin/allUsers');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static deleteReviewAdmin = async (req, res, next) => {
        try{
            const { id } = req.params;

            await UsersModel.findByIdAndUpdate(
                id,
                { reviews: [] },
                { new: true }
            )
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ message: "Пользователь не найден" });
                    }
                    res.redirect('/admin/allUsers')
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        }catch (e){
            console.log(e)
            next(e)
        }
    }

    static sendLinksPostVk = async (req, res, next) => {
        try {
            const linkElements = await AdminModel.find()
            const { vk } = req.body;

            if (linkElements.length === 0) {
                const newLinkElements = new AdminModel({ vk });
                await newLinkElements.save();
                res.status(201).json({ message: "Новый администратор добавлен", admin: newLinkElements });
            } else {
                const id = linkElements[0]._id;
                const updatedAdmin = await AdminModel.findByIdAndUpdate(
                    id,
                    { vk },
                    { new: true }
                );

                if (!updatedAdmin) {
                    return res.status(404).json({ message: "Администратор не найден" });
                }
                res.redirect('/admin/sendLinks');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static sendLinksPostDiscord = async (req, res, next) => {
        try {
            const linkElements = await AdminModel.find()
            const { discord } = req.body;

            if (linkElements.length === 0) {
                const newLinkElements = new AdminModel({ discord });
                await newLinkElements.save();
                res.status(201).json({ message: "Новый администратор добавлен", admin: newLinkElements });
            } else {
                const id = linkElements[0]._id;
                const updatedAdmin = await AdminModel.findByIdAndUpdate(
                    id,
                    { discord },
                    { new: true }
                );

                if (!updatedAdmin) {
                    return res.status(404).json({ message: "Администратор не найден" });
                }
                res.redirect('/admin/sendLinks');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static sendLinksPostInstagram = async (req, res, next) => {
        try {
            const linkElements = await AdminModel.find()
            const { instagram } = req.body;

            if (linkElements.length === 0) {
                const newLinkElements = new AdminModel({ instagram });
                await newLinkElements.save();
                res.status(201).json({ message: "Новый администратор добавлен", admin: newLinkElements });
            } else {
                const id = linkElements[0]._id;
                const updatedAdmin = await AdminModel.findByIdAndUpdate(
                    id,
                    { instagram },
                    { new: true }
                );

                if (!updatedAdmin) {
                    return res.status(404).json({ message: "Администратор не найден" });
                }
                res.redirect('/admin/sendLinks');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static sendLinksPostFacebook = async (req, res, next) => {
        try {
            const linkElements = await AdminModel.find()
            const { facebook } = req.body;

            if (linkElements.length === 0) {
                const newLinkElements = new AdminModel({ facebook });
                await newLinkElements.save();
                res.status(201).json({ message: "Новый администратор добавлен", admin: newLinkElements });
            } else {
                const id = linkElements[0]._id;
                const updatedAdmin = await AdminModel.findByIdAndUpdate(
                    id,
                    { facebook },
                    { new: true }
                );

                if (!updatedAdmin) {
                    return res.status(404).json({ message: "Администратор не найден" });
                }
                res.redirect('/admin/sendLinks');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static deleteFacebookLink = async (req, res, next) => {
        try {
            const { id } = req.params;

            await AdminModel.findByIdAndUpdate(id, { $unset: { facebook: "" } })
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ message: "Пользователь не найден" });
                    }
                    res.redirect('/admin/sendLinks');
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static deleteVkLink = async (req, res, next) => {
        try {
            const { id } = req.params;

            await AdminModel.findByIdAndUpdate(id, { $unset: { vk: "" } })
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ message: "Пользователь не найден" });
                    }
                    res.redirect('/admin/sendLinks');
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static deleteDiscordLink = async (req, res, next) => {
        try {
            const { id } = req.params;

            await AdminModel.findByIdAndUpdate(id, { $unset: { discord: "" } })
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ message: "Пользователь не найден" });
                    }
                    res.redirect('/admin/sendLinks');
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static deleteInstagramLink = async (req, res, next) => {
        try {
            const { id } = req.params;

            await AdminModel.findByIdAndUpdate(id, { $unset: { instagram: "" } })
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({ message: "Пользователь не найден" });
                    }
                    res.redirect('/admin/sendLinks');
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static playerBanAdmin = async (req, res, next) => {
        try {
            const { id } = req.params;

            const playerBan = await UsersModel.findByIdAndUpdate(
                id,
                { banned: true },
                { new: true }
            );

            if (!playerBan) {
                throw new HttpErrors('Пользователь не найден.');
            }

            setTimeout(() => {
                res.redirect('/admin/allUsers');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static playerUnbanAdmin = async (req, res, next) => {
        try {
            const { id } = req.params;

            const playerBan = await UsersModel.findByIdAndUpdate(
                id,
                { banned: false, requestUnban: [] },
                { new: true }
            );

            if (!playerBan) {
                throw new HttpErrors('Пользователь не найден.');
            }

            setTimeout(() => {
                res.redirect('/admin/allUsers');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = AdminController