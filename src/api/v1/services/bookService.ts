import { Book } from "../model/bookModel";

// Sample books array for demo
const books: Book[] = [
    {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        publishedDate: "March",
        isBorrowed: false,
        availabilityStatus: "available", // Default value, updated later
    },
    {
        id: "2",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        publishedDate: "March",
        isBorrowed: false,
        availabilityStatus: "available", // Default value, updated later
    },
    {
        id: "3",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        publishedDate: "March",
        isBorrowed: false,
        availabilityStatus: "available", // Default value, updated later
    },
];

// Returns all books
export const getAllBooks = (): Book[] => {
    return books;
};

// Adds a new book to the library system
export const addBook = (
    bookData: Omit<Book, "id" | "isBorrowed" | "borrowerId" | "dueDate">
): Book => {
    if (!bookData.title || !bookData.author || !bookData.genre) {
        throw new Error("Missing required fields: title, author, and genre are required");
    }

    const newBook: Book = {
        id: (Math.random() * 10000).toFixed(0),
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        isBorrowed: false,
        availabilityStatus: "available", // New book is available by default
    };

    books.push(newBook);
    return newBook;
};

// Updates an existing book's information (except for protected fields like id, isBorrowed, etc.)
export const updateBook = (id: string, bookData: Partial<Book>): Book => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        throw new Error(`Book with ID ${id} not found`);
    }

    const safeUpdate = { ...bookData };

    // Remove fields that shouldn't be updated
    delete safeUpdate.id;
    delete safeUpdate.isBorrowed;
    delete safeUpdate.borrowerId;
    delete safeUpdate.dueDate;

    Object.assign(book, safeUpdate);
    return book;
};

// Gets a book by its ID and updates availability status
export const getBookById = (id: string): Book | undefined => {
    const book = books.find((book) => book.id === id);
    if (book) {
        // Dynamically set availability status
        book.availabilityStatus = book.isBorrowed ? 'unavailable' : 'available';
    }
    return book;
};

// Removes a book from the library system
export const deleteBook = (id: string): boolean => {
    const index = books.findIndex((b) => b.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        return true;
    }
    return false;
};

// Marks a book as borrowed by a user and sets a due date (14 days from now)
export const borrowBook = (id: string, borrowerId: string): Book => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        throw new Error(`Book with ID ${id} not found`);
    }

    if (book.isBorrowed) {
        throw new Error(`Book with ID ${id} is already borrowed`);
    }

    book.isBorrowed = true;
    book.borrowerId = borrowerId;

    // Set the due date (14 days from now)
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    // Update availability status
    book.availabilityStatus = "unavailable";

    return book;
};

// Marks a book as returned, removing borrower information and due date
export const returnBook = (id: string): Book => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        throw new Error(`Book with ID ${id} not found`);
    }

    if (!book.isBorrowed) {
        throw new Error(`Book with ID ${id} is not currently borrowed`);
    }

    book.isBorrowed = false;
    delete book.borrowerId;
    delete book.dueDate;

    // Update availability status
    book.availabilityStatus = "available";

    return book;
};

// Gets a list of recommended books (first 3 in the list)
export const getRecommendations = (): Book[] => {
    return books.slice(0, 3);
};
