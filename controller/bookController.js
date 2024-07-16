import Book from "../models/Book.js"

export const getBooks = async (req, res, next) => {
    const books = await Book.find()
    res.json(books)
}

export const addBook = async (req, res, next) => {
    try {
        const { title, author, publishedDate, description } = req.body;
        const image = req.file ? req.file.path : null;
        const newBook = new Book({ title, author, publishedDate, description, image });
        await newBook.save();
        res.json(newBook);
    } catch (error) {
        next(error);
    }
}

export const deleteBook = async (req, res, next) => {
    const { id } = req.params
    await Book.findByIdAndDelete(id)
    res.json({ message: "Book Deleted" })
}