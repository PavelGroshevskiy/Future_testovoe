import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../constants/apiKey";
import { Result } from "antd";

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
	tagTypes: ["Books"],
	baseQuery: fetchBaseQuery({
		baseUrl: "https://www.googleapis.com/books/v1/volumes",
	}),
	endpoints: (builder) => ({
		searchBooks: builder.query<any, any>({
			query: (args) => {
				const { search, maxResults, sort, selectCat, page } = args;
				return {
					url: "/",
					params: {
						q: `${search}+inauthor+subject${selectCat}`,
						maxResults: maxResults,
						startIndex: page,
						orderBy: sort.type,
						":keyes&key": API_KEY,
					},
				};
			},
		}),
		addPosts: builder.mutation({
			query(data) {
				const { id, ...body } = data;
				console.log(data);
				return {
					url: "/",
					body,
				};
			},
		}),

		serarchOneBook: builder.query({
			query: (id) => ({
				url: `/${id}?key=${API_KEY}`,
			}),
			transformResponse: (response: any) => response.volumeInfo,
		}),
	}),
});

export const {
	useSearchBooksQuery,
	useLazySearchBooksQuery,
	useSerarchOneBookQuery,
	useAddPostsMutation,
} = booksApi;
// Generated by https://quicktype.io
