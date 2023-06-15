// Importing modules
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JobItem from "./JobItem";
import ListLayout from "../../../components/Layout/ListLayout";
import CompanyHeader from "./CompanyHeader";

export default function Company() {
	let { state } = useLocation();
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 pb-10";
	return (
		<>
			<CompanyHeader company={state.data} />
			<ListLayout data={state.data.open_roles} ListItemComponent={JobItem} layoutCSS={layoutCSS} searchKey={"title"} />
		</>
	);
}
