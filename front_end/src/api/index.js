import moment from "moment";
import localforage from "localforage";
import axios from "axios";

const CACHE_LAST_UPDATE_KEY = "jobspyder_last_update";
const CACHE_OBJECT_KEY = "jobspyder_cache";

export async function loadData() {
	let today_date = moment().format("YYYY-MM-DD");
	let last_update = await localforage.getItem(CACHE_LAST_UPDATE_KEY);

	if (today_date === last_update) {
		let data = await localforage.getItem(CACHE_OBJECT_KEY);
		return JSON.parse(data);
	} else {
		let res = await axios.get("/api/v1/companies/");
		let roles = [];
		let industry_categories = [];
		let departments = [];

		res.data.companies.forEach((company) => {
			// Create Roles & Departmetns List
			company.open_roles.forEach((role) => {
				if (departments.indexOf(role.department) === -1) departments.push(role.departement);
				role = Object.assign(role, { company: company.name, logo: company.logo, industries: company.industries });
				roles.push(role);
			});

			// Create Unique Industries List
			company.industries.forEach((industry) => {
				if (industry_categories.indexOf(industry) === -1) industry_categories.push(industry);
			});
		});
		let data = { companies: res.data.companies, roles, industry_categories, departments };
		await localforage.setItem(CACHE_OBJECT_KEY, JSON.stringify(data));
		await localforage.setItem(CACHE_LAST_UPDATE_KEY, today_date);

		return data;
	}
}
