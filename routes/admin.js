const express = require('express');
const {
    sendNewsAdmin, allUsersAdmin, deleteUserAdmin, changePasswordAdmin, sendNewsPost, allNewsAdmin, deleteNewsAdmin, deleteReviewAdmin
} = require('../controller/AdminController');
const {authenticateJWT} = require('../middlewares/jwtAuth');
const {verifyPermissions} = require('../middlewares/permissionsAuthorization')
const router = express.Router();

router.get('/sendNews', verifyPermissions('Admin'), authenticateJWT, sendNewsAdmin);
router.get('/allUsers', verifyPermissions('Admin'), authenticateJWT, allUsersAdmin);
router.get('/allNews', verifyPermissions('Admin'), authenticateJWT, allNewsAdmin)

router.post('/deleteUserAdmin/:id', verifyPermissions('Admin'), deleteUserAdmin);
router.post('/deleteNewsAdmin/:id', verifyPermissions('Admin'), deleteNewsAdmin);
router.post('/changePasswordAdmin/:id', verifyPermissions('Admin'), changePasswordAdmin);
router.post('/deleteReviewsAdmin/:id', verifyPermissions('Admin'), deleteReviewAdmin);
router.post('/sendNews', verifyPermissions('Admin'), sendNewsPost);

module.exports = router;
