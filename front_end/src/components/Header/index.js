import React from "react";
import Search from "./Search";
import ListPreference from "./ListPreference";
import CategoryFilter from "./CategoryFitler";

export default function Header({ search, results, filters }) {
	return (
		<header className="w-full mb-5 flex flex-1 lg:flex-row sm:flex-col justify-between">
			<Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} placeholder={"Search"} />
			{/* <Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} placeholder={"Industry Filter"} />
			<Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} placeholder={"Department Filter"} /> */}
			{/* <CategoryFilter filters={filters} /> */}
			{/* <ListPreference /> */}
		</header>
	);
}
