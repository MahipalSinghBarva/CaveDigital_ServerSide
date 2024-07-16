import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
    book: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        title: { type: String, required: true }
    },
    dueDate: Date,
    type: String
}, { timestamps: true });

const Transaction = mongoose.model("transaction", transactionSchema);


export default Transaction