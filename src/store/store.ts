import { configureStore } from "@reduxjs/toolkit";
import { findSlice as find } from "../modules/FindBlock";

export const store = configureStore({
	reducer: {
		find,
	},
});
