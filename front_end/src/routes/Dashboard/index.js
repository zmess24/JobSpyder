// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "../Roles/RoleItem";
import ListLayout from "../../components/Layout/ListLayout";
import styles from "../../constants/styles";
import { filterResults } from "../../constants/utlitiies";

export default function Dashboard() {
	let {
		JobSpyderData: { roles, filters, activeFilters },
	} = useOutletContext();

	let filteredData = [];

	if (activeFilters.length > 0) {
		filteredData = filterResults({
			searchTerm: "",
			searchKey: "title",
			filters: activeFilters,
			dataSet: roles,
		});
	}

	return (
		<ListLayout
			data={roles}
			filteredData={filteredData}
			ListItemComponent={RoleItem}
			layoutCSS={styles.rolesLayout}
			searchKey={"title"}
			filters={filters}
			cachedFilters={activeFilters}
			cacheOn={true}
		/>
	);
}
