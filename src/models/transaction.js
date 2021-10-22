import mongoose from 'mongoose';
import { AVAILABLE_TRANSACTION_STATUS, PENDING } from '../config/constants';

const Schema = mongoose.Schema;

const TransactioSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    from_admin: {
        type: Boolean,
        default: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: AVAILABLE_TRANSACTION_STATUS,
        default: PENDING,
    },
    motif:{
        type: String,
    },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

     
export default mongoose.model('transaction', TransactioSchema);

