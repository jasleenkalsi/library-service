export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    publishedDate?: string;
    isBorrowed: boolean;
    borrowerId?: string;
    dueDate?: string;
}