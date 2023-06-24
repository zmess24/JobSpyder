// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import ListLayout from "../../components/Layout/ListLayout";
import CompanyItem from "./CompanyItem";
import styles from "../../constants/styles";

export default function Companies() {
	const {
		JobSpyderData: { companies, filters },
	} = useOutletContext();

	return (
		<ListLayout
			data={companies}
			ListItemComponent={CompanyItem}
			layoutCSS={styles.companiesLayout}
			filters={filters}
			searchKey={"name"}
			settings={[]}
		/>
	);
}
