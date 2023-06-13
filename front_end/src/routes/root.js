// Importing modules
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CompanyList from "../components/CompanyList";
import axios from "axios";
import { useLoaderData, useNavigation } from "react-router-dom";
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
	} catch (err) {
		console.error();
	}
}

export default function Root() {
	const { companies } = useLoaderData();
	const navigation = useNavigation();

	return (
		<>
			<CompanyList companies={companies} />
			<ul>
				{companies.length > 0 &&
					companies.map((company) => {
						return <li key={company._id}>{company.name}</li>;
					})}
			</ul>
		</>
	);
}
