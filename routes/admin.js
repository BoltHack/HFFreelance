const express = require('express');
const {
    sendNewsAdmin, allUsersAdmin, deleteUserAdmin, changePasswordAdmin, sendNewsPost, allNewsAdmin,
    deleteNewsAdmin, deleteReviewAdmin, sendLinksAdmin, deleteFacebookLink, deleteVkLink,
    deleteDiscordLink, deleteInstagramLink, sendLinksPostVk, sendLinksPostDiscord, sendLinksPostInstagram,
    sendLinksPostFacebook,
} = require('../controller/AdminController');
const {authenticateJWT} = require('../middlewares/jwtAuth');
const {verifyPermissions} = require('../middlewares/permissionsAuthorization')
const router = express.Router();

router.get('/sendNews', verifyPermissions('Admin'), authenticateJWT, sendNewsAdmin);
router.get('/allUsers', verifyPermissions('Admin'), authenticateJWT, allUsersAdmin);
router.get('/allNews', verifyPermissions('Admin'), authenticateJWT, allNewsAdmin)
router.get('/sendLinks', verifyPermissions('Admin'), authenticateJWT, sendLinksAdmin)

router.post('/deleteUserAdmin/:id', verifyPermissions('Admin'), deleteUserAdmin);
router.post('/deleteNewsAdmin/:id', verifyPermissions('Admin'), deleteNewsAdmin);
router.post('/changePasswordAdmin/:id', verifyPermissions('Admin'), changePasswordAdmin);
router.post('/deleteReviewsAdmin/:id', verifyPermissions('Admin'), deleteReviewAdmin);

router.post('/sendNews', verifyPermissions('Admin'), sendNewsPost);

router.post('/sendLinksVk', verifyPermissions('Admin'), sendLinksPostVk);
router.post('/sendLinksDiscord', verifyPermissions('Admin'), sendLinksPostDiscord);
router.post('/sendLinksInstagram', verifyPermissions('Admin'), sendLinksPostInstagram);
router.post('/sendLinksFacebook', verifyPermissions('Admin'), sendLinksPostFacebook);

router.post('/deleteFacebookLink/:id', verifyPermissions('Admin'), deleteFacebookLink);
router.post('/deleteVkLink/:id', verifyPermissions('Admin'), deleteVkLink);
router.post('/deleteDiscordLink/:id', verifyPermissions('Admin'), deleteDiscordLink);
router.post('/deleteInstagramLink/:id', verifyPermissions('Admin'), deleteInstagramLink);

module.exports = router;
