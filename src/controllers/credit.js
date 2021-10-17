import { AVAILABLE_TRANSACTION_STATUS, CANCELED, MISSING_REQUIRED_FIELDS, PENDING, USER_INFO_POPULATE } from "../config/constants";
import Credit from "../models/credit";

export const PostCredit = async (req, res, next) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ success: false, message: MISSING_REQUIRED_FIELDS });
        }

        const newCredit = new Credit({
            user: req.user._id,
            date: Date.now(),
            amount,
        });

        const savedCredit = await newCredit.save();

        const myCredit = await Credit.find({ _id: savedCredit._id })
            .populate('user', USER_INFO_POPULATE);

        return res.status(200).json({
            success: true,
            credit: myCredit,
        });

    } catch (error) {
        console.log("error when PostCredit", error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

export const GetMyCredits = async (req, res, next) => {
    try {

        const { id } = req.user;
        const status = req.query.status || AVAILABLE_TRANSACTION_STATUS;

        const credits = await Credit.find({
            user: id,
            status: {
                $in: status,
            },
        })
            .populate('user', USER_INFO_POPULATE);

        return res.status(200).json({
            success: true,
            credits,
        });

    } catch (error) {
        console.log("error when GetMyCredits", error);
        return res.status(500).json({
            success: false,
            message: 'server error',
        });
    }
}

export const GetCreditById = async (req, res, next) => {
    try {

        const { id } = req.params;
        const userId = req.user.id;

        const credit = await Credit.findOne({
            user: userId,
            _id: id,
        }).populate('user', USER_INFO_POPULATE);

        return res.status(200).json({
            success: true,
            credit,
        });

    } catch (error) {
        console.log("error when GetCreditById", error);
        return res.status(500).json({
            success: false,
            message: 'server error',
        });
    }
}

export const CancelCredit = async (req, res, next) => {
    try {

        const { id } = req.params;
        const userId = req.user.id;

        const credit = await Credit.findOne({
            user: userId,
            _id: id,
        }).populate('user', USER_INFO_POPULATE);

        if(!credit){
            return res.status(400).json({
                status: false,
                message: `credit request not exist`,
            })
          }

        if (credit.status !== PENDING) {
            return res.status(422).json({
                status: false,
                message: `Transaction status is ${transactions.status}, you can't cancel`,
            })
        }

        credit.status = CANCELED;

        const savedCredit = await credit.save()

        return res.status(200).json({
            success: true,
            credit: savedCredit,
        });

    } catch (error) {
        console.log("error when CancelCredit", error);
        return res.status(500).json({
            success: false,
            message: 'server error',
        });
    }
}