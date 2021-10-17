import { USER_INFO_POPULATE } from "../config/constants";
import Wallet from "../models/wallet";

export const GetMyWallet = async (req, res, next) => {
    try {
        const userId = req.user.id

        const myWallet = await Wallet.findOne({user: userId}).populate(USER_INFO_POPULATE);

        return res.status(200).json({
            success: true,
            wallet: myWallet,
        });

    } catch (error) {
        console.log("error when GetMyWallet", error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
}