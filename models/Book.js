const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required:true
    }
});

const Book = mongoose.model('Book', BookSchema);


module.exports = Book;