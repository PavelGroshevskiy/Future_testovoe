import React from "react";
import style from "./OneBookCard.module.scss";

const BookCard = ({ bookObj }: any) => {
	const { title, authors, categories, imageLinks, description } = bookObj;
	return (
		<div className={style.card}>
			<img src={imageLinks && imageLinks.smallThumbnail} />
			<div className={style.category}>
				<h4>Category:</h4>
				{categories}
			</div>
			<div className={style.title}>
				<h4>Title:</h4>
				{title}
			</div>
			<div className={style.author}>
				<h4>Authors:</h4>
				{authors}
			</div>
			<div className={style.description}>
				<h4>Description:</h4>
				{description}
			</div>
		</div>
	);
};

export default BookCard;
