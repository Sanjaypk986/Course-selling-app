import express from 'express'
import { createUser } from '../../controllers/userController.js';

const router = express.Router()

router.get('/create',createUser)
router.post('/logout',async(req,res)=>{
    console.log("post request accessed");
    
})

export default router