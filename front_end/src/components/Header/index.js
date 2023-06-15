import React from "react";
import Search from "./Search";
import ListPreference from "./ListPreference";
import CategoryFilter from "./CategoryFitler";

export default function Header({ search, results, filters }) {
	return (
		<header className="w-full mb-5 flex row space-between">
			<Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} />
			{/* <CategoryFilter filters={filters} /> */}
			{/* <ListPreference /> */}
		</header>
	);
}
