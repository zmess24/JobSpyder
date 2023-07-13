import moment from "moment";
import localforage from "localforage";
import axios from "axios";

/**
|--------------------------------------------------
| Cachey Keys
|--------------------------------------------------
*/

const CACHE_LAST_UPDATE_KEY = "jobspyder_last_update";
const CACHE_DATA_KEY = "jobspyder_cache";
const CACHE_SETTINGS_KEY = "jobspyder_settings_cache";

/**
|--------------------------------------------------
| Helper Functions
|--------------------------------------------------
*/

const loadCachedSettings = async () => {
	let settings = await localforage.getItem(CACHE_SETTINGS_KEY);
	return JSON.parse(settings);
};

const sortFilterOptions = (a, b) => {
	let aValue = a.value.split(" ")[0].toUpperCase();
	let bValue = b.value.split(" ")[0].toUpperCase();
	return aValue > bValue ? 1 : -1;
};

/**
|--------------------------------------------------
| Main API Functions
|--------------------------------------------------
*/

async function loadFromCache() {
	let rawData = await localforage.getItem(CACHE_DATA_KEY);
	let data = JSON.parse(rawData);
	let settings = await loadCachedSettings();
	settings = !settings ? [] : settings;
	return { ...data, settings };
}

async function loadFromApi(today_date) {
	let res = await axios.get("/api/v1/companies/");
	let roles = [];
	let industry_options = [];
	let department_options = [];
	let location_options = [];

	res.data.companies.forEach((company) => {
		// Create Roles & Departmetns List
		company.open_roles.forEach((role) => {
			let found = department_options.find(({ value }) => value === role.department);
			if (!found && role.department !== "") {
				let object = { value: role.department, label: role.department, checked: false };
				department_options.push(object);
			}

			let location = location_options.find(({ value }) => value === role.location);
			if (!location && role.location !== "") {
				let object = { value: role.location, label: role.location, checked: false };
				location_options.push(object);
			}

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

	debugger;
	// Sort Filter Options Alphabetically
	industry_options.sort(sortFilterOptions);
	department_options.sort(sortFilterOptions);

	let industries = { id: "industries", name: "Industries", options: industry_options };
	let departments = { id: "departments", name: "Departments", options: department_options };
	let data = { companies: res.data.companies, roles, filters: [industries, departments] };

	await localforage.setItem(CACHE_DATA_KEY, JSON.stringify(data));
	await localforage.setItem(CACHE_LAST_UPDATE_KEY, today_date);
	let settings = await loadCachedSettings();
	settings = !settings ? [] : settings;
	return { ...data, settings };
}

export async function loadData() {
	let today_date = moment().format("YYYY-MM-DD");
	let last_update = await localforage.getItem(CACHE_LAST_UPDATE_KEY);
	return await loadFromCache();
	// return today_date === last_update ? await loadFromCache() : await loadFromApi(today_date);
}

export async function saveInCache(settings) {
	await localforage.setItem(CACHE_SETTINGS_KEY, JSON.stringify(settings));
}
