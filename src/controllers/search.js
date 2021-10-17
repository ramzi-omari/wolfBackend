import { TYPE_USERS } from '../config/constants';
import Users from '../models/users'

export const searchUser = async (req, res, next) => {
    try {
        const { search, type } = req.query;
        const regexSearch = new RegExp(search, 'i');

        const typeSelected = TYPE_USERS.includes(type) ? type :  TYPE_USERS;

        const query = {
            $or: [
                { first_name: regexSearch },
                { last_name: regexSearch },
                { email: regexSearch },
                { phone: regexSearch },
            ],
            //isVerified: true,
            //isDeleted: false,
            type: typeSelected,
        };

        const users = await Users.find(query).select('first_name last_name profilePictureUrl email phone rating type');

        return res.status(200).json({
            success: true,
            users: users,
        });

    } catch (error) {
        console.log("error when searchUser", error);
        return res.status(500).json({
            success: false,
            message: 'server error',
        });
    }
}