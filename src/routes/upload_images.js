import { Router } from 'express';
import upload from '../utils/multer'

import { uploadImages } from '../controllers/upload';

const imageRouter = Router();

imageRouter.post('/image', upload.single('image'), uploadImages())
imageRouter.post('/', (req, res)=>{
    res.status(200).json({
        status:true
    })
})

export default imageRouter;
