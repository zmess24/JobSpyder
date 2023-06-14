import React from "react";
import Search from "./Search";
import ListPreference from "./ListPreference";

export default function Header({ search }) {
	return (
		<header className="w-full mb-5">
			<Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} />
			{/* <ListPreference /> */}
		</header>
	);
}
