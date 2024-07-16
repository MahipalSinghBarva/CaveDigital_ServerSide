import Transaction from "../models/Transaction.js"
import Book from "../models/Book.js"
import User from "../models/User.js"

export const getTransaction = async (req, res, next) => {
    const transaction = await Transaction.find()
    res.json(transaction)
};

export const getTransactionForUser = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const transactions = await Transaction.find({ user: userId }).populate('book', 'title');

        if (!transactions.length) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }

        res.json(transactions);
    } catch (error) {
        next(error);
    }
}

export const addTransaction = async (req, res, next) => {
    const { userId, bookId, dueDate, type } = req.body;

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Create a new transaction
        const newTransaction = new Transaction({
            user: userId,
            username: user.username,
            book: {
                id: bookId,
                title: book.title
            },
            dueDate,
            type: 'borrowed'
        });
        await newTransaction.save();


        book.available = false;
        await book.save();


        res.json(newTransaction);
    } catch (error) {
        next(error);
    }
};

export const returnBook = async (req, res, next) => {
    const transactionId = req.params.transactionId;

    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Update the book's availability
        await Book.findByIdAndUpdate(transaction.book.id, { available: true });

        // Remove the transaction
        await Transaction.findByIdAndDelete(transactionId);

        res.json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}