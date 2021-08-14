import mongoose from 'mongoose';
import { RECEIVER, SENDER } from '../config/constants';

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    messages: [
        {
            type: Schema.ObjectId,
            ref: 'messages',
            required: true,
        }
    ],
    unseen: {
        type: Boolean,
        default: true
    },
    unseenBy: {
        type: String,
        enum: [
            RECEIVER,
            SENDER,
        ],
        default: RECEIVER,
    },
    accepted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Conversation = mongoose.model('conversations', ConversationSchema);
export default Conversation;
