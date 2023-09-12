import React, { useRef } from "react";
import { Header } from "../modules/FindBlock";
import { Books, FindResult, Skeleton } from "../modules/ShowResult";
import { API_KEY } from "../modules/ShowResult/constants/apiKey";
import style from "./Home.module.scss";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../modules/FindBlock/store/findSlice";
import { useSearchBooksQuery } from "../modules/ShowResult/store/fetchBooks";

const categoryArr = [
	"all",
	"art",
	"biography",
	":computers",
	"history",
	"medical",
	"poetry",
];

const Home = () => {
	// const [books, setBooks]: any = React.useState([]);
	const [maxResults, setMaxResults]: any = React.useState(30);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSearchRef = useRef(false);
	const isMounted = useRef(false);
	const [page, setPage]: any = React.useState(0);
	const [countResult, setCountResult] = React.useState(0);
	const { search, category, sort } = useSelector((state: any) => state.find);

	const selectCat = categoryArr[category];

	const { data } = useSearchBooksQuery({ search, maxResults, sort, selectCat });
	console.log(data);
	console.log(data && "RTKQ", data);

	const fetchBooks = () => {
		// try {
		// 	fetch(
		// 		`https://www.googleapis.com/books/v1/volumes?q=${search}+intitle+subject=${categoryArr[category]}&orderBy=
		// 		${sort.type}&maxResults=30&startIndex=${page}&:keyes&key=${API_KEY}`
		// 	)
		// 		.then((res) => res.json())
		// 		.then((arr) => {
		// 			// setBooks([...books, ...arr.items]);
		// 			setBooks(arr.items);
		// 			// console.log(arr.items);
		// 			setCountResult(arr.totalItems);
		// 		});
		// } catch (e) {
		// 	console.log(e);
		// }
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

	return (
		<>
			<Header />
			<div className={style.result}>
				<FindResult countResult={data?.totalItems} />
			</div>
			<div className={style.home}>
				{data ? (
					<Books books={data?.items} />
				) : (
					[...new Array(10)].map((_, id) => <Skeleton key={id} />)
				)}
			</div>
		</>
	);
};

export default Home;
