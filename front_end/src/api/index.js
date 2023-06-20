import moment from "moment";
import localforage from "localforage";
import axios from "axios";

const CACHE_LAST_UPDATE_KEY = "jobspyder_last_update";
const CACHE_OBJECT_KEY = "jobspyder_cache";

async function loadFromCache() {
	let data = await localforage.getItem(CACHE_OBJECT_KEY);
	return JSON.parse(data);
}

async function loadFromApi(today_date) {
	let res = await axios.get("/api/v1/companies/");
	let roles = [];
	let industry_options = [];
	let departments = [];

	res.data.companies.forEach((company) => {
		// Create Roles & Departmetns List
		company.open_roles.forEach((role) => {
			if (departments.indexOf(role.department) === -1) departments.push(role.department);
			role = Object.assign(role, { company: company.name, logo: company.logo, industries: company.industries });
			roles.push(role);
		});

		// Create Unique Industries List
		company.industries.forEach((industry) => {
			let found = industry_options.find(({ value }) => value === industry);

			if (!found) {
				let object = { value: industry, label: industry, checked: false };
				industry_options.push(object);
			}
		});
	});

	debugger;
	industry_options.sort((a, b) => b - a);

	let industries = { id: "industries", name: "Industries", options: industry_options };
	let data = { companies: res.data.companies, roles, industries, departments };

	await localforage.setItem(CACHE_OBJECT_KEY, JSON.stringify(data));
	await localforage.setItem(CACHE_LAST_UPDATE_KEY, today_date);
	return data;
}

export async function loadData() {
	let today_date = moment().format("YYYY-MM-DD");
	let last_update = await localforage.getItem(CACHE_LAST_UPDATE_KEY);

	return await loadFromApi(today_date);

	if (today_date === last_update) {
		return await loadFromCache();
	} else {
		return await loadFromApi(today_date);
	}
}
