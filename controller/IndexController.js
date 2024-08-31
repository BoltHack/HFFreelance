const {UsersModel} = require("../models/UsersModel");
const {NewsModel} = require("../models/NewsSchema");
const {LinksModel} = require("../models/LinksModel");
const {WebsitesModel} = require("../models/WebSitesModel");
const {AdvertisingModel} = require('../models/AdvertisingModel');
const {authenticateJWT} = require('../middlewares/jwtAuth');
const bcrypt = require("bcrypt");
class IndexController {
    static mainView = async (req, res, next) => {
        try {
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned');
                    } else {
                        if (locale === 'en'){
                            return res.render('en/main', { user, locale, links });
                        }
                        else{
                            return res.render('ru/main', { user, locale, links });
                        }
                    }
                });
            } else {
                if (locale === 'en'){
                    return res.render('en/main', { locale, links });
                }
                else{
                    return res.render('ru/main', { locale, links });
                }
            }
            res.send(`
            <script>alert(4545)</script>
            `)
        } catch (e) {
            next(e);
        }
    }


    static aboutUsView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        if (locale === 'en') {
                            return res.render('en/aboutUs', {user, locale, links});
                        }
                        else{
                            return res.render('ru/aboutUs', {locale, links});
                        }
                    }
                });
            }
            else {
                if (locale === 'en') {
                    return res.render('en/aboutUs', {locale, links});
                }
                else{
                    return res.render('ru/aboutUs', {locale, links});
                }
            }
        }catch (err){
            next(err)
        }
    }
    static rulesView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        if (locale === 'en'){
                            return res.render('en/rules', {user, links});
                        }
                        else{
                            return res.render('ru/rules', {user, links});
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/rules', {links});
                }
                else{
                    return res.render('ru/rules', {links});
                }
            }
        }catch (err){
            next(err)
        }
    }
    static privacyPolicyView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        if (locale === 'en'){
                            return res.render('en/privacyPolicy', {user, links});
                        }
                        else{
                            return res.render('ru/privacyPolicy', {user, links});
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/privacyPolicy', {links});
                }
                else{
                    return res.render('ru/privacyPolicy', {links});
                }
            }
        }catch (err){
            next(err)
        }
    };

    static sendReviewsMenuView = async (req, res, next) => {
        try{
            const user = req.user;
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned')
            }

            if (locale === 'en'){
                return res.render('en/sendReviews', {user});
            }
            else{
                return res.render('ru/sendReviews', {user});
            }
        }catch(err){
            next(err)
        }
    };

    static PersonalAreaView = async (req, res, next) => {
        try {
            const user = req.user;
            const news = await NewsModel.find();
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            const review = await UsersModel.findOne({ _id: user.id});

            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned')
            }

            if (locale === 'en'){
                return res.render('en/PersonalArea', {user, links, news, review, locale});
            }
            else{
                return res.render('ru/PersonalArea', {user, links, news, review, locale});
            }
        }catch (err){
            next(err)
        }
    };

    static getTokenView = (req, res, next) => {
        let locale = req.cookies['locale'] || 'en';

        if (!req.cookies['locale']) {
            res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
        }
        if (locale === 'en'){
            return res.render('en/getToken');
        }
        else{
            return res.render('ru/getToken');
        }
    }
    static moreDetailsView = async (req, res, next) => {
        try{
            const links = await LinksModel.find();
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        if (locale === 'en'){
                            return res.render('en/moreDetails', {user, locale, links});
                        }
                        return res.render('ru/moreDetails', {user, locale, links});
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/moreDetails', {locale, links});
                }
                return res.render('ru/moreDetails', {locale, links});
            }
        }catch (err){
            next(err)
        }
    }
    static youAreBannedView = (req, res, next) => {
        try {
            const user = req.user;
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if(locale === 'en'){
                return res.render('en/youAreBanned', {user});
            }
            else{
                return res.render('ru/youAreBanned', {user});
            }
        } catch (err) {
            next(err)
        }
    }

    static readyMadeSitesView = async (req, res, next) => {
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

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
                    else {
                        if (locale === 'en'){
                            return res.render('en/readyMadeSites', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                        else {
                            return res.render('ru/readyMadeSites', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/readyMadeSites', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
                else {
                    return res.render('ru/readyMadeSites', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
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

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

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
                    else{
                        if (locale === 'en'){
                            return res.render('en/html-css-js', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                        else{
                            return res.render('ru/html-css-js', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/html-css-js', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
                else {
                    return res.render('ru/html-css-js', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
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

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

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
                    else{
                        if (locale === 'en'){
                            return res.render('en/javascript', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                        else{
                            return res.render('ru/javascript', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/javascript', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
                else {
                    return res.render('ru/javascript', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
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

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

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
                    else{
                        if (locale === 'en'){
                            return res.render('en/nodeJs', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                        else{
                            return res.render('ru/nodeJs', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/nodeJs', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
                else {
                    return res.render('ru/nodeJs', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
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

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

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
                    else{
                        if (locale === 'en'){
                            return res.render('en/reactJs', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                        else{
                            return res.render('ru/reactJs', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/reactJs', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
                else {
                    return res.render('ru/reactJs', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
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

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

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
                    else{
                        if (locale === 'en'){
                            return res.render('en/fullstack', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                        else{
                            return res.render('ru/fullstack', {
                                user,
                                links,
                                websites,
                                advertising,
                                currentPage: page,
                                totalPages: Math.ceil(totalWebsites / limit)
                            });
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/fullstack', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
                else {
                    return res.render('ru/fullstack', {
                        links,
                        websites,
                        advertising,
                        currentPage: page,
                        totalPages: Math.ceil(totalWebsites / limit)
                    });
                }
            }
        }catch (err){
            next(err)
        }
    }

    static favoritesView = async (req, res, next) => {
        try {
            const links = await LinksModel.find();
            const advertising = await AdvertisingModel.find();

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (req.cookies['token']) {
                authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        if (locale === 'en'){
                            return res.render('en/favorites', {user, links, advertising});
                        }
                        else{
                            return res.render('ru/favorites', {user, links, advertising});
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/favorites', {links, advertising});
                }
                else{
                    return res.render('ru/favorites', {links, advertising});
                }
            }
        }catch (err){
            next(err)
        }
    }

    static fileInfoView = async (req, res, next) => {
        try{
            const {id} = req.params;
            const siteInfo = await WebsitesModel.findById(id);

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

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
                    else{
                        if (locale === 'en'){
                            return res.render('en/fileInfo', {user, siteInfo, links});
                        }
                        else{
                            return res.render('ru/fileInfo', {user, siteInfo, links});
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/fileInfo', {siteInfo, links});
                }
                else{
                    return res.render('ru/fileInfo', {siteInfo, links});
                }
            }
        }catch(err){
            next(err)
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
            res.status(500).json({ error: err.message });
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

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }
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
                    else{
                        if (locale === 'en'){
                            return res.render('en/allReviews', {user, reviews});
                        }
                        else{
                            return res.render('ru/allReviews', {user, reviews});
                        }
                    }
                });
            }
            else {
                if (locale === 'en'){
                    return res.render('en/allReviews', {reviews});
                }
                else{
                    return res.render('ru/allReviews', {reviews});
                }
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
            await UsersModel.findByIdAndDelete(id);
            res.clearCookie('token');
            res.clearCookie('refreshToken');
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
            const user = req.user;

            if (user.banned[0].banType === true) {
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
            // let locale = req.cookies['locale'] || 'en';

            // if (req.cookies['token']) {
            //     const user = req.user;
            //     console.log('id', user._id)
            //
            //     locale = locale === 'en' ? 'ru' : 'en';
            //     await UsersModel.findByIdAndUpdate(
            //         user._id,
            //         { locale },
            //         { new: true }
            //     );
            // }

            let locale = req.cookies['locale'] || 'en';

            locale = locale === 'en' ? 'ru' : 'en';
            res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });

            res.json({ locale });
        } catch (err) {
            console.error('Ошибка:', err);
            res.status(500).json({ error: err.message });
        }
    };



}

module.exports = IndexController;