import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Token = mongoose.model('Tokens', TokenSchema);
export default Token;
