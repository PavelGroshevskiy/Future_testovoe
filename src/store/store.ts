import { configureStore } from "@reduxjs/toolkit";
import { findSlice as find } from "../modules/FindBlock";
import { booksApi } from "../modules/ShowResult/store/fetchBooks";

export const store = configureStore({
	reducer: {
		[booksApi.reducerPath]: booksApi.reducer,
		find,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(booksApi.middleware),
});
