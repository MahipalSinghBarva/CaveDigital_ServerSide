import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    available: { type: Boolean, default: "true" },
    publishedDate: { type: String, required: true },
    image: { type: String},
    description: { type: String }
}, { timestamps: true });

const Book = mongoose.model("book", bookSchema);

export default Book