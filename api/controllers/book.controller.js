import Book from "../models/book.model.js";

export const addBook = async (req, res, next) => {
  const {
    title,
    authors,
    publisher,
    publicationDate,
    genre,
    language,
    numberOfPages,
    format,
    summary,
    price,
    availability,
    rating,
    coverImage,
    reviews,
    relatedBooks,
    keywords,
    edition,
    s_name,
    s_number,
  } = req.body;

  const newBook = new Book({
    title,
    authors,
    publisher: publisher || "",
    publicationDate: publicationDate || new Date(),
    genre: genre || "",
    language: language || "",
    numberOfPages: numberOfPages || -1,
    format: format || "",
    summary: summary || "",
    price,
    availability: availability || true,
    rating: rating || -1,
    coverImage: coverImage || "",
    reviews: reviews || [],
    relatedBooks: relatedBooks || [],
    keywords: keywords || [],
    edition: edition || "",
    series: {
      s_name: s_name || "",
      s_number: s_number || -1,
    },
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};