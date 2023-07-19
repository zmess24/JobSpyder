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

	let copiedFilters = JSON.parse(JSON.stringify(filters));
	let companyFilter = copiedFilters.find((filter) => filter.id === "industries");

	debugger;

	return (
		<ListLayout
			data={companies}
			filteredData={[]}
			ListItemComponent={CompanyItem}
			layoutCSS={styles.companiesLayout}
			searchKey={"name"}
			filters={[companyFilter]}
			cachedFilters={[]}
		/>
	);
}
