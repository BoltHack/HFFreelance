const {UsersModel} = require("../models/UsersModel");
const {NewsModel} = require("../models/NewsSchema");
const {AdminModel} = require("../models/AdminModel");
const {WebsitesModel} = require("../models/WebSitesModel");
const {AdvertisingModel} = require('../models/AdvertisingModel');
class IndexController {
    static mainView = async (req, res, next) => {
        try{
            const links = await AdminModel.find();
            return res.render('main', {links});
        }catch(e) {
            next(e)
        }
    }
    static aboutUsView = async (req, res, next) => {
        try{
            const links = await AdminModel.find();
            return res.render('aboutUs', {links});
        }catch (err){
            next(err)
        }
    }
    static rulesView = async (req, res, next) => {
        try{
            const links = await AdminModel.find();
            return res.render('rules', {links});
        }catch (err){
            next(err)
        }
    }
    static privacyPolicyView = async (req, res, next) => {
        try{
            const links = await AdminModel.find();
            return res.render('privacyPolicy', {links});
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

            const review = await UsersModel.findOne({ _id: user.id});

            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned')
            }

            return res.render('PersonalArea', {user, news, review});
        }catch (err){
            next(err)
        }
    };

    static allReviewsView = async (req, res, next) => {
        try{
            const {id} = req.params;
            const userInfo = await UsersModel.findById(id);
            return res.render('allReviews', {userInfo});
        }catch (err){
            next(err)
        }
    }

    static getTokenView = (req, res, next) => {
        return res.render('getToken');
    }
    static moreDetailsView = (req, res, next) => {
        try{
            return res.render('moreDetails');
        }catch (err){
            next(err)
        }
    }
    static youAreBannedView = (req, res, next) => {
        try {
            const user = req.user;
            return res.render('youAreBanned', {user});
        }catch(err){
            next(err)
        }
    }
    static requestErrorView = (req, res, next) => {
        try {
            return res.render('requestError');
        }catch(err){
            next(err)
        }
    }
    static reviewErrorView = (req, res, next) => {
        try {
            return res.render('reviewError');
        }catch(err){
            next(err)
        }
    }

    static readyMadeSitesView = async (req, res, next) => {
        try{
            const links = await AdminModel.find();
            const websites = await WebsitesModel.find()
            const advertising = await AdvertisingModel.find();

            return res.render('readyMadeSites', {links, websites, advertising});
        }catch(err){
            next(err)
        }
    }

    static htmlSitesView = async (req, res, next) => {
        try{
            const links = await AdminModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        $or: [
                            { siteType: 'html-css' },
                            { siteType: 'html-css-javascript' }
                        ]
                    },
                }
            ])

            return res.render('html-css-js', {links, websites});
        }catch(err){
            next(err)
        }
    }

    static javascriptSitesView = async (req, res, next) => {
        try{
            const links = await AdminModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'javascript'
                    }
                }
            ])

            return res.render('javascript', {links, websites});
        }catch(err){
            next(err)
        }
    }

    static nodeJsSitesView = async (req, res, next) => {
        try {
            const links = await AdminModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'nodeJs'
                    }
                }
            ])

            return res.render('nodeJs', {links, websites});
        }catch (err){
            next(err)
        }
    }

    static reactJsSitesView = async (req, res, next) => {
        try {
            const links = await AdminModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'reactJs'
                    }
                }
            ])

            return res.render('reactJs', {links, websites});
        }catch (err){
            next(err)
        }
    }

    static fullstackSitesView = async (req, res, next) => {
        try {
            const links = await AdminModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'fullstack'
                    }
                }
            ])

            return res.render('fullstack', {links, websites});
        }catch (err){
            next(err)
        }
    }

    static fileInfoView = async (req, res, next) => {
        try{
            const {id} = req.params;
            const siteInfo = await WebsitesModel.findById(id);

            const links = await AdminModel.find();

            return res.render('fileInfo', {siteInfo, links});
        }catch(err){
            next(err)
        }
    }

    static homeInfo = async (req, res, next) => {
        try {
            const user = await UsersModel.findOne({_id: req.user.id});
            const userInfo = {
                id: req.user.id,
                name: user.name,
                email: user.email,
                image: user.image,
            }
            return res.json({userInfo})
        } catch (e) {
            console.log(e);
            next(e)
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
                return res.redirect('/reviewError')
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

            res.render('allReviews', { reviews });
        } catch (err) {
            next(err);
        }
    }

    static deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const permUser = req.user;

            const user = await UsersModel.findByIdAndDelete(id);

            if (permUser.banned[0].banType === true) {
                res.status(404).json({ message: "Пользователь заблокирован" });
                return res.redirect('/youAreBanned')
            }
            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }

            res.clearCookie('token', { path: '/' });
            res.clearCookie('refreshToken', { path: '/' });

            return res.status(200).json({ message: "Пользователь успешно удален" });
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