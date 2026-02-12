import {bookSchema} from "../utils/booksscheema.js";

const books = [
    {
        id: 1,
        title: "Atomic Habits",
        price: 15.99,
    },
    {
        id: 2,
        title: "The Power of Now",
        price: 12.99,
    },
    {
        id: 3,
        title: "The Alchemist",
        price: 10.99,
    },
    {
        id: 4,
        title: "The Subtle Art of Not Giving a F*ck",
        price: 14.99,
    }

]
export function getBooks(req, res) {
    res.status(200).json(books)//.send("Get all books")
}

export function getBookById(req, res) {
    const id = parseInt(req.params.id)
    const book = books.find(b => b.id === id)
    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    }
    res.status(200).json(book)
} //.send(`Get book with id ${id}`)

export function createBook(req, res) {
    const {error} = bookSchema.validate(req.body) 
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }

    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        price: req.body.price
    }
    books.push(newBook)
    res.status(201).json(newBook)
} //.send("Create a new book")