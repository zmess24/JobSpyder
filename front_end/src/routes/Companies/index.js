// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import ListLayout from "../../components/Layout/ListLayout";
import CompanyItem from "./CompanyItem";

export default function Companies() {
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 pb-10 bg-gray-100";
	const {
		JobSpyderData: { companies, roles, industries, departments },
	} = useOutletContext();

	return (
		<ListLayout data={companies} ListItemComponent={CompanyItem} layoutCSS={layoutCSS} filters={{ industries, departments }} searchKey={"name"} />
	);
}
