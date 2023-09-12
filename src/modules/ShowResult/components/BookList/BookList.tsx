import React from "react";
import BookCard from "../BookCard/BookCard";
import { Link } from "react-router-dom";

interface Books {
	books: any;
}

const BookList = ({ books }: Books) => {
	console.log(books);
	return (
		<>
			{books.map((book: any, i: number) => (
				<Link to={`/book/${book.id}`} key={i}>
					<BookCard bookObj={book.volumeInfo} />
				</Link>
			))}
		</>
	);
};

export default BookList;
