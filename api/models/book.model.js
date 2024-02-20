import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  publisher: {
    type: String,
    required: false,
  },
  publicationDate: {
    type: Date,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  numberOfPages: {
    type: Number,
    required: false,
  },
  format: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  coverImage: {
    type: String,
    required: false,
  },
  reviews: {
    type: [String],
    required: false,
  },
  relatedBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Book",
    required: false,
  },
  keywords: {
    type: [String],
    required: false,
  },
  edition: {
    type: String,
    required: false,
  },
  series: {
    s_name: {
      type: String,
      required: false,
    },
    s_number: {
      type: Number,
      required: false,
    },
  },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;