import React from "react";
import { OneBookCard, Skeleton } from "../modules/ShowResult";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../modules/ShowResult/constants/apiKey";

const Book = () => {
	const [oneBook, setOneBook] = React.useState();
	const { id } = useParams();

	React.useEffect(() => {
		const fetchOneBook = async () => {
			try {
				const { data } = await axios.get(
					`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
				);
				setOneBook(data.volumeInfo);
			} catch (e) {
				console.log("Ошибка при получении одной книги");
			}
		};
		fetchOneBook();
	}, []);

	return (
		<div>
			<h1>Book</h1>
			{oneBook ? <OneBookCard bookObj={oneBook} /> : <Skeleton />}
		</div>
	);
};

export default Book;
