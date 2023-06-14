import React, { useState } from "react";
import CompanyItem from "./CompanyItem";
import Header from "../Header";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CompanyList({ data }) {
	const INFINITE_SCROLL_STEP = 24;
	// Infinite Scroll State Variables
	const [allCompanies] = useState(data);
	const [index, setIndex] = useState(INFINITE_SCROLL_STEP);
	const [scroll, setScroll] = useState(true);
	// State Variables
	const [companies, setCompanies] = useState(data.slice(0, INFINITE_SCROLL_STEP));
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchTermChange = (e) => {
		if (e.target.value == "") {
			setSearchTerm(e.target.value);
			setCompanies(allCompanies.slice(0, index));
		} else {
			setSearchTerm(e.target.value);

			let filtered = allCompanies.filter((company) => {
				let formatted_company = company.name.toLowerCase().replace(" ", "");
				let formatted_search = searchTerm.toLowerCase().replace(" ", "");
				return formatted_company.indexOf(formatted_search) > -1;
			});

			filtered.length < INFINITE_SCROLL_STEP ? setScroll(false) : setScroll(true);
			setCompanies(filtered);
		}
	};

	const loadCompanies = () => {
		setIndex(index + INFINITE_SCROLL_STEP);
		let companyList = allCompanies.slice(0, index + INFINITE_SCROLL_STEP);
		setCompanies(companyList);
		debugger;
		if (companyList.length === allCompanies.length) setScroll(false);
	};

	return (
		<>
			<Header search={{ handleSearchTermChange, searchTerm }} />
			<InfiniteScroll dataLength={companies.length} next={loadCompanies} hasMore={scroll} loader={<p>Loading...</p>}>
				<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 bg-gray-100">
					{companies &&
						companies.map((company) => {
							return <CompanyItem key={company._id} company={company} />;
						})}
				</ul>
			</InfiniteScroll>
		</>
	);
}
