import React from "react";
import style from "./Categories.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setPage } from "../../store/findSlice";

const categories = [
	"all",
	"art",
	"biography",
	"computers",
	"history",
	"medical",
	"poetry",
];

const Categories = () => {
	const dispatch = useDispatch();
	const { category } = useSelector((state: any) => state.find);

	return (
		<div className={style.categories}>
			{categories.map((el, i) => (
				<ul key={i}>
					<li
						className={category === i ? style.active : ""}
						onClick={() => {
							dispatch(setCategory(i));
							dispatch(setPage(0));
						}}
					>
						{el}
					</li>
				</ul>
			))}
		</div>
	);
};

export default Categories;
