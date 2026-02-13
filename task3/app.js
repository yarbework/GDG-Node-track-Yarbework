import express from "express";
import {errorHandler} from "./middleware/errorHandler.js";
import booksRoutes from "./routes/booksRoutes.js";

const app = express()

app.use(express.json()) 

app.use('/books', booksRoutes)

app.use(errorHandler)

export default app