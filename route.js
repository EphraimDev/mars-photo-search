import express from 'express';
import Axios from 'axios';

const router = express.Router();
router.get('/api/v1/search', async(req, res)=>{
    const {sol, camera} = req.query;
    const photoSearch = await Axios.get(`https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}`);
    
    if(photoSearch.status === 200 && photoSearch.data.photos.length > 0){
        return res.status(200).json({
            photos: photoSearch.data.photos,
            message: "Successful"
        })
        
    }else{
        return res.status(200).json({
            message: "No photos"
        })
    }

});

export default router;