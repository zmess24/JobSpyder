// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "../../Roles/RoleItem";
import ListLayout from "../../../components/Layout/ListLayout";
import CompanyHeader from "./CompanyHeader";
import styles from "../../../constants/styles";
import ErrorPage from "../../../error-page";

export default function Company() {
	const {
		JobSpyderData: { companies, filters },
	} = useOutletContext();

	let filter = filters.find((filter) => filter.id === "departments");
	let companyId = "_" + window.location.pathname.split("_")[1];
	let company = companies.find((c) => c._id === companyId);

	debugger;
	if (!company) return <ErrorPage />;

	return (
		<>
			<CompanyHeader company={company} />
			<ListLayout
				data={company.open_roles}
				filteredData={[]}
				ListItemComponent={RoleItem}
				layoutCSS={styles.rolesLayout}
				searchKey={"title"}
				filters={[filter]}
				cachedFilters={[]}
			/>
		</>
	);
}
