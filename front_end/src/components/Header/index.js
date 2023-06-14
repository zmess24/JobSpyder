import React from "react";
import Search from "./Search";
import CategoryFilter from "./CategoryFitler";

export default function Header({ search }) {
	return (
		<header className="w-full">
			<Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} />
			{/* <CategoryFilter /> */}
		</header>
	);
}
