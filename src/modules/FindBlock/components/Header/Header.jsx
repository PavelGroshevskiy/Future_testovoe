import Categories from "../Categories/Categories";
import Search from "../Search/Search";
import Sort from "../Sort/Sort";
import style from "./Header.module.scss";

const Header = () => (
	<div className={style.header}>
		<h1>Search for Books</h1>
		<Search />
		<div className={style.sortAndCategory}>
			<Categories />
			<Sort />
		</div>
	</div>
);

export default Header;
