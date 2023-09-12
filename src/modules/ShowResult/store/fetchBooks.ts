import { FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../constants/apiKey";
import { QueryArgs } from "@testing-library/react";

export interface Response {
	kind: string;
	totalItems: number;
	items: Item[];
}

export interface Item {
	kind: string;
	id: string;
	etag: string;
	selfLink: string;
	volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	categories: string[];
	imageLinks: ImageLinks;
}

export interface ImageLinks {
	smallThumbnail: string;
	thumbnail: string;
}

export interface Query {
	search: string;
	category?: number;
	selectCat: string;
	maxResults?: number;
}

export const booksApi = createApi({
	reducerPath: "booksApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://www.googleapis.com/books/v1/volumes" }),
	endpoints: (builder) => ({
		searchBooks: builder.query<Response, any>({
			query: (args) => {
				const { search, maxResults, sort, selectCat } = args;
				console.log(args);
				return {
					url: "/",
					params: {
						q: `${search}+inauthor+subject${selectCat}`,
						maxResults: maxResults,
						startIndex: "0",
						orderBy: sort.type,
						":keyes&key": API_KEY,
					},
				};
			},
			// transformResponse: (response: Response) => response.items,
		}),
	}),
});

export const { useSearchBooksQuery } = booksApi;
// Generated by https://quicktype.io
