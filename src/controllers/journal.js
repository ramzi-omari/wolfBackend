/// @route POST publication/add
/// @desc add a publication

import { MISSING_REQUIRED_FIELDS, TYPE_USERS } from "../config/constants";
import Journal from "../models/journal";

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

        return res.status(200).json({ message: "success", publication });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}