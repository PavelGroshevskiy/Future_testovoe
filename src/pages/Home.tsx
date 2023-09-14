import React, { useRef } from "react";
import { Header } from "../modules/FindBlock";
import { Books, FindResult, Skeleton } from "../modules/ShowResult";
import style from "./Home.module.scss";
import QueryString from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFilters, setPage } from "../modules/FindBlock/store/findSlice";
import {
	useLazySearchBooksQuery,
	useSearchBooksQuery,
} from "../modules/ShowResult/store/fetchBooks";

const categoryArr = ["", "art", "biography", "computers", "history", "medical", "poetry"];

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSearchRef = useRef(false);
	const isMounted = useRef(false);

	const { search, category, sort, page } = useSelector((state: any) => state.find);

	const selectCat = categoryArr[category];

	const [fetchBooks] = useLazySearchBooksQuery();
	const { data, isError, isLoading, isFetching } = useSearchBooksQuery(
		{
			search,
			sort,
			selectCat,
			page,
		},
		{ refetchOnFocus: true }
	);

	const Skeletons = () => {
		return [...new Array(10)].map((_, id) => <Skeleton key={id} />);
	};

	React.useEffect(() => {
		if (window.location.search) {
			const params = QueryString.parse(window.location.search.substring(1));
			dispatch(setFilters(params));
			isSearchRef.current = true;
		}
	}, []);

	React.useEffect(() => {
		if (!isSearchRef.current) return;
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

	if (isError) return <h1>Что-то пошло не так</h1>;

	return (
		<>
			<Header />
			<div className={style.result}>
				<FindResult countResult={data?.totalItems} />
			</div>
			<div className={style.home}>
				{isLoading || isFetching ? Skeletons() : <Books books={data?.items} />}
			</div>
			<button
				style={{ height: "30px", width: "100px" }}
				onClick={() => {
					dispatch(setPage(page + 1));
				}}
			>
				Load
			</button>
		</>
	);
};

export default Home;
