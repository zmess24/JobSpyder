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
	const [dataToRender, setDataToRender] = useState(
		settings.length > 0 ? filteredData.slice(0, INFINITE_SCROLL_STEP) : data.slice(0, INFINITE_SCROLL_STEP)
	);

	const resetSearch = () => {
		setSearchResults([]);
		setSearchIndex(INFINITE_SCROLL_STEP);
		setDataToRender(allData.slice(0, index));
	};

	// Handle Filter Change
	const addFilter = async (value, type) => {
		let filters = [...activeFilters, { value, label: value, type }];
		let filteredResults = filterResults({ searchTerm, searchKey, filters, dataSet: allData });
		if (filteredResults.length < INFINITE_SCROLL_STEP) setSearchScroll(false);
		setDataToRender(filteredResults.slice(0, INFINITE_SCROLL_STEP));
		setSearchResults(filteredResults);

		setactiveFilters(filters);
		if (settings) await saveInCache(filters);
	};

	const removeFilter = async (value) => {
		let filters = activeFilters.filter((a) => a.value !== value);
		if (filters.length === 0 && searchTerm === "") {
			resetSearch();
		} else {
			let filteredResults = filterResults({ searchTerm, searchKey, filters, dataSet: allData });
			if (filteredResults.length < INFINITE_SCROLL_STEP) setSearchScroll(false);
			setDataToRender(filteredResults.slice(0, INFINITE_SCROLL_STEP));
			setSearchResults(filteredResults);
		}

		setactiveFilters(filters);
		if (settings) await saveInCache(filters);
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

	const handleSearchTermChange = (e) => {
		setSearchTerm(e.target.value);
		setSearchScroll(true);
		let searchTerm = e.target.value.toLowerCase().replace(/ /g, "");

		if (e.target.value === "" && activeFilters.length === 0) {
			resetSearch();
		} else {
			let filteredResults = filterResults({ searchTerm, searchKey, filters: activeFilters, dataSet: allData });
			if (filteredResults.length < INFINITE_SCROLL_STEP) setSearchScroll(false);
			setDataToRender(filteredResults.slice(0, INFINITE_SCROLL_STEP));
			setSearchResults(filteredResults);
		}
	};

	let scrollState = searchTerm || activeFilters.length > 0 ? searchScroll : scroll;
	let resultsTotal = searchTerm || activeFilters.length > 0 ? searchResults.length : allData.length;

	return (
		<section className="px-4">
			<Header search={{ handleSearchTermChange, searchTerm }} filters={{ filters, addFilter, removeFilter }} />
			<div className="flex flex-row mt-3 justify-between">
				<Results total={resultsTotal.toLocaleString("en-US")} />
				<ActiveFilters activeOptions={activeFilters} removeFilter={removeFilter} />
			</div>
			<InfiniteScroll dataLength={dataToRender.length} next={loadData} hasMore={scrollState} loader={<p>Loading...</p>}>
				<ul className={layoutCSS}>
					{dataToRender &&
						dataToRender.map((role) => {
							return <ListItemComponent data={role} />;
						})}
				</ul>
			</InfiniteScroll>
		</section>
	);
}
