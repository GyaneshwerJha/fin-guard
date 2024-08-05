import mongoose, { mongo } from 'mongoose';

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["CREDIT-CARD", "BANK", "CASH"],
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

const Account = mongoose.model('Account', AccountSchema);
export default Account;