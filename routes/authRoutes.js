const { Router } = require('express')
const authController = require('../controllers/authController')
const router = Router()

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/delete', authController.delete_get)
router.delete('/user/:id', authController.delete)
router.get('/forget_password', authController.update_get)
router.put('/update/:id', authController.update_post)


module.exports = router