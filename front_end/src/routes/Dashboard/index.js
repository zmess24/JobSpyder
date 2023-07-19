// Importing modules
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "../Roles/RoleItem";
import ListLayout from "../../components/Layout/ListLayout";
import styles from "../../constants/styles";
import { filterResults } from "../../constants/utlitiies";
import { loadSavedFilters } from "../../api";

export default function Dashboard() {
	let {
		JobSpyderData: { roles, filters, activeFilters },
	} = useOutletContext();

	const [cachedFilters, setCachedFilters] = useState(activeFilters);

	let filteredData = [];

	if (activeFilters.length > 0) {
		filteredData = filterResults({
			searchTerm: "",
			searchKey: "title",
			filters: activeFilters,
			dataSet: roles,
		});
	}

	// useEffect(async () => {
	// 	const loadActiveFilters = async () => {
	// 		return await loadSavedFilters();
	// 	};

	// 	let filters = await loadActiveFilters();
	// 	setCachedFilters(filters);
	// }, []);

	return (
		<ListLayout
			data={roles}
			filteredData={filteredData}
			ListItemComponent={RoleItem}
			layoutCSS={styles.rolesLayout}
			searchKey={"title"}
			filters={filters}
			cachedFilters={cachedFilters}
			cacheOn={true}
		/>
	);
}
