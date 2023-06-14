import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import JobItem from "../../components/JobList/JobItem";
import Header from "../../components/Header";

export default function RolesList({ data }) {
	const INFINITE_SCROLL_STEP = 24;
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

	const fil = (fn, a) => {
		const f = []; //final
		debugger;
		for (let i = 0; i < a.length; i++) {
			if (fn(a[i])) {
				debugger;
				f.push(a[i]);
			}
		}
		return f;
	};

	const handleSearchTermChange = (e) => {
		if (e.target.value == "") {
			setSearchTerm(e.target.value);
			setRoles(allRoles.slice(0, index));
		} else {
			setSearchTerm(e.target.value);
			let formatted_search = searchTerm.toLowerCase().replace(" ", "");
			let filtered = allRoles.filter((role) => {
				let formatted_role = role.title.toLowerCase().replace(" ", "");
				return formatted_role.indexOf(formatted_search) > -1;
			});

			// let filtered = fil((role) => {
			// 	let formatted_role = role.title.toLowerCase().replace(" ", "");
			// 	return formatted_role.indexOf(formatted_search) > -1;
			// }, allRoles);

			filtered.length < INFINITE_SCROLL_STEP ? setScroll(false) : setScroll(true);
			setRoles(filtered);
		}
	};

	return (
		<>
			<Header search={{ handleSearchTermChange, searchTerm }} />
			<InfiniteScroll dataLength={roles.length} next={loadRoles} hasMore={scroll} loader={<p>Loading...</p>}>
				<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{roles &&
						roles.map((role) => {
							return <JobItem job={role} />;
						})}
				</ul>
			</InfiniteScroll>
		</>
	);
}
