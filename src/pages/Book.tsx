import { OneBookCard, Skeleton } from "../modules/ShowResult";
import { useParams } from "react-router-dom";

import { useSerarchOneBookQuery } from "../modules/ShowResult/store/fetchBooks";

const Book = () => {
	const { id } = useParams();
	const { data } = useSerarchOneBookQuery(id);

	return (
		<div>
			<h1>Book</h1>
			{data ? <OneBookCard bookObj={data} /> : <Skeleton />}
		</div>
	);
};

export default Book;
