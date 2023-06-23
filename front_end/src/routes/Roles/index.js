// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "./RoleItem";
import ListLayout from "../../components/Layout/ListLayout";
import styles from "../../constants/styles";

export default function Roles() {
	const {
		JobSpyderData: { roles, filters },
	} = useOutletContext();

	return (
		<ListLayout
			data={roles}
			filteredData={[]}
			filters={filters}
			ListItemComponent={RoleItem}
			layoutCSS={styles.rolesLayout}
			searchKey={"title"}
			settings={[]}
		/>
	);
}
