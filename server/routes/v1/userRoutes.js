import express from 'express'
import { checkUser, createUser, loginUser, userProfile } from '../../controllers/userController.js';
import { authUser } from '../../middlewares/authUser.js';

const router = express.Router()

router.post('/create',createUser)
router.post('/login',loginUser)
router.get('/profile/:id',authUser,userProfile)

// for front-end routing
router.get('/check-user',authUser,checkUser)

export default router