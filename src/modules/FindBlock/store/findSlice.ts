import { createSlice } from "@reduxjs/toolkit";

interface State {
	sort: object;
	search: string;
	category: number;
	page: number;
}

const initialState: State = {
	sort: {
		name: "релевантости",
		type: "relevance",
	},
	search: "",
	category: 0,
	page: 0,
};

export const findSlice = createSlice({
	name: "findSlice",
	initialState,
	reducers: {
		setCategory(state, action) {
			state.category = action.payload;
		},
		setInputSearch(state, action) {
			state.search = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
		setPage(state, action) {
			state.page = action.payload;
		},
		setFilters(state, action) {
			state.sort = action.payload.sort;
			state.category = Number(action.payload.category);
			state.page = Number(action.payload.page);
		},
	},
});

export const { setCategory, setInputSearch, setSort, setPage, setFilters } =
	findSlice.actions;

export default findSlice.reducer;
