import cloudinary from '../utils/cloudinary';
export const uploadImages = async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path,{
        folder: 'BSM'
       });
       
      res.json(result);
    } catch (err) {
        console.log("error when",err);
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
}