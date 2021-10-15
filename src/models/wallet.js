import mongoose from "mongoose";

const Schema = mongoose.Schema;

const walletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        default: 0,
    }

}, {
    collection: 'Wallets',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

walletSchema.index({user: 1});

const Wallet = mongoose.model('Walets', walletSchema);

export default Wallet;