import mongoose from "mongoose";
import { AVAILABLE_TRANSACTION_STATUS, PENDING } from "../config/constants";

const Schema = mongoose.Schema;

const creditSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: AVAILABLE_TRANSACTION_STATUS,
        default: PENDING,
    },
}, {
    collection: 'Credits',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

creditSchema.index({user: 1});

const Credit = mongoose.model('credits', creditSchema);

export default Credit;