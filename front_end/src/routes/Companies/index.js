// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import ListLayout from "../../components/Layout/ListLayout";
import CompanyItem from "./CompanyItem";

export default function Companies() {
	const { JobSpyderData } = useOutletContext();
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 pb-10 bg-gray-100";

	return <ListLayout data={JobSpyderData.companies} ListItemComponent={CompanyItem} layoutCSS={layoutCSS} searchKey={"name"} />;
}
