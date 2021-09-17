import { MISSING_REQUIRED_FIELDS } from "../config/constants";
import transaction from "../models/transaction";
import User from "../models/users";

export const PostTransaction = async (req, res, next) => {
    try {
        const { amount, to, motif } = req.body;

        if (!amount || !to || !motif) {
            return res.status(400).json({ success: false, message: MISSING_REQUIRED_FIELDS });
        }

        const userFrom = req.user;
        const userTo = await User.findOne({_id: to},{password:-1});

        if (!userTo ) {
            return res.status(400).json({ success: false, message: "user not foud" });
        }

        const newTransaction = new transaction({
            from: userFrom._id,
            to,
            date: Date.now(),
            amount,
            motif,
        });

        const savedTransaction = await newTransaction.save();

        return res.status(200).json({ 
            success: true, 
            transaction: savedTransaction 
        });        

    } catch (error) {
        console.log("error when PostTransaction",error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
}