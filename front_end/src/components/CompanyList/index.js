import React, { useState } from "react";
import CompanyItem from "./CompanyItem";
import Header from "../Header";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CompanyList({ companies }) {
	const [searchTerm, setSearchTerm] = useState(null);

	const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

	if (searchTerm) {
		companies = companies.filter((company) => {
			let formatted_company = company.name.toLowerCase().replace(" ", "");
			let formatted_search = searchTerm.toLowerCase().replace(" ", "");
			return formatted_company.indexOf(formatted_search) > -1;
		});
	}

	return (
		<>
			<Header search={{ handleSearchTermChange, searchTerm }} />
			<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 bg-gray-100">
				{companies &&
					companies.map((company) => {
						return <CompanyItem company={company} />;
					})}
			</ul>
			{/* <InfiniteScroll
				dataLength={20}
				next={}
				hasMore={true} 
				loader={<p>Loading...</p>}
				endMessage={<p>No more data to load.</p>}
			>
				
			</InfiniteScroll> */}
		</>
	);
}
