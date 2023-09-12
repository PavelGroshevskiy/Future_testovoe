import React, { useRef } from "react";
import { Header } from "../modules/FindBlock";
import { Books, FindResult, Skeleton } from "../modules/ShowResult";
import { API_KEY } from "../modules/ShowResult/constants/apiKey";
import style from "./Home.module.scss";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../modules/FindBlock/store/findSlice";
import { Link } from "react-router-dom";

const categoryArr = [
	"all",
	"art",
	"biography",
	"computers",
	"history",
	"medical",
	"poetry",
];

const Home = () => {
	const [books, setBooks]: any = React.useState([]);
	const [idBooks, setIdBook]: any = React.useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSearchRef = useRef(false);
	const isMounted = useRef(false);
	const [page, setPage]: any = React.useState(0);
	const [countResult, setCountResult] = React.useState(0);
	const { search, category, sort } = useSelector((state: any) => state.find);

	const fetchBooks = () => {
		try {
			fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${search}+intitle+subject=${categoryArr[category]}&orderBy=
				${sort.type}&maxResults=30&startIndex=${page}&:keyes&key=${API_KEY}`
			)
				.then((res) => res.json())
				.then((arr) => {
					console.log("Arr", arr);
					// setBooks([...books, ...arr.items]);
					setBooks(arr.items);
					// console.log(arr.items);
					setCountResult(arr.totalItems);
				});
		} catch (e) {
			console.log(e);
		}
	};

	React.useEffect(() => {
		if (window.location.search) {
			const params = QueryString.parse(window.location.search.substring(1));
			dispatch(setFilters(params));
			isSearchRef.current = true;
		}
	}, []);

	React.useEffect(() => {
		if (!isSearchRef.current) fetchBooks();
		isSearchRef.current = false;
	}, [search, sort, category, page]);

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = QueryString.stringify({
				sort: sort,
				category: category,
				page: page,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [search, sort, category, page]);
	console.log(books && "books", books);

	return (
		<>
			<Header />
			<div className={style.result}>
				<FindResult countResult={countResult} />
			</div>
			<div className={style.home}>
				{books ? (
					<Books books={books} />
				) : (
					[...new Array(10)].map((_, id) => <Skeleton key={id} />)
				)}
			</div>
		</>
	);
};

export default Home;
