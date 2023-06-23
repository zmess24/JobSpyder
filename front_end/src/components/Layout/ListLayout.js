import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Results from "./Results";
import ActiveFilters from "./ActiveFilters";
import Header from "../Header";
import { saveInCache } from "../../api";
import { filterResults } from "../../constants/utlitiies";

export default function ListLayout({ data, ListItemComponent, layoutCSS, filters, settings, filteredData, searchKey }) {
	const INFINITE_SCROLL_STEP = 24;
	const [allData] = useState(data);

	// Search State Varibles
	const [searchResults, setSearchResults] = useState(filteredData);
	const [searchIndex, setSearchIndex] = useState(INFINITE_SCROLL_STEP);
	const [searchScroll, setSearchScroll] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	// Industry Filter State Varibles
	const [activeFilters, setactiveFilters] = useState(settings);

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
	const filterResults = ({ searchTerm, searchKey, filters, filterKey }) => {
		// Slicing Function
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
				let formatted_role = data[searchKey].toLowerCase().replace(/ /g, "");

				if (filters.length > 0) {
					let filterFound = filters.find(({ value }) => data[filterKey].indexOf(value) > -1);
					return filterFound ? formatted_role.indexOf(searchTerm) > -1 : false;
				} else {
					return formatted_role.indexOf(searchTerm) > -1;
				}
			});

			console.log(results);
			arrayRef = arrayRef.concat(results);
		});

		if (arrayRef.length < INFINITE_SCROLL_STEP) setSearchScroll(false);
		setDataToRender(arrayRef.slice(0, INFINITE_SCROLL_STEP));
		setSearchResults(arrayRef);
	};

	// Handle Filter Change
	const addFilter = async (value, type) => {
		debugger;
		let industries = [...activeFilters, { value, label: value, type }];
		filterResults({ searchTerm, searchKey, filters: industries, filterKey: type });
		setactiveFilters(industries);
		await saveInCache(industries);
	};

	const removeFilter = async (value, type) => {
		let industries = activeFilters.filter((a) => a.value !== value);
		console.log(industries.length);
		if (industries.length === 0 && searchTerm === "") {
			resetSearch();
		} else {
			filterResults({ searchTerm, searchKey, filters: industries, filterKey: type });
		}

		setactiveFilters(industries);
		await saveInCache(industries);
	};

	// Filter State Varialbes
	const loadData = () => {
		if (searchTerm || activeFilters.length > 0) {
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

	//
	const handleSearchTermChange = (e) => {
		setSearchTerm(e.target.value);
		setSearchScroll(true);
		let searchTerm = e.target.value.toLowerCase().replace(/ /g, "");

		if (e.target.value === "" && activeFilters.length === 0) {
			resetSearch();
		} else {
			filterResults({ searchTerm, searchKey, filters: activeFilters, filterKey: "industries" });
		}
	};

	let scrollState = searchTerm || activeFilters.length > 0 ? searchScroll : scroll;
	let resultsTotal = searchTerm || activeFilters.length > 0 ? searchResults.length : allData.length;

	return (
		<>
			<Header search={{ handleSearchTermChange, searchTerm }} filters={{ filters, addFilter, removeFilter }} />
			<div className="flex flex-row mt-3 justify-between">
				<Results total={resultsTotal.toLocaleString("en-US")} />
				<ActiveFilters activeOptions={activeFilters} removeFilter={removeFilter} />
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
