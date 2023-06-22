// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "../Roles/RoleItem";
import ListLayout from "../../components/Layout/ListLayout";
import styles from "../../constants/styles";
import { filterResults } from "../../constants/utlitiies";

export default function Dashboard() {
	let {
		JobSpyderData: { roles, industries, departments, settings },
	} = useOutletContext();

	if (settings.length > 0) {
		roles = filterResults({ searchTerm: "", searchKey: "title", filters: settings, filterKey: "industries", dataSet: roles });
	}

	return (
		<ListLayout
			data={roles}
			filters={{ industries, departments }}
			ListItemComponent={RoleItem}
			layoutCSS={styles.rolesLayout}
			enableCache={true}
			settings={settings ? settings : []}
		/>
	);
}
