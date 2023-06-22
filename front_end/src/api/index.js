import moment from "moment";
import localforage from "localforage";
import axios from "axios";

const CACHE_LAST_UPDATE_KEY = "jobspyder_last_update";
const CACHE_DATA_KEY = "jobspyder_cache";
const CACHE_SETTINGS_KEY = "jobspyder_settings_cache";

async function loadFromCache() {
	let data = await localforage.getItem(CACHE_DATA_KEY);
	let settings = await localforage.getItem(CACHE_SETTINGS_KEY);
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

			if (!found && industry !== "") {
				let object = { value: industry, label: industry, checked: false };
				industry_options.push(object);
			}
		});
	});

	industry_options.sort((a, b) => {
		let aValue = a.value.split(" ")[0].toUpperCase();
		let bValue = b.value.split(" ")[0].toUpperCase();
		return aValue > bValue ? 1 : -1;
	});

	let industries = { id: "industries", name: "Industries", options: industry_options };
	let data = { companies: res.data.companies, roles, industries, departments };

	await localforage.setItem(CACHE_DATA_KEY, JSON.stringify(data));
	await localforage.setItem(CACHE_LAST_UPDATE_KEY, today_date);
	return data;
}

export async function loadData() {
	let today_date = moment().format("YYYY-MM-DD");
	let last_update = await localforage.getItem(CACHE_LAST_UPDATE_KEY);

	if (today_date === last_update) {
		return await loadFromCache();
	} else {
		return await loadFromApi(today_date);
	}
}
