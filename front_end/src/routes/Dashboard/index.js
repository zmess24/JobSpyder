// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "../Roles/RoleItem";
import ListLayout from "../../components/Layout/ListLayout";
import styles from "../../constants/styles";
import { filterResults } from "../../constants/utlitiies";

export default function Dashboard() {
	let filteredData = [];

	let {
		JobSpyderData: { roles, filters, settings },
	} = useOutletContext();

	if (settings.activeFilters.length > 0) {
		filteredData = filterResults({
			searchTerm: "",
			searchKey: "title",
			filters: settings.activeFilters,
			dataSet: roles,
		});
	}

	debugger;

	return (
		<ListLayout
			data={roles}
			filteredData={filteredData}
			ListItemComponent={RoleItem}
			layoutCSS={styles.rolesLayout}
			searchKey={"title"}
			settings={settings ? settings : { activeFilters: [], allFilters: filters }}
			cacheOn={true}
		/>
	);
}
