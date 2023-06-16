// Importing modules
import React, { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "./RoleItem";
import LoadingItem from "../../components/Layout/LoadingItem";
import ListLayout from "../../components/Layout/ListLayout";
import { loadRoles } from "../../api";

export default function Roles() {
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 pb-10";
	const { JobSpyderData } = useOutletContext();
	debugger;
	return (
		<ListLayout
			data={JobSpyderData.roles}
			filters={JobSpyderData.industry_categories}
			ListItemComponent={RoleItem}
			layoutCSS={layoutCSS}
			searchKey={"title"}
		/>
	);
}
