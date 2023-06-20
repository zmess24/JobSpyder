import React, { useState } from "react";
import Search from "./Search";
import SearchDialog from "./SearchDialog";

export default function Header({ search, industries }) {
	return (
		<header className="w-full mb-5 flex flex-1 lg:flex-row sm:flex-col justify-between">
			<Search handleChange={search.handleSearchTermChange} searchTerm={search.searchTerm} placeholder={"Search"} />
			<Search handleChange={industries.handleIndustryTermChange} searchTerm={industries.industryTerm} placeholder={"Search Industries"} />
			{<SearchDialog open={industries.industryDialogOpen} setOpen={industries.setIndustryDialogOpen} filters={[industries.allIndustries]} />}
		</header>
	);
}
