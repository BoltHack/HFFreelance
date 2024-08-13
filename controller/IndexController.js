const {UsersModel} = require("../models/UsersModel");
const {NewsModel} = require("../models/NewsSchema");
const {LinksModel} = require("../models/LinksModel");
const {WebsitesModel} = require("../models/WebSitesModel");
const {AdvertisingModel} = require('../models/AdvertisingModel');
const {authenticateJWT} = require('../middlewares/jwtAuth');
const bcrypt = require("bcrypt");
const HttpErrors = require("http-errors");
const http = require("http");
// const httpErrors = require('http-errors')
class IndexController {
    static mainView = async (req, res, next) => {
        try {
            const links = await LinksModel.find();

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('main', {user, links});
                });
            }
            else {
                return res.render('main', {links});
            }
        } catch (e) {
            next(e);
        }
    }

    static aboutUsView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('aboutUs', {user, links});
                });
            }
            else {
                return res.render('aboutUs', {links});
            }
        }catch (err){
            next(err)
        }
    }
    static rulesView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('rules', {user, links});
                });
            }
            else {
                return res.render('rules', {links});
            }
        }catch (err){
            next(err)
        }
    }
    static privacyPolicyView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('privacyPolicy', {user, links});
                });
            }
            else {
                return res.render('privacyPolicy', {links});
            }
        }catch (err){
            next(err)
        }
    };

    static sendReviewsMenuView = async (req, res, next) => {
        try{
            const user = req.user;

            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned')
            }

            return res.render('sendReviews', {user});
        }catch(err){
            next(err)
        }
    };

    static PersonalAreaView = async (req, res, next) => {
        try {
            const user = req.user;
            const news = await NewsModel.find();
            const links = await LinksModel.find();

            const review = await UsersModel.findOne({ _id: user.id});

            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned')
            }

            return res.render('PersonalArea', {user, links, news, review});
        }catch (err){
            next(err)
        }
    };

    static getTokenView = (req, res, next) => {
        return res.render('getToken');
    }
    static moreDetailsView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('moreDetails', {user, links});
                });
            }
            else {
                return res.render('moreDetails', {links});
            }
        }catch (err){
            next(err)
        }
    }
    static youAreBannedView = (req, res, next) => {
        try {
            const user = req.user;
            return res.render('youAreBanned', {user});
        } catch (err) {
            next(err)
        }
    }

    static readyMadeSitesView = async (req, res, next) => {
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalWebsites = await WebsitesModel.countDocuments();
            const links = await LinksModel.find();
            const websites = await WebsitesModel.find().skip(skip).limit(limit)
            const advertising = await AdvertisingModel.find();

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('readyMadeSites', {
                        user,
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                });
            }
            else {
                return res.render('readyMadeSites', {
                    links,
                    websites,
                    advertising,
                    currentPage: page,
                    totalPages: Math.ceil(totalWebsites / limit)
                });
            }
        }catch(err){
            next(err)
        }
    }

    static htmlSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalWebsites = await WebsitesModel.countDocuments({
                $or: [
                    { siteType: 'html-css' },
                    { siteType: 'html-css-javascript' }
                ]
            });

            const links = await LinksModel.find();
            const advertising = await AdvertisingModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        $or: [
                            { siteType: 'html-css' },
                            { siteType: 'html-css-javascript' }
                        ]
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('html-css-js', {
                        user,
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                });
            }
            else {
                return res.render('html-css-js', {
                    links,
                    websites,
                    advertising,
                    currentPage: page,
                    totalPages: Math.ceil(totalWebsites / limit)
                });
            }
        } catch (err) {
            next(err);
        }
    }


    static javascriptSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalWebsites = await WebsitesModel.countDocuments({
                siteType: 'javascript'
            });

            const links = await LinksModel.find();
            const advertising = await AdvertisingModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'javascript'
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit,
                }
            ])

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('javascript', {
                        user,
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                });
            }
            else {
                return res.render('javascript', {
                    links,
                    websites,
                    advertising,
                    currentPage: page,
                    totalPages: Math.ceil(totalWebsites / limit)
                });
            }
        } catch (err) {
            next(err);
        }
    }

    static nodeJsSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalWebsites = await WebsitesModel.countDocuments({
                siteType: 'nodeJs'
            });

            const links = await LinksModel.find();
            const advertising = await AdvertisingModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'nodeJs'
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit,
                }
            ])

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('nodeJs', {
                        user,
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                });
            }
            else {
                return res.render('nodeJs', {
                    links,
                    websites,
                    advertising,
                    currentPage: page,
                    totalPages: Math.ceil(totalWebsites / limit)
                });
            }
        }catch (err){
            next(err)
        }
    }

    static reactJsSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalWebsites = await WebsitesModel.countDocuments({
                siteType: 'reactJs'
            });

            const links = await LinksModel.find();
            const advertising = await AdvertisingModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'reactJs'
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit,
                }
            ])

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('reactJs', {
                        user,
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                });
            }
            else {
                return res.render('reactJs', {
                    links,
                    websites,
                    advertising,
                    currentPage: page,
                    totalPages: Math.ceil(totalWebsites / limit)
                });
            }
        }catch (err){
            next(err)
        }
    }

    static fullstackSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalWebsites = await WebsitesModel.countDocuments({
                siteType: 'fullstack'
            });

            const links = await LinksModel.find();
            const advertising = await AdvertisingModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'fullstack'
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit,
                }
            ])

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('fullstack', {
                        user,
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                });
            }
            else {
                return res.render('fullstack', {
                    links,
                    websites,
                    advertising,
                    currentPage: page,
                    totalPages: Math.ceil(totalWebsites / limit)
                });
            }
        }catch (err){
            next(err)
        }
    }

    static favoritesView = async (req, res, next) => {
        try {
            const links = await LinksModel.find();
            const advertising = await AdvertisingModel.find();

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('favorites', {user, links, advertising});
                });
            }
            else {
                return res.render('favorites', {links, advertising});
            }
        }catch (err){
            next(err)
        }
    }

    static fileInfoView = async (req, res, next) => {
        try{
            const {id} = req.params;
            const siteInfo = await WebsitesModel.findById(id);

            if (siteInfo === undefined){
                res.status(404).json({error: '404'})
            }

            const links = await LinksModel.find();

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('fileInfo', {user, siteInfo, links});
                });
            }
            else {
                return res.render('fileInfo', {siteInfo, links});
            }
        }catch(err){
            next(err)
        }
    }

    static userInfo = async(req, res, next) => {
        try {
            const { id } = req.params;
            const userInfo = await UsersModel.findById(id);
            res.render('PersonalArea', { userInfo });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static changeImage = async (req, res, next)=>{
        try{
            const {id} = req.params;

            if(!req.files || !req.files.image){
                return res.status(400).json( 'Ошибка. Не удалось загрузить изменения.' );
            }

            const imageFile = req.files.image;
            const imageBuffer = imageFile.data;
            const base64Image = imageBuffer.toString('base64');

            await UsersModel.findByIdAndUpdate(id, { $set: { image: base64Image } }
            );

            return res.status(200).json('Изменения успешно загружены' );
        } catch (e){
            console.log(e);
            next(e);
        }
    }

    static sendReview = async (req, res, next) => {
        try {
            const { message } = req.body;
            const { grade } = req.body;
            const { id } = req.params;

            const user = await UsersModel.findById(id);

            if (user.reviews && user.reviews.length > 0) {
                return res.render('error', {message: "Неверный адрес или пароль."});
            }

            user.reviews.push({ review: message, grade });
            await user.save();

            res.redirect('/allReviews');
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static requestUnban = async (req, res, next) => {
        try {
            const { email, message } = req.body;
            const { id } = req.user;

            const user = await UsersModel.findById(id);

            if (user.requestUnban && user.requestUnban.length > 0) {
                return res.redirect('/requestError')
            }

            user.requestUnban.push({ requestUnban: email, message });
            await user.save();

            res.redirect('/youAreBanned');
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static displayAllReviews = async (req, res, next) => {
        try {
            const users = await UsersModel.find();
            const reviews = users.flatMap(user => user.reviews.map(review => ({
                name: user.name,
                image: user.image,
                review: review.review,
                grade: review.grade,
                date: review.date
            })));

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    return res.render('allReviews', {user, reviews});
                });
            }
            else {
                return res.render('allReviews', {reviews});
            }
        } catch (err) {
            next(err);
        }
    }

    static deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const {password} = req.body;
            const user = await UsersModel.findById(id);

            if (!user) {
                return res.render('error', {message: "Пользователь не найден."});
            }

            const pass = await bcrypt.compare(password, user.password);

            if (!pass) {
                return res.render('error', {message: "Неверный пароль."});
            }
            await UsersModel.findByIdAndDelete(id);
            res.clearCookie('token');
            res.clearCookie('refreshToken');
            console.log('delete', id)
            res.send(
                `<script>
                    function localstorageClear(){
                        localStorage.clear();
                        window.location.href = '/auth/register'
                    }
                    localstorageClear()
                </script>`
            )
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }



    static deleteReview = async (req, res, next) => {
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
                    res.redirect('/PersonalArea')
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        }catch (e){
            console.log(e)
            next(e)
        }
    }

    static downloadFile = async (req, res) => {
        try {
            const user = req.user;
            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned')
            }
            else {

                const website = await WebsitesModel.findById(req.params.id);

                if (!website) {
                    return res.status(404).json({error: 'Файл не найден.'});
                }

                const fileBuffer = Buffer.from(website.fileUpload, 'base64');

                const sanitizedFileName = `${website.title}.zip`;
                res.set({
                    'Content-Type': 'application/zip',
                    'Content-Disposition': `attachment; filename="${encodeURIComponent(sanitizedFileName)}"`,
                });

                res.send(fileBuffer);
            }
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
        }
    };

}

module.exports = IndexController;