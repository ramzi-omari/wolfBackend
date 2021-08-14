/// @route get messages/conversation/:id
/// @desc get a conversation by id

import { CONVERSATION_ALREADY_EXIST, SENDER } from "../config/constants";
import Conversation from "../models/conversation";
import Message from "../models/messages";

/// @route post conversation/
/// @desc create conversation of user 
/// @access private
export const CreateConversation = async (req, res) => {
    try {
        const { receiver, message } = req.body;

        const existingConversation = await Conversation.findOne({ receiver, sender: req.user._id});

        if (existingConversation) {
            return res.status(422).json({
                status: false,
                message: CONVERSATION_ALREADY_EXIST,
            })
        }

        const newMessage = new Message({ content: message, sendBy: SENDER});
        const savedMessage = await newMessage.save();

        const newConversation = new Conversation({
            receiver,
            sender: req.user._id,
            messages: [savedMessage._id],
        });

        const savedConversation = await newConversation.save();

        return res.status(200).json({
            status: true,
            conversation: savedConversation,
        })
    } catch (error) {
        console.log("error when CreateConversation ==> " + error);
        return res.status(500).json({ success: false, message: error });
    }
}

/// @route get conversation/
/// @desc get conversation of user 
/// @access private
export const GetConversation = async (req, res) => {
    try {
        const idUser = req.user.id;
        const conversation = await Conversation.find({
            $or:
                [{ sender: idUser },
                { receiver: idUser }]
        })
            .populate({
                path: 'messages',
                options: { sort: { 'updated_at': -1 } }
            })
            .populate({
                path: "receiver",
                populate: {
                    path: "user"
                },
                select: "first_name last_name email profilePictureUrl"
            })
            .populate({
                path: "sender",
                populate: {
                    path: "user",
                },
                select: "first_name last_name email profilePictureUrl"
            })
            .sort({ 'created_at': -1 }).lean();

        return res.status(200).json({ success: true, conversation });
    } catch (error) {
        console.log("error when GetConversation ==> " + error);
        return res.status(500).json({ success: false, message: error });
    }

}

/// @access private
export const getConversationById = async (req, res) => {
    try {
        const id = req.params.id;
        const conversation = await Conversation.find({
            _id: id
        }).populate('messages').populate('course')
            .populate({
                path: "sender",
                populate: {
                    path: "user"
                },
                select: "first_name last_name email profilePictureUrl"
            })
            .populate({
                path: "receiver",
                populate: {
                    path: "user",
                },
                select: "first_name last_name email profilePictureUrl"
            })
            .lean();

        return res.status(200).json({ success: true, conversation });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, message: e });
    }

}

/// @route get conversation/seen/:id
/// @desc set unseen field false in conversation model
/// @access private
export const SetUnseen = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ success: false, message: "id of conversation is required" });

        const conversation = await Conversation.findByIdAndUpdate(id, { unseen: false });

        if (!conversation) return res.status(400).json({ success: false, message: "conversation didn't find" });

        return res.status(200).json({ success: true, message: "updated to seen succefully" });
    } catch (e) {
        console.log("error when SetUnseen==>",e);
        return res.status(500).json({ success: false, message: e });
    }
}

/// @route get conversation/accepted/:id
/// @desc set accepted field true in conversation model
/// @access private
export const AccepteConversation = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ success: false, message: "id of conversation is required" });

        const conversation = await Conversation.findByIdAndUpdate(id, { accepted: true });

        if (!conversation) return res.status(400).json({ success: false, message: "conversation didn't find" });

        return res.status(200).json({ success: true, message: "updated to accepted succefully" });
    } catch (e) {
        console.log("error when AccepteConversation==>",e);
        return res.status(500).json({ success: false, message: e });
    }
}