import express from 'express'
import { createCourse, deleteCourse, getAllCourse, updateCourse } from '../../controllers/courseController.js'
import { upload } from '../../middlewares/uploadMiddleware.js'

const router = express.Router()

router.get('/courses',getAllCourse)
router.post('/create',upload.single('image'),createCourse) //upload single image
router.patch('/update/:id',updateCourse)
router.delete('/delete:/id',deleteCourse)

export default router