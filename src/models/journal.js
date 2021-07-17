import mongoose from 'mongoose';
import { TYPE_USERS } from '../config/constants';
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  publisher: {
      type: Schema.Types.ObjectId,
      ref:'Users'
  },
  concerned_type:[{
      type: String,
      enum: [TYPE_USERS],
  }
    ]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Journal = mongoose.model('Journals', JournalSchema);
export default Journal;
