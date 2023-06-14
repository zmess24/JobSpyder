// Importing modules
import React from "react";
import CompanyList from "../../components/CompanyList";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import localforage from "localforage";
import moment from "moment/moment";

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
		// let res = await axios.get("/api/v1/companies/");
		// await localforage.setItem("jobspyder_companies", res.data.companies);
		// await localforage.setItem("jobspyder_last_update", today_date);
		// return { companies: res.data.companies };
	} catch (err) {
		console.error();
	}
}

export default function Companies() {
	const { companies } = useLoaderData();

	return <CompanyList data={companies} />;
}
