import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import "./App.scss";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/book/:id" element={<Book />} />
				<Route path="/book/*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
