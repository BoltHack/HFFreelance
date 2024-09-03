const {UsersModel} = require("../models/UsersModel");
const {NewsModel} = require("../models/NewsSchema");
const {LinksModel} = require("../models/LinksModel");
const {WebsitesModel} = require("../models/WebSitesModel");
const {AdvertisingModel} = require("../models/AdvertisingModel");
const bcrypt = require("bcrypt");
const HttpErrors = require("http-errors");

class AdminController {
    static sendNewsAdmin = (req, res, next) => {
        try{
            const user = req.user;
            return res.render('admin/sendNews', {user});
        }catch(err){
            next(err)
        }
    }

    static allUsersAdmin = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalUsers = await UsersModel.countDocuments({role: 'User'})
            const users = await UsersModel.find({role: 'User'})
                .skip(skip)
                .limit(limit);

            res.render('admin/allUsers', {
                users,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit)
            });
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
        try{

        }catch(err){
            next(err)
        }
        const links = await LinksModel.find();
        return res.render('admin/sendLinks', {links});
    }
    static banMenuAdmin = async (req, res, next) => {
        try{
            const {id} = req.params;
            const user = await UsersModel.findById(id);
            return res.render('admin/banMenu', {user});
        }catch(err){
            next(err)
        }
    }
    static createAWebSiteAdmin = async (req, res, next) => {
        try{
            const {id} = req.user;
            const user = await UsersModel.findById(id);
            return res.render('admin/createAwebSite', {user});
        }catch(err){
            next(err)
        }
    }
    static createAdvertisingAdmin = async (req, res, next) => {
        try{
            return res.render('admin/createAdvertising',);
        }catch(err){
            next(err)
        }
    }
    static allWebsitesAdmin = async (req, res, next) => {
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalWebsites = await WebsitesModel.countDocuments();
            const links = await LinksModel.find();
            const websites = await WebsitesModel.find().skip(skip).limit(limit);

            res.render('admin/allWebsites', {
                links,
                websites,
                currentPage: page,
                totalPages: Math.ceil(totalWebsites / limit)
            });


            // const links = await LinksModel.find();
            // const websites = await WebsitesModel.find()
            // return res.render('admin/allWebsites', {links, websites});
        }catch(err){
            next(err)
        }
    }

    static allAdvertisingAdmin = async (req, res, next) => {
        try{
            const advertising = await AdvertisingModel.find()
            return res.render('admin/allAdvertising', {advertising});
        }catch(err){
            next(err)
        }
    }

    static requestUnbanAdmin = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalUsersResult  = await UsersModel.aggregate([
                { $match: { role: 'User' } },
                    {
                        $match: {
                            'requestUnban': {
                                $elemMatch: {
                                    message: {$ne: ''}
                                }
                            }
                        }
                    },
                { $count: 'totalUsers' }
            ])
            const totalUsers = totalUsersResult.length > 0 ? totalUsersResult[0].totalUsers : 0;

            const users = await UsersModel.find({
                role: 'User',
                'requestUnban': {
                    $elemMatch: {
                        message: {$ne: ''}
                    }
                }
            })
                .skip(skip)
                .limit(limit);

            res.render('admin/requestUnban', {
                users,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit)
            });
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({error: err.message});
            next(err);
        }
    }

    static banListAdmin = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalUsersResult  = await UsersModel.aggregate([
                { $match: { role: 'User' } },
                {
                    $match: {
                        'banned': {
                            $elemMatch: {
                                banType: true
                            }
                        }
                    }
                },
                { $count: 'totalUsers' }
            ])
            const totalUsers = totalUsersResult.length > 0 ? totalUsersResult[0].totalUsers : 0;

            const users = await UsersModel.find({
                role: 'User',
                'banned': {
                    $elemMatch: {
                        banType: true
                    }
                }
            })
                .skip(skip)
                .limit(limit);

            res.render('admin/banList', {
                users,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit)
            });
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({error: err.message});
            next(err);
        }
    }


    static deleteUserAdmin = async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await UsersModel.findById(id);
            if (!user) {
                res.status(404).json({error: 'Пользователь не найден.'});
            }
            await UsersModel.findByIdAndDelete(id);
            setTimeout(() => {
                res.redirect('/admin/allUsers');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (err) {
            next(err)
        }
    }

    static deleteNewsAdmin = async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await NewsModel.findById(id);
            if (!user) {
                res.status(404).json({error: 'id не найден.'});
            }
            await NewsModel.findByIdAndDelete(id);
            setTimeout(() => {
                res.redirect('/admin/allNews');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (err) {
            next(err)
        }
    }


    static sendNewsPost = async (req, res, next) => {
        try {
            const {title, content} = req.body;

            if (!req.files || !req.files.image) {
                return res.status(400).json({ error: 'Ошибка. Не удалось загрузить файл.' });
            }

            const image = req.files.image;
            const base64Image = image.data.toString('base64');

            const newNews = new NewsModel({
                image: base64Image,
                title: title,
                content: content
            });

            await newNews.save();

            res.redirect('/admin/sendNews');
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({error: err.message});
        }
    }

    static changePasswordAdmin = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {password, confirmPassword} = req.body;

            if (!password || !confirmPassword) {
                throw new HttpErrors('Неверный адрес или пароль.');
            }

            if (password !== confirmPassword) {
                throw new HttpErrors('Пароли не совпадают.');
            }

            if (password.length < 6 || password.length > 50) {
                throw new HttpErrors('Пароль должен содержать минимум 6 символов и максимум 50 символов.');
            }
            if (confirmPassword.length < 6 || confirmPassword.length > 50) {
                throw new HttpErrors('Пароль должен содержать минимум 6 символов и максимум 50 символов.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const updatePassword = await UsersModel.findByIdAndUpdate(
                id,
                {password: hashedPassword},
                {new: true}
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
        try {
            const {id} = req.params;

            await UsersModel.findByIdAndUpdate(
                id,
                {reviews: []},
                {new: true}
            )
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({message: "Пользователь не найден"});
                    }
                    res.redirect('/admin/allUsers')
                })
                .catch((error) => {
                    res.status(500).json({error: error.message});
                });
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    static sendLinksPostVk = async (req, res, next) => {
        try {
            const linkElements = await LinksModel.find()
            const {vk} = req.body;

            if (linkElements.length === 0) {
                const newLinkElements = new LinksModel({vk});
                await newLinkElements.save();
                res.status(201).json({message: "Новый администратор добавлен", admin: newLinkElements});
            } else {
                const id = linkElements[0]._id;
                const updatedAdmin = await LinksModel.findByIdAndUpdate(
                    id,
                    {vk},
                    {new: true}
                );

                if (!updatedAdmin) {
                    return res.status(404).json({message: "Администратор не найден"});
                }
                res.redirect('/admin/sendLinks');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({error: err.message});
            next(err);
        }
    }

    static sendLinksPostDiscord = async (req, res, next) => {
        try {
            const linkElements = await LinksModel.find()
            const {discord} = req.body;

            if (linkElements.length === 0) {
                const newLinkElements = new LinksModel({discord});
                await newLinkElements.save();
                res.status(201).json({message: "Новый администратор добавлен", admin: newLinkElements});
            } else {
                const id = linkElements[0]._id;
                const updatedAdmin = await LinksModel.findByIdAndUpdate(
                    id,
                    {discord},
                    {new: true}
                );

                if (!updatedAdmin) {
                    return res.status(404).json({message: "Администратор не найден"});
                }
                res.redirect('/admin/sendLinks');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({error: err.message});
            next(err);
        }
    }

    static sendLinksPostInstagram = async (req, res, next) => {
        try {
            const linkElements = await LinksModel.find()
            const {instagram} = req.body;

            if (linkElements.length === 0) {
                const newLinkElements = new LinksModel({instagram});
                await newLinkElements.save();
                res.status(201).json({message: "Новый администратор добавлен", admin: newLinkElements});
            } else {
                const id = linkElements[0]._id;
                const updatedAdmin = await LinksModel.findByIdAndUpdate(
                    id,
                    {instagram},
                    {new: true}
                );

                if (!updatedAdmin) {
                    return res.status(404).json({message: "Администратор не найден"});
                }
                res.redirect('/admin/sendLinks');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({error: err.message});
            next(err);
        }
    }

    static sendLinksPostFacebook = async (req, res, next) => {
        try {
            const linkElements = await LinksModel.find()
            const {facebook} = req.body;

            if (linkElements.length === 0) {
                const newLinkElements = new LinksModel({facebook});
                await newLinkElements.save();
                res.status(201).json({message: "Новый администратор добавлен", admin: newLinkElements});
            } else {
                const id = linkElements[0]._id;
                const updatedAdmin = await LinksModel.findByIdAndUpdate(
                    id,
                    {facebook},
                    {new: true}
                );

                if (!updatedAdmin) {
                    return res.status(404).json({message: "Администратор не найден"});
                }
                res.redirect('/admin/sendLinks');
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({error: err.message});
            next(err);
        }
    }

    static deleteFacebookLink = async (req, res, next) => {
        try {
            const {id} = req.params;

            await LinksModel.findByIdAndUpdate(id, {$unset: {facebook: ""}})
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({message: "Пользователь не найден"});
                    }
                    res.redirect('/admin/sendLinks');
                })
                .catch((error) => {
                    res.status(500).json({error: error.message});
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static deleteVkLink = async (req, res, next) => {
        try {
            const {id} = req.params;

            await LinksModel.findByIdAndUpdate(id, {$unset: {vk: ""}})
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({message: "Пользователь не найден"});
                    }
                    res.redirect('/admin/sendLinks');
                })
                .catch((error) => {
                    res.status(500).json({error: error.message});
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static deleteDiscordLink = async (req, res, next) => {
        try {
            const {id} = req.params;

            await LinksModel.findByIdAndUpdate(id, {$unset: {discord: ""}})
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({message: "Пользователь не найден"});
                    }
                    res.redirect('/admin/sendLinks');
                })
                .catch((error) => {
                    res.status(500).json({error: error.message});
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static deleteInstagramLink = async (req, res, next) => {
        try {
            const {id} = req.params;

            await LinksModel.findByIdAndUpdate(id, {$unset: {instagram: ""}})
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({message: "Пользователь не найден"});
                    }
                    res.redirect('/admin/sendLinks');
                })
                .catch((error) => {
                    res.status(500).json({error: error.message});
                });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static playerBanAdmin = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {reason, description} = req.body;
            const user = req.user;

            const playerBan = await UsersModel.findByIdAndUpdate(
                id,
                {banned: [{banType: true, reason, description, author: user.name}], reviews: []},
                {new: true}
            );

            if (!playerBan) {
                throw new HttpErrors('Пользователь не найден.');
            }

            setTimeout(() => {
                res.redirect('/admin/allUsers');
                console.log(id, ' успешно забанен!')
            }, 500);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static playerUnbanAdmin = async (req, res, next) => {
        try {
            const {id} = req.params;

            const playerBan = await UsersModel.findByIdAndUpdate(
                id,
                {banned: [{banType: false, reason: '', description: ''}], requestUnban: []},
                {new: true}
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

    static createAwebsite = async (req, res, next) => {
        try {
            const { title, description, siteType } = req.body;

            if (!req.files || !req.files.fileImg || !req.files.fileUpload) {
                return res.status(400).json({ error: 'Ошибка. Не удалось загрузить файлы.' });
            }

            const imageFile = req.files.fileImg;
            const base64Image = imageFile.data.toString('base64');

            const uploadedFile = req.files.fileUpload;
            const base64File = uploadedFile.data.toString('base64');

            const newWebsite = new WebsitesModel({
                title,
                description,
                fileImg: base64Image,
                fileUpload: base64File,
                siteType
            });

            await newWebsite.save();
            res.redirect('/admin/createAwebSite');
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
        }
    };

    static deleteFileAdmin = async (req, res, next) => {
        try {
            const {id} = req.params;
            const site = await WebsitesModel.findById(id);
            if (!site) {
                res.status(404).json({error: 'id не найден.'});
            }
            await WebsitesModel.findByIdAndDelete(id);
            setTimeout(() => {
                res.redirect('/admin/allWebsites');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (err) {
            next(err)
        }
    }

    static createAdvertisingPost = async (req, res, next) => {
        try {
            const { title, link, expiresInMinutes, locale } = req.body;

            if (!req.files || !req.files.image) {
                return res.status(400).json({ error: 'Ошибка. Не удалось загрузить файлы.' });
            }

            const image = req.files.image;
            const base64Image = image.data.toString('base64');

            const newAdvertising = new AdvertisingModel({
                title,
                image: base64Image,
                link,
                expiresInMinutes,
                locale
            });

            await newAdvertising.save();
            res.redirect('/admin/createAdvertising');
        } catch (err) {
            next(err);
        }
    }

    static deleteAdvertising = async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await AdvertisingModel.findById(id);
            if (!user) {
                res.status(404).json({error: 'id не найден.'});
            }
            await AdvertisingModel.findByIdAndDelete(id);
            setTimeout(() => {
                res.redirect('/admin/allAdvertising');
                console.log(id, ' успешно удалён!')
            }, 500);
        } catch (err) {
            next(err)
        }
    }

}

module.exports = AdminController