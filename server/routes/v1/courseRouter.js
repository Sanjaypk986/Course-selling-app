import express from 'express'
import { createCourse, deleteCourse, getAllCourse, updateCourse } from '../../controllers/courseController.js'

const router = express.Router()

router.get('/courses',getAllCourse)
router.post('/create',createCourse)
router.patch('/update/:id',updateCourse)
router.delete('/delete:/id',deleteCourse)

export default router