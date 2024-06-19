const express = require('express');
const {
    mainView, aboutUsView, rulesView, privacyPolicyView, sendReviewsMenuView, displayAllReviews, deleteUser,
    deleteReview, PersonalAreaView, changeImage, sendReview, allReviewsView, reviewErrorView, refreshTokenView,
    moreDetailsView, displayAllNews
} = require('../controller/IndexController');
const AuthRouter = require('./AuthRouter');
const AdminRouter = require('./admin');
const {changePassword} = require("../controller/AuthController");
const {verifyToken} = require('../middlewares/authorization');
const {authenticateJWT} = require('../middlewares/jwtAuth');
const {refreshToken} = require('../middlewares/updateToken')
const router = express.Router();

router.get('/', mainView);
router.get('/aboutUs', aboutUsView);
router.get('/rules', rulesView);
router.get('/privacyPolicy', privacyPolicyView);
router.get('/allReviews', displayAllReviews, allReviewsView);
router.get('/reviewError', reviewErrorView);
router.get('/refreshToken', refreshTokenView);
router.get('/sendReviews/:id', authenticateJWT, sendReviewsMenuView);
router.get('/PersonalArea', authenticateJWT, PersonalAreaView);
router.get('/moreDetails', moreDetailsView);

router.post('/sendReviews/:id', authenticateJWT, sendReview);
router.post('/upload/:id', verifyToken, changeImage);
router.post('/deleteAccount/:id', deleteUser, verifyToken, refreshToken);
router.post('/deleteReview/:id', deleteReview);
router.post('/changePassword/:id', authenticateJWT, changePassword);
router.post('/refreshToken', refreshToken);
router.post('/refreshAdmin', refreshToken);

router.use('/auth', AuthRouter);
router.use('/admin', AdminRouter);

module.exports = router;
