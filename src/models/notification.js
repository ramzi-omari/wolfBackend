import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: true
  },
  broadcast: {
      type: Boolean,
      default: false,
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Notification = mongoose.model('Notifications', NotificationSchema);
export default Notification;
