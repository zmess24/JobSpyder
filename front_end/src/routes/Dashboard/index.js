// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "../Roles/RoleItem";
import ListLayout from "../../components/Layout/ListLayout";
import styles from "../../constants/styles";
import { filterResults } from "../../constants/utlitiies";

export default function Dashboard() {
	let fileredResults = [];

	let {
		JobSpyderData: { roles, filters, settings },
	} = useOutletContext();

	if (settings.length > 0) {
		fileredResults = filterResults({ searchTerm: "", searchKey: "title", filters: settings, filterKey: "industries", dataSet: roles });
	}

	return (
		<ListLayout
			data={roles}
			filteredData={fileredResults}
			filters={filters}
			ListItemComponent={RoleItem}
			layoutCSS={styles.rolesLayout}
			searchKey={"title"}
			settings={settings ? settings : []}
		/>
	);
}
