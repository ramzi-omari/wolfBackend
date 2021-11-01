import Notification from "../models/notification";
import User from "../models/users";

export const PushNotificationByUser = async (req, res) => {
    try {
        const { message, to } = req.body;

        const userTo = await User.findOne({ _id: to }, { password: -1 });

        if (!userTo) {
            return res.status(400).json({ success: false, message: "user not foud" });
        }
        
        const newNotification = new Notification({
            message,
            to,
        });
        const savedNotif = await newNotification.save();

        return res.status(200).json({
            success: true,
            notification: savedNotif,
        });

    } catch (error) {
        console.log("error when PushNotificationByUser", error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

export const PushNotificationBroadcast = async (req, res) => {
    try {
        const { message } = req.body;

        const newNotification = new Notification({
            message,
            broadcast: true,
        });
        const savedNotif = await newNotification.save();

        return res.status(200).json({
            success: true,
            notification: savedNotif,
        });

    } catch (error) {
        console.log("error when PushNotificationBroadcast", error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

export const getMyNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({
            $or:[
                {
                    to: req.user._id
                },
                {
                    broadcast: true,
                }
            ]
        }).select('message created_at')
        .sort({created_at: -1})
        .limit(10)

        return res.status(200).json({
            success: true,
            notifications,
        });

    } catch (error) {
        console.log("error when PushNotificationBroadcast", error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
}