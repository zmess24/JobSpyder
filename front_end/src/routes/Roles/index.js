// Importing modules
import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import localforage from "localforage";
import moment from "moment/moment";
import RoleItem from "./RoleItem";
import ListLayout from "../../components/Layout/ListLayout";

export async function loader() {
	try {
		let today_date = moment().format("YYYY-MM-DD");
		let last_update = await localforage.getItem("jobspyder_last_update");
		if (today_date === last_update) {
			let companies = await localforage.getItem("jobspyder_companies");
			let roles = [];
			companies.forEach((company) => {
				company.open_roles.forEach((role) => {
					role = Object.assign(role, { company: company.name, logo: company.logo });
					roles.push(role);
				});
			});
			return { roles };
		} else {
			let res = await axios.get("/api/v1/companies/");
			await localforage.setItem("jobspyder_companies", res.data.companies);
			await localforage.setItem("jobspyder_last_update", today_date);
			let roles = [];
			res.data.companies.forEach((company) => {
				company.open_roles.forEach((role) => {
					role = Object.assign(role, { company: company.name, logo: company.logo });
					roles.push(role);
				});
			});
			await localforage.setItem("jobspyder_roles", roles);
			return { roles };
		}
	} catch (err) {
		console.error();
	}
}

export default function Roles() {
	const { roles } = useLoaderData();
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 pb-10";

	return <ListLayout data={roles} ListItemComponent={RoleItem} layoutCSS={layoutCSS} searchKey={"title"} />;
}
