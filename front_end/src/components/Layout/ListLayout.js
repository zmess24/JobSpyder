import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Results from "./Results";
import ActiveFilters from "./ActiveFilters";
import Header from "../Header";
import { saveInCache } from "../../api";
import { filterResults, updateFilters } from "../../constants/utlitiies";

export default function ListLayout({ data, ListItemComponent, layoutCSS, filters, cachedFilters, filteredData, searchKey, cacheOn }) {
	const INFINITE_SCROLL_STEP = 24;
	const [allData] = useState(data);

	// Search State Varibles
	const [searchResults, setSearchResults] = useState(filteredData);
	const [searchIndex, setSearchIndex] = useState(INFINITE_SCROLL_STEP);
	const [searchScroll, setSearchScroll] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	// Industry Filter State Varibles
	const [activeFilters, setActiveFilters] = useState(cachedFilters);
	const [allFilters, setAllFilters] = useState(
		cachedFilters.length > 0 ? updateFilters({ activeFilters: cachedFilters, allFilters: filters }) : filters
	);

	// Infinite Scroll State Variables
	const [index, setIndex] = useState(INFINITE_SCROLL_STEP);
	const [scroll, setScroll] = useState(true);
	const [dataToRender, setDataToRender] = useState(
		cachedFilters.length > 0 ? filteredData.slice(0, INFINITE_SCROLL_STEP) : data.slice(0, INFINITE_SCROLL_STEP)
	);

	// HELPER FUNCTIONS
	const resetSearch = () => {
		setSearchResults([]);
		setSearchIndex(INFINITE_SCROLL_STEP);
		setDataToRender(allData.slice(0, index));
	};

	// Handle Filter Change
	const addFilter = async (value, type) => {
		let filters = [...activeFilters, { value, label: value, type }];
		let filteredResults = filterResults({ searchTerm, searchKey, filters, dataSet: allData });
		let updatedFilters = updateFilters({ activeFilters: filters, allFilters });
		filteredResults.length < INFINITE_SCROLL_STEP ? setSearchScroll(false) : setSearchScroll(true);
		setDataToRender(filteredResults.slice(0, INFINITE_SCROLL_STEP));
		setSearchResults(filteredResults);
		setActiveFilters(filters);
		setAllFilters(updatedFilters);

		if (cacheOn) await saveInCache(filters);
	};

	const removeFilter = async (value, type) => {
		let filters = activeFilters.filter((a) => a.value !== value);
		let updatedFilters = updateFilters({ activeFilters: filters, allFilters });
		setAllFilters(updatedFilters);
		if (filters.length === 0 && searchTerm === "") {
			resetSearch();
		} else {
			let filteredResults = filterResults({ searchTerm, searchKey, filters, dataSet: allData });
			filteredResults.length < INFINITE_SCROLL_STEP ? setSearchScroll(false) : setSearchScroll(true);
			setDataToRender(filteredResults.slice(0, INFINITE_SCROLL_STEP));
			setSearchResults(filteredResults);
		}

		setActiveFilters(filters);
		if (cacheOn) await saveInCache(filters);
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
		let newFilter = { value: e.target.value.toLowerCase().replace(/ /g, ""), label: e.target.value, type: "search" };
		let filters = [...activeFilters, newFilter];
		if (e.target.value === "" && activeFilters.length === 0) {
			resetSearch();
		} else {
			let filteredResults = filterResults({ searchKey, filters, dataSet: allData });
			if (filteredResults.length < INFINITE_SCROLL_STEP) setSearchScroll(false);
			setDataToRender(filteredResults.slice(0, INFINITE_SCROLL_STEP));
			setSearchResults(filteredResults);
		}
	};

	const saveSearchTerm = async () => {
		if (searchTerm === "") return;
		let newFilter = { value: searchTerm.toLowerCase().replace(/ /g, ""), label: searchTerm, type: "search" };
		let filters = [...activeFilters, newFilter];
		setSearchTerm("");
		setActiveFilters(filters);

		if (cacheOn) await saveInCache(filters);
	};

	// Chose which results list to use depending on if there is an active search
	let scrollState = searchTerm || activeFilters.length > 0 ? searchScroll : scroll;
	let resultsTotal = searchTerm || activeFilters.length > 0 ? searchResults.length : allData.length;

	return (
		<section className="px-4">
			<Header search={{ handleSearchTermChange, saveSearchTerm, searchTerm }} filters={{ filters: allFilters, addFilter, removeFilter }} />
			<div className="flex flex-row mt-3 justify-between">
				<Results total={resultsTotal.toLocaleString("en-US")} />
				<ActiveFilters activeOptions={activeFilters} removeFilter={removeFilter} />
			</div>
			<InfiniteScroll dataLength={dataToRender.length} next={loadData} hasMore={scrollState} loader={<span>...</span>}>
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
