import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Results from "./Results";
import ActiveFilters from "./ActiveFilters";
import Header from "../Header";

export default function ListLayout({ data, ListItemComponent, layoutCSS, filters }) {
	const INFINITE_SCROLL_STEP = 24;
	const [allData] = useState(data);
	const [allIndustries, setAllIndustries] = useState(filters.industries);
	const [allDepartments, setAllDepartments] = useState(filters.departments);

	// Search State Varibles
	const [searchResults, setSearchResults] = useState([]);
	const [searchIndex, setSearchIndex] = useState(INFINITE_SCROLL_STEP);
	const [searchScroll, setSearchScroll] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	// Industry Filter State Varibles
	const [activeIndustry, setActiveIndustry] = useState([]);

	// Infinite Scroll State Variables
	const [index, setIndex] = useState(INFINITE_SCROLL_STEP);
	const [scroll, setScroll] = useState(true);
	const [dataToRender, setDataToRender] = useState(data.slice(0, INFINITE_SCROLL_STEP));

	const resetSearch = () => {
		setSearchResults([]);
		setSearchIndex(INFINITE_SCROLL_STEP);
		setDataToRender(allData.slice(0, index));
	};

	// Filter Results Function
	const filterResults = ({ searchCriteria, keyToSearch }, dataset = allData) => {
		let sliceIntoChunks = (arr, chunkSize) => {
			const res = [];
			for (let i = 0; i < arr.length; i += chunkSize) {
				let chunk = arr.slice(i, i + chunkSize);
				res.push(chunk);
			}
			return res;
		};

		let arrays = sliceIntoChunks(dataset, 100);
		let arrayRef = [];

		arrays.forEach((array) => {
			let results = array.filter((data) => {
				debugger;
				if (keyToSearch === "industries" && searchCriteria.length > 0) {
					let found = searchCriteria.find(({ value }) => {
						return data[keyToSearch].indexOf(value) > -1;
					});
					return found;
				} else {
					let formatted_role = data[keyToSearch].toLowerCase().replace(" ", "");
					return formatted_role.indexOf(searchCriteria) > -1;
				}
			});

			arrayRef = arrayRef.concat(results);
		});

		if (arrayRef.length < INFINITE_SCROLL_STEP) setSearchScroll(false);
		setDataToRender(arrayRef.slice(0, INFINITE_SCROLL_STEP));
		setSearchResults(arrayRef);
	};

	// Handle Filter Change
	const addFilter = (value, type) => {
		let industries = [...activeIndustry, { value, label: value, type }];
		setActiveIndustry(industries);
		filterResults({ searchCriteria: industries, keyToSearch: "industries" });
	};

	const removeFilter = (value, type) => {
		let industries = activeIndustry.filter((a) => a.value !== value);
		setActiveIndustry(industries);
		if (industries.length === 0 && searchTerm === "") {
			resetSearch();
		} else {
			filterResults({ searchCriteria: industries, keyToSearch: "industries" });
		}
	};

	// Filter State Varialbes
	const loadData = () => {
		if (searchTerm || activeIndustry.length > 0) {
			setSearchIndex(searchIndex + INFINITE_SCROLL_STEP);
			let dataToRenderList = searchResults.slice(0, searchIndex + INFINITE_SCROLL_STEP);
			setDataToRender(dataToRenderList);
			if (dataToRenderList.length === searchResults.length) setSearchScroll(false);
		} else {
			setIndex(index + INFINITE_SCROLL_STEP);
			let dataToRenderList = allData.slice(0, index + INFINITE_SCROLL_STEP);
			setDataToRender(dataToRenderList);
			if (dataToRenderList.length === allData.length) setScroll(false);
		}
	};

	const handleSearchTermChange = (e) => {
		setSearchTerm(e.target.value);
		setSearchScroll(true);
		let formatted_search = e.target.value.toLowerCase().replace(" ", "");

		if (e.target.value === "" && activeIndustry.length === 0) {
			resetSearch();
		} else if (e.target.value === "" && activeIndustry.length > 0) {
			filterResults({ searchCriteria: activeIndustry, keyToSearch: "industries" });
			filterResults({ searchCriteria: formatted_search, keyToSearch: "title" }, searchResults);
		} else if (activeIndustry.length > 0) {
			filterResults({ searchCriteria: formatted_search, keyToSearch: "title" }, searchResults);
		} else {
			filterResults({ searchCriteria: formatted_search, keyToSearch: "title" });
		}
	};

	let scrollState = searchTerm || activeIndustry.length > 0 ? searchScroll : scroll;
	let resultsTotal = searchTerm || activeIndustry.length > 0 ? searchResults.length : allData.length;

	return (
		<>
			<Header search={{ handleSearchTermChange, searchTerm }} filters={{ allIndustries, addFilter, removeFilter }} />
			<div className="flex flex-row mt-3 justify-between">
				<Results total={resultsTotal.toLocaleString("en-US")} />
				<ActiveFilters activeOptions={activeIndustry} removeFilter={removeFilter} />
			</div>
			<InfiniteScroll dataLength={dataToRender.length} next={loadData} hasMore={scrollState} loader={<p>Loading...</p>}>
				<ul role="list" className={layoutCSS}>
					{dataToRender &&
						dataToRender.map((role) => {
							return <ListItemComponent data={role} />;
						})}
				</ul>
			</InfiniteScroll>
		</>
	);
}
