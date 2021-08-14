import mongoose from 'mongoose';
import { RECEIVER, SENDER } from '../config/constants';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  isValid: Boolean,
  sendBy: {
    type: String,
    enum: [
      RECEIVER, 
      SENDER,
    ],
    required: true
}
}, {
  timestamps: { createdAt: 'date', updatedAt: 'updated_at' }
});

const Message = mongoose.model('messages', MessageSchema);
export default Message;
