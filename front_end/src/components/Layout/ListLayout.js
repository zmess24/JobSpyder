import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Results from "./Results";
import ActiveFilters from "./ActiveFilters";
import Header from "../Header";

export default function ListLayout({ data, ListItemComponent, layoutCSS, filters }) {
	const INFINITE_SCROLL_STEP = 24;
	const [allData] = useState(data);
	const [allIndustries] = useState(filters.industries);
	const [allDepartments] = useState(filters.departments);

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

	// Handle Filter Change
	const addFilter = (value, type) => {
		setActiveIndustry([...activeIndustry, { value, label: value, type }]);
	};

	const removeFilter = (value, type) => {
		setActiveIndustry(activeIndustry.filter((a) => a.value !== value));
	};

	// Filter State Varialbes
	const loadData = () => {
		setIndex(index + INFINITE_SCROLL_STEP);
		let dataToRenderList = allData.slice(0, index + INFINITE_SCROLL_STEP);
		setDataToRender(dataToRenderList);
		if (dataToRenderList.length === allData.length) setScroll(false);
	};

	const loadSearchResults = () => {
		setSearchIndex(searchIndex + INFINITE_SCROLL_STEP);
		let dataToRenderList = searchResults.slice(0, searchIndex + INFINITE_SCROLL_STEP);
		setDataToRender(dataToRenderList);
		if (dataToRenderList.length === searchResults.length) setSearchScroll(false);
	};

	const filterResults = (searchItem, keyToSearch) => {
		let sliceIntoChunks = (arr, chunkSize) => {
			const res = [];
			for (let i = 0; i < arr.length; i += chunkSize) {
				let chunk = arr.slice(i, i + chunkSize);
				res.push(chunk);
			}
			return res;
		};

		let arrays = sliceIntoChunks(allData, 100);
		let arrayRef = [];

		arrays.forEach((array) => {
			let results = array.filter((data) => {
				debugger;
				let formatted_role = data[keyToSearch].toLowerCase().replace(" ", "");
				return formatted_role.indexOf(searchItem) > -1;
			});

			arrayRef = arrayRef.concat(results);
		});

		return arrayRef;
	};

	const handleSearchTermChange = (e) => {
		setSearchTerm(e.target.value);
		setSearchScroll(true);

		if (e.target.value == "") {
			setSearchResults([]);
			setSearchIndex(INFINITE_SCROLL_STEP);
			setDataToRender(data.slice(0, index));
		} else {
			let formatted_search = e.target.value.toLowerCase().replace(" ", "");

			let results = filterResults(formatted_search, "title");

			if (results.length < INFINITE_SCROLL_STEP) {
				setSearchScroll(false);
			}

			setDataToRender(results.slice(0, INFINITE_SCROLL_STEP));
			setSearchResults(results);
		}
	};

	let nextLoader = searchTerm ? loadSearchResults : loadData;
	let scrollState = searchTerm ? searchScroll : scroll;
	let resultsTotal = searchTerm ? searchResults.length : allData.length;

	return (
		<>
			<Header search={{ handleSearchTermChange, searchTerm }} filters={{ allIndustries, addFilter, removeFilter }} />
			<div className="flex flex-row mt-3 justify-between">
				<Results total={resultsTotal.toLocaleString("en-US")} />
				<ActiveFilters activeOptions={activeIndustry} removeFilter={removeFilter} />
			</div>
			<InfiniteScroll dataLength={dataToRender.length} next={nextLoader} hasMore={scrollState} loader={<p>Loading...</p>}>
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
