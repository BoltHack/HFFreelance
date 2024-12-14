const {UsersModel} = require("../models/UsersModel");
const {NewsModel} = require("../models/NewsSchema");
const {LinksModel} = require("../models/LinksModel");
const {WebsitesModel} = require("../models/WebSitesModel");
const {BanIpListModel} = require("../models/BanIpListModel");
const {authenticateJWT} = require('../middlewares/jwtAuth');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

class IndexController {
    static mainView = async (req, res, next) => {
        try {
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, async () => {
                    const user = req.user;
                    const ip = user.ip;

                    const banIp = await BanIpListModel.find({});
                    const getIp = banIp.map(doc => doc.ip);

                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    }
                    else if(getIp.includes(ip)){
                        res.redirect('/youAreBanned');
                    }
                    else {
                        return res.render(locale === 'en' ? 'en/main' : 'ru/main', { user, locale, links, acceptCookies });
                    }
                });
            } else {
                return res.render(locale === 'en' ? 'en/main' : 'ru/main', { locale, links, acceptCookies });
            }
        } catch (e) {
            next(e);
        }
    }


    static aboutUsView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, async () => {
                    const user = req.user;
                    const ip = user.ip;

                    const banIp = await BanIpListModel.find({});
                    const getIp = banIp.map(doc => doc.ip)

                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    }
                    else if(getIp.includes(ip)){
                        res.redirect('/youAreBanned');
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/aboutUs' : 'ru/aboutUs', { user, locale, links, acceptCookies });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/aboutUs' : 'ru/aboutUs', { locale, links, acceptCookies });
            }
        }catch (err){
            next(err)
        }
    }
    static rulesView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, async () => {
                    const user = req.user;
                    const ip = user.ip;

                    const banIp = await BanIpListModel.find({});
                    const getIp = banIp.map(doc => doc.ip)

                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    }
                    else if(getIp.includes(ip)){
                        res.redirect('/youAreBanned');
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/rules' : 'ru/rules', { user, locale, links, acceptCookies });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/rules' : 'ru/rules', { locale, links, acceptCookies });
            }
        }catch (err){
            next(err)
        }
    }
    static privacyPolicyView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, async () => {
                    const user = req.user;
                    const ip = user.ip;

                    const banIp = await BanIpListModel.find({});
                    const getIp = banIp.map(doc => doc.ip)

                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    }
                    else if(getIp.includes(ip)){
                        res.redirect('/youAreBanned');
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/privacyPolicy' : 'ru/privacyPolicy', { user, locale, links, acceptCookies });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/privacyPolicy' : 'ru/privacyPolicy', { locale, links, acceptCookies });
            }
        }catch (err){
            next(err)
        }
    };

    static sendReviewsMenuView = async (req, res, next) => {
        try{
            const user = req.user;
            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }
            if (!req.cookies['token'] && !req.cookies['refreshToken']){
                return res.redirect('/')
            }

            const ip = user.ip;

            const banIp = await BanIpListModel.find({});
            const getIp = banIp.map(doc => doc.ip)

            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned');
            }
            else if(getIp.includes(ip)){
                res.redirect('/youAreBanned');
            }

            return res.render(locale === 'en' ? 'en/sendReviews' : 'ru/sendReviews', { user, acceptCookies });
        }catch(err){
            next(err)
        }
    };

    static PersonalAreaView = async (req, res, next) => {
        try {
            const user = req.user;
            const news = await NewsModel.find();
            const links = await LinksModel.find();
            const getImage = await UsersModel.findById({ _id: user.id });
            const image =  getImage.image;

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }
            if (!req.cookies['token'] && !req.cookies['refreshToken']){
                return res.redirect('/')
            }

            const review = await UsersModel.findOne({ _id: user.id});

            const ip = user.ip;

            const banIp = await BanIpListModel.find({});
            const getIp = banIp.map(doc => doc.ip)

            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned');
            }
            else if(getIp.includes(ip)){
                res.redirect('/youAreBanned');
            }

            return res.render(locale === 'en' ? 'en/PersonalArea' : 'ru/PersonalArea', { user, links, news, review, locale, acceptCookies, image });
        }catch (err){
            next(err)
        }
    };

    static getTokenView = (req, res, next) => {
        try{
            let locale = req.cookies['locale'] || 'en';
            let theme = req.cookies['theme'] || 'dark';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }
            if (locale === 'en'){
                return res.render(theme === 'dark' ? 'en/getTokenDark/getToken' : 'en/getTokenLight/getToken');
                // return res.render('en/getToken');
            }
            else{
                return res.render(theme === 'dark' ? 'ru/getTokenDark/getToken' : 'ru/getTokenLight/getToken');
            }
        }catch (err){
            next(err)
        }
    }
    static moreDetailsView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, async () => {
                    const user = req.user;
                    const ip = user.ip;

                    const banIp = await BanIpListModel.find({});
                    const getIp = banIp.map(doc => doc.ip)

                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    }
                    else if(getIp.includes(ip)){
                        res.redirect('/youAreBanned');
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/moreDetails' : 'ru/moreDetails', { user, locale, links, acceptCookies });
                    }
                });
            }
            return res.render(locale === 'en' ? 'en/moreDetails' : 'ru/moreDetails', { locale, links, acceptCookies });
        }catch (err){
            next(err)
        }
    }
    static youAreBannedView = async (req, res, next) => {
        try {
            const user = req.user;
            const ip = user.ip;

            const banIp = await BanIpListModel.find({});
            const getIp = banIp.map(doc => doc.ip);
            const matchingEntry = banIp.find(doc => doc.ip === ip);

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }
            if (getIp){
                return res.render(locale === 'en' ? 'en/youAreBanned' : 'ru/youAreBanned', { user, getIp, matchingEntry });
            }
            else{
                return res.render(locale === 'en' ? 'en/youAreBanned' : 'ru/youAreBanned', { user });
            }
        } catch (err) {
            next(err)
        }
    }

    static fileInfoView = async (req, res, next) => {
        try{
            const {id} = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                const errorMsg = req.cookies['locale'] === 'en' ? 'Page not found.' : 'Страница не найдена.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            const siteInfo = await WebsitesModel.findById(id);

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (!siteInfo){
                const errorMsg = locale === 'en' ? 'page not found.' : 'Страница не найдена.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            const links = await LinksModel.find();

            if (req.cookies['token']) {
                await authenticateJWT(req, res, async () => {
                    const user = req.user;
                    const ip = user.ip;

                    const banIp = await BanIpListModel.find({});
                    const getIp = banIp.map(doc => doc.ip)

                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    }
                    else if(getIp.includes(ip)){
                        res.redirect('/youAreBanned');
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/fileInfo' : 'ru/fileInfo', { user, locale, links, siteInfo, acceptCookies });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/fileInfo' : 'ru/fileInfo', {locale, links, siteInfo, acceptCookies});
            }
        }catch(err){
            next(err)
        }
    }
    static profileView = async (req, res, next) => {
        try {
            const {id} = req.params;
            const profile = await UsersModel.findById(id);

            const favoriteIds = profile.favorites.map(favorite => favorite.favId);
            const favorites = await WebsitesModel.find({ _id: { $in: favoriteIds } });

            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, async () => {
                    const user = req.user;
                    const ip = user.ip;

                    const banIp = await BanIpListModel.find({});
                    const getIp = banIp.map(doc => doc.ip)

                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    }
                    else if(getIp.includes(ip)){
                        res.redirect('/youAreBanned');
                    }
                    else {
                        return res.render(locale === 'en' ? 'en/profile' : 'ru/profile', { user, profile, favorites, locale, links, acceptCookies });
                    }
                });
            } else {
                return res.render(locale === 'en' ? 'en/profile' : 'ru/profile', { profile, favorites, locale, links, acceptCookies });
            }
        } catch (e) {
            next(e);
        }
    }

    static changeImage = async (req, res, next)=>{
        try{
            const {id} = req.params;

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if(!req.files || !req.files.image){
                const errorMsg = locale === 'en' ? 'Failed to load changes.' : 'Не удалось загрузить изменения.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
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

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (user.reviews && user.reviews.length > 0) {
                const errorMsg = locale === 'en' ? 'You have already posted your review.' : 'Вы уже выложили свой отзыв.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            user.reviews.push({ review: message, grade });
            await user.save();

            res.redirect('/allReviews');
        } catch (err) {
            console.error('Ошибка:', err);
            return res.redirect(`/error?message=${encodeURIComponent(err.message)}`);
            // res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static requestUnban = async (req, res, next) => {
        try {
            const { email, message } = req.body;
            const { id } = req.user;

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            const user = await UsersModel.findById(id);

            if (user.requestUnban && user.requestUnban.length > 0) {
                const errorMsg = locale === 'en' ? 'You have already sent a request for unban. Please wait for a moderation decision.' : 'Вы уже отправили запрос за разбан. Пожалуйста, ждите решения модерации.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
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
            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }
            const reviews = users.flatMap(user => user.reviews.map(review => ({
                id: user._id,
                name: user.name,
                image: user.image,
                review: review.review,
                grade: review.grade,
                date: review.date
            })));

            if (req.cookies['token']) {
                await authenticateJWT(req, res, async () => {
                    const user = req.user;
                    const ip = user.ip;

                    const banIp = await BanIpListModel.find({});
                    const getIp = banIp.map(doc => doc.ip)

                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    }
                    else if(getIp.includes(ip)){
                        res.redirect('/youAreBanned');
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/allReviews' : 'ru/allReviews', { user, reviews, acceptCookies });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/allReviews' : 'ru/allReviews', {reviews, acceptCookies});
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

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (!user) {
                const errorMsg = locale === 'en' ? 'User not found.' : 'Пользователь не найден.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            const pass = await bcrypt.compare(password, user.password);

            if (!pass){
                const errorMsg = locale === 'en' ? 'Invalid password.' : 'Неверный пароль.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }
            if (user.banned[0].banType === true || user.banned[0].banIp === true) {
                res.redirect('/youAreBanned');
            } else {
                await UsersModel.findByIdAndDelete(id);
                res.clearCookie('token');
                res.clearCookie('refreshToken');
                res.clearCookie('session');
                console.log('delete', id)
                res.send(
                    `<script>
                    function localstorageClear(){
                        localStorage.removeItem('id');
                        localStorage.removeItem('profileImage');
                        localStorage.removeItem('accessTokenEndTime');
                        localStorage.removeItem('name');
                        localStorage.removeItem('refreshTokenEndTime');
                        localStorage.removeItem('token');
                        localStorage.removeItem('ref');
                        window.location.href = '/auth/register'
                    }
                    localstorageClear()
                </script>`
                )
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }



    static deleteReview = async (req, res, next) => {
        try{
            const { id } = req.params;

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            await UsersModel.findByIdAndUpdate(
                id,
                { reviews: [] },
                { new: true }
            )
                .then((user) => {
                    if (!user) {
                        const errorMsg = locale === 'en' ? 'User not found.' : 'Пользователь не найден.';
                        return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
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
            const {id} = req.params;
            const saveSite = await WebsitesModel.findById(id);
            const user = req.user;

            if (user.banned[0].banType === true || user.banned[0].banIp === true) {
                res.redirect('/youAreBanned')
            }

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            else {

                const website = await WebsitesModel.findById(req.params.id);

                if (!website) {
                    const errorMsg = locale === 'en' ? 'File not found.' : 'Файл не найден.';
                    return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
                }

                const saveCheck = req.cookies['saveCheck'] || [];

                if (!saveCheck.includes(id)) {
                    await WebsitesModel.findByIdAndUpdate(id, {
                        $set: { saves: (saveSite.saves || 0) + 1 }
                    });

                    saveCheck.push(id);
                    res.cookie('saveCheck', saveCheck, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });
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


    static changeLocal = async (req, res) => {
        try {
            const {locale} = req.params;

            res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });

            res.json({ locale });
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
        }
    };

    static changeLocalAuth = async (req, res) => {
        try {
            const {id} = req.params;
            const {locale} = req.params;
            await UsersModel.findByIdAndUpdate(
                id,
                {locale: locale},
                {new: true}
            )

            res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });

            res.json({ locale });
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
        }
    };

    static changeTheme = async (req, res) => {
        try {
            const {theme} = req.params;

            res.cookie('theme', theme, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });

            res.json({ theme });
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
        }
    };

    static sendCommentsPost = async (req, res, next) => {
        try {
            const { message } = req.body;
            const { id } = req.params;

            const user = req.user;
            const image = await UsersModel.findById(user.id)
            console.log('image', image)

            const siteComment = await WebsitesModel.findById(id);
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            await WebsitesModel.findByIdAndUpdate(id, {
                $set: { commentsNumber: (siteComment.commentsNumber || 0) + 1 }
            });

            siteComment.comments.push({ message: message, author: user.name, avatar: image.image });
            await siteComment.save();

            res.redirect(`/fileInfo/${id}`);
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static likeSite = async (req, res, next) => {
        try{
            const {id} = req.params;
            const user = req.user;
            const userId = await UsersModel.findById(user.id);

            const likeSite = await WebsitesModel.findById(id);

            await WebsitesModel.findByIdAndUpdate(id, {
                $set: { likes: (likeSite.likes || 0) + 1 }
            });

            if (!userId.favorites.some(fav => fav.favId.toString() === id.toString())) {
                userId.favorites.push({favId: id});
                await userId.save();
            }

            res.status(200).json({message: "Элемент успешно добавлен!"})
        }catch(err){
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static dislikeSite = async (req, res, next) => {
        try{
            const {id} = req.params;
            const user = req.user;
            const userId = await UsersModel.findById(user.id);

            const dislikeSite = await WebsitesModel.findById(id);

            await WebsitesModel.findByIdAndUpdate(id, {
                $set: { likes: (dislikeSite.likes || 0) - 1 }
            });

            if (userId.favorites.some(favorite => favorite.favId.toString() === id.toString())) {
                userId.favorites = userId.favorites.filter(favorite => favorite.favId.toString() !== id.toString());
                await userId.save();
            }

            res.status(200).json({message: "Элемент успешно удалён!"})
        }catch(err){
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
            next(err);
        }
    }

    static manageCookieFiles = async (req, res) => {
        try {
            const {type} = req.params;

            res.cookie('acceptCookies', type, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });

            res.json({ type });
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
        }
    };
}

module.exports = IndexController;