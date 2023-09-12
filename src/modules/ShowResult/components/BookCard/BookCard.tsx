import React from "react";
import style from "./BookCard.module.scss";

const BookCard = ({ bookObj }: any) => {
	const { title, authors, categories, imageLinks, description } = bookObj;
	return (
		<div className={style.card}>
			<img src={imageLinks && imageLinks.smallThumbnail} />
			<div className={style.category}>{categories}</div>
			<div className={style.title}>{title}</div>
			<div className={style.author}>{authors}</div>
			<div className={style.description}>{description}</div>
		</div>
	);
};

export default BookCard;
