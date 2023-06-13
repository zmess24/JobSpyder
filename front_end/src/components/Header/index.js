import React from "react";
import Search from "./Search";

export default function Header({ search }) {
	return (
		<header className="w-full">
			<Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} />
		</header>
	);
}
