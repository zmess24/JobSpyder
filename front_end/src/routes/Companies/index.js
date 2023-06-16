// Importing modules
import React from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import localforage from "localforage";
import moment from "moment/moment";
import ListLayout from "../../components/Layout/ListLayout";
import CompanyItem from "./CompanyItem";

export async function loader() {
	try {
		let today_date = moment().format("YYYY-MM-DD");
		let last_update = await localforage.getItem("jobspyder_last_update");
		if (today_date === last_update) {
			let companies = await localforage.getItem("jobspyder_companies");
			return { companies };
		} else {
			let res = await axios.get("/api/v1/companies/");
			await localforage.setItem("jobspyder_companies", res.data.companies);
			await localforage.setItem("jobspyder_last_update", today_date);
			return { companies: res.data.companies };
		}
	} catch (err) {
		console.error();
	}
}

export default function Companies() {
	const { companies } = useLoaderData();
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 pb-10 bg-gray-100";
	return <ListLayout data={companies} ListItemComponent={CompanyItem} layoutCSS={layoutCSS} searchKey={"name"} />;
}
