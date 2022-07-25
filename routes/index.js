var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');
var message_controller = require('../controllers/messageController');

router.get('/', message_controller.index);

router.get('/message/create', message_controller.message_create_get);
router.post('/message/create', message_controller.message_create_post);
router.get('/message/:id/delete', message_controller.message_delete_get);
router.post('/message/:id/delete', message_controller.message_delete_post);

router.get('/user/sign_up', user_controller.user_create_get);
router.post('/user/sign_up', user_controller.user_create_post);
router.get('/sign_in', user_controller.user_sign_in_get);
router.post('/sign_in', user_controller.user_sign_in_post);
router.get('/user/:id/join', user_controller.user_join_get);
router.post('/user/:id/join', user_controller.user_join_post);
router.get('/user/:id/admin', user_controller.user_admin_get);
router.post('/user/:id/admin', user_controller.user_admin_post);

module.exports = router;