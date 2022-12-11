const Book = require('../models/Book');
const {MongoClient} = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const databaseCreditential = process.env.MANGOLAB_URI;
// for the register view page
let titlesBooks = [];
const client = new MongoClient(databaseCreditential);
const booksManager = async ()=>{
    try {
        const database = client.db("test");
        const books = database.collection("books");
        // query for all books : "books collections"
        const selectedBooks = books.find({}, {});
        await selectedBooks.forEach((res)=>{
            titlesBooks.push(res);
            //res.title === "Flex 3 in Action" ? console.log(res.longDescription) : null;
        });

    } finally {
        console.log(titlesBooks.length);
        await client.close();
    }
}

booksManager();
const truncate = (string ,charsizelimit)=>{
    return string.length > charsizelimit ? string.substr(0, charsizelimit - 1) + '. . .' : string;
}

const BooksView = (req, res) => {
    res.render('books', {
        titlesBooks,
        truncate
    });
}

const requestBookLocalize = (req, res) => {
    let b = "ZIZI"
    titlesBooks.forEach((book)=>{
        if(book.isbn === req.params.id){b = book;}
    });
    return b;
};
const BooksRequest =  (req, res) => {
    const detailBook = requestBookLocalize(req);
    console.log(detailBook);
    res.render('book', {
        detailBook,
        truncate
    });
}
module.exports = {
    BooksView,
    BooksRequest
};