import { MISSING_REQUIRED_FIELDS, TYPE_USERS } from "../config/constants";
import Journal from "../models/journal";

/// @route POST publication/add
/// @desc add a publication
/// @access User
export const addPublication = async (req, res) => {
    try {
        let { content, concerned_type } = req.body;

        const publisher = req.user.id;

        if (!content) {
            return res.status(400).json({ success: false, message: MISSING_REQUIRED_FIELDS });
        }

        concerned_type = concerned_type ? concerned_type : TYPE_USERS;

        concerned_type.forEach((type) => {
            if (!TYPE_USERS.includes(type)) {
                return res.status(400).json({ success: false, message: "inccorect uconcerned_type!" });
            }
        })

        const newPublication = new Journal({
            content,
            publisher,
            concerned_type,
        });

        const publication = await newPublication.save();

        return res.status(200).json({ success: true, publication });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


/// @route GET publication/
/// @desc get a publications
/// @access User
export const GetPublications = async (req, res)=>{
    try {
        const typeUser = req.user.type;

        const publications = await Journal.find({concerned_type : {$in: typeUser}})

        return res.status(200).json({ success: true, publications });
    } catch (error) {
        console.log(error);
        return res.status(500).json({});
    }
}