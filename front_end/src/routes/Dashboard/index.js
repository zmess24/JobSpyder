// Importing modules
import React from "react";
import { useOutletContext } from "react-router-dom";
import RoleItem from "./RoleItem";
import ListLayout from "../../components/Layout/ListLayout";

export default function Dashboard() {
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 pb-10";

	const {
		JobSpyderData: { roles, industries, departments },
	} = useOutletContext();

	return <ListLayout data={roles} filters={{ industries, departments }} ListItemComponent={RoleItem} layoutCSS={layoutCSS} enableCache={true} />;
}
