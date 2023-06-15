// Importing modules
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Stats from "../../../components/Stats";
import JobList from "../../../components/JobList";
import CompanyHeader from "../../../components/CompanyList/CompanyHeader";

export default function Company() {
	let location = useLocation();

	return (
		<>
			<CompanyHeader company={location.state.data} />
			<JobList roles={location.state.data.open_roles} />
		</>
	);
}
