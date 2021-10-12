import { TYPE_USERS } from '../config/constants';
import Users from '../models/users'

export const checkPassword = async (req, res, next) => {
    try {
        const { password } = req.body;

        const user = await Users.findOne({ _id: req.user._id });

        if (user.comparePassword(password)) {
            return res.status(200).json({
                success: true,
                message: "CORRECT_PASSWORD",
            });
        }

        return res.status(200).json({
            success: false,
            message: "WRONG_PASSWORD",
        });

    } catch (error) {
        console.log("error when checkPassword", error);
        return res.status(500).json({
            success: false,
            message: 'server error',
        });
    }
}