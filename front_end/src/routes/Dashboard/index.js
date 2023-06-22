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
		JobSpyderData: { roles, industries, departments, settings },
	} = useOutletContext();

	if (settings.length > 0) {
		fileredResults = filterResults({ searchTerm: "", searchKey: "title", filters: settings, filterKey: "industries", dataSet: roles });
	}

	return (
		<ListLayout
			data={roles}
			filteredData={fileredResults}
			filters={{ industries, departments }}
			ListItemComponent={RoleItem}
			layoutCSS={styles.rolesLayout}
			searchKey={"title"}
			settings={settings ? settings : []}
		/>
	);
}
