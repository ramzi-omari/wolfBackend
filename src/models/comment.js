import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'Journal',
        required: true,
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Journal = mongoose.model('comment', CommentSchema);
export default Journal;
