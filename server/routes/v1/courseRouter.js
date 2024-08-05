import express from 'express'

const router = express.Router()

router.get('/',async(req,res)=>{
    console.log("get request accessed");
    
})
router.post('/',async(req,res)=>{
    console.log("post request accessed");
    
})

export default router