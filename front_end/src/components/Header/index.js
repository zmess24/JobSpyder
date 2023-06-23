import React from "react";
import Search from "./Search";
import SearchDialog from "./SearchDialog";

export default function Header({ search, filters }) {
	debugger;
	return (
		<header className="w-full mb-5 flex flex-1 lg:flex-row sm:flex-col justify-between">
			<Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} placeholder={"Search"} />
			<SearchDialog filters={filters.filters} addFilter={filters.addFilter} removeFilter={filters.removeFilter} />
		</header>
	);
}
