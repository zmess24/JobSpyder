// Importing modules
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import CompanyList from "../components/CompanyList";
import axios from "axios";
import { Outlet, Link, useLoaderData, useNavigation } from "react-router-dom";
import localforage from "localforage";

export async function loader() {
	try {
		let res = await axios.get("/api/v1/companies/");
		return { companies: res.data.companies };
	} catch (err) {
		console.error(err.message);
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
