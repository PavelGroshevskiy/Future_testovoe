import { OneBookCard, Skeleton } from "../modules/ShowResult";
import { useParams } from "react-router-dom";

import { useSerarchOneBookQuery } from "../modules/ShowResult/store/fetchBooks";

const Book = () => {
	const { id } = useParams();
	const { data, isError, isLoading } = useSerarchOneBookQuery(id);

	if (isError) return <h1>Something went wrong</h1>;
	if (isLoading) return <Skeleton />;

	return (
		<div>
			<h1>Book</h1>
			<OneBookCard bookObj={data} />
		</div>
	);
};

export default Book;
