// Importing modules
import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import localforage from "localforage";
import moment from "moment/moment";
import RoleItem from "./RoleItem";
import ListLayout from "../../components/Layout/ListLayout";

export async function loader() {
	let today_date = moment().format("YYYY-MM-DD");
	let last_update = await localforage.getItem("jobspyder_last_update");

	try {
		if (today_date === last_update) {
			let roles = await localforage.getItem("jobspyder_roles");
			let industry_categories = await localforage.getItem("jobspyder_industry_categories");
			return { roles, industry_categories };
		} else {
			let res = await axios.get("/api/v1/companies/");
			let roles = [];
			let industry_categories = [];

			res.data.companies.forEach((company) => {
				company.open_roles.forEach((role) => {
					role = Object.assign(role, { company: company.name, logo: company.logo, industries: company.industries });
					roles.push(role);
				});

				company.industries.forEach((industry) => {
					if (industry_categories.indexOf(industry) === -1) industry_categories.push(industry);
				});
			});

			await localforage.setItem("jobspyder_roles", roles);
			await localforage.setItem("jobspyder_industry_categories", industry_categories);
			return { roles, industry_categories };
		}
	} catch (err) {
		console.error();
	}
}

export default function Roles() {
	const { roles, industry_categories } = useLoaderData();
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 pb-10";

	return <ListLayout data={roles} filters={industry_categories} ListItemComponent={RoleItem} layoutCSS={layoutCSS} searchKey={"title"} />;
}
