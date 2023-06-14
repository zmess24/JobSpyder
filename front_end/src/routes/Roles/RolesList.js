import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RoleItem from "./RoleItem";
import Header from "../../components/Header";

export default function RolesList({ data }) {
	const INFINITE_SCROLL_STEP = 24;
	// Search State Varibles
	const [searchResults, setSearchResults] = useState([]);
	const [searchIndex, setSearchIndex] = useState(INFINITE_SCROLL_STEP);
	const [searchScroll, setSearchScroll] = useState(true);
	// Infinite Scroll State Variables
	const [allRoles] = useState(data);
	const [index, setIndex] = useState(INFINITE_SCROLL_STEP);
	const [scroll, setScroll] = useState(true);

	const [roles, setRoles] = useState(data.slice(0, INFINITE_SCROLL_STEP));
	const [searchTerm, setSearchTerm] = useState("");

	const loadRoles = () => {
		setIndex(index + INFINITE_SCROLL_STEP);
		let roleList = allRoles.slice(0, index + INFINITE_SCROLL_STEP);
		setRoles(roleList);
		if (roleList.length === allRoles.length) setScroll(false);
	};

	const loadSearchResults = () => {
		setSearchIndex(searchIndex + INFINITE_SCROLL_STEP);
		let roleList = searchResults.slice(0, searchIndex + INFINITE_SCROLL_STEP);
		setRoles(roleList);
		if (roleList.length === searchResults.length) setSearchScroll(false);
	};

	const handleSearchTermChange = (e) => {
		setSearchTerm(e.target.value);

		if (e.target.value == "") {
			setSearchResults([]);
			setSearchIndex(INFINITE_SCROLL_STEP);
			setRoles(data.slice(0, index));
		} else {
			let formatted_search = e.target.value.toLowerCase().replace(" ", "");

			let sliceIntoChunks = (arr, chunkSize) => {
				const res = [];
				for (let i = 0; i < arr.length; i += chunkSize) {
					let chunk = arr.slice(i, i + chunkSize);
					res.push(chunk);
				}
				return res;
			};

			let arrays = sliceIntoChunks(allRoles, 100);

			let arrayRef = [];

			arrays.forEach((array) => {
				let results = array.filter((role) => {
					let formatted_role = role.title.toLowerCase().replace(" ", "");
					return formatted_role.indexOf(formatted_search) > -1;
				});

				arrayRef = arrayRef.concat(results);
			});

			setRoles(arrayRef.slice(0, INFINITE_SCROLL_STEP));
			setSearchResults(arrayRef);
		}
	};

	let nextLoader = searchTerm ? loadSearchResults : loadRoles;
	let scrollState = searchTerm ? searchScroll : scroll;
	return (
		<>
			<Header search={{ handleSearchTermChange, searchTerm }} />
			<InfiniteScroll dataLength={roles.length} next={nextLoader} hasMore={scrollState} loader={<p>Loading...</p>}>
				<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{roles &&
						roles.map((role) => {
							return <RoleItem role={role} />;
						})}
				</ul>
			</InfiniteScroll>
		</>
	);
}
