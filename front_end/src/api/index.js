import moment from "moment";
import localforage from "localforage";
import axios from "axios";
import { filterOptionObject, settingsObject } from "../constants/data";

/**
|--------------------------------------------------
| Cachey Keys
|--------------------------------------------------
*/

const CACHE_LAST_UPDATE_KEY = "jobspyder_last_update";
const CACHE_DATA_KEY = "jobspyder_cache";
const CACHE_ACTIVE_FILTERS = "jobspyder_active_filters";

/**
|--------------------------------------------------
| Helper Functions
|--------------------------------------------------
*/

const sortFilterOptions = (a, b) => {
	let aValue = a.value.split(" ")[0].toUpperCase();
	let bValue = b.value.split(" ")[0].toUpperCase();
	return aValue > bValue ? 1 : -1;
};

export async function loadSavedFilters() {
	let results = await localforage.getItem(CACHE_ACTIVE_FILTERS);
	let activeFilters = results ? JSON.parse(results) : [];
	return activeFilters;
}

/**
|--------------------------------------------------
| Main API Functions
|--------------------------------------------------
*/

async function loadFromCache() {
	let rawData = await localforage.getItem(CACHE_DATA_KEY);
	let data = JSON.parse(rawData);
	let activeFilters = await loadSavedFilters();
	return { ...data, activeFilters };
}

async function loadFromApi(today_date) {
	let res = await axios.get("/api/v1/companies/");
	let roles = [];
	let industry_options = [];

	res.data.companies.forEach((company) => {
		// Create Roles & Departmetns List
		company.open_roles.forEach((role) => {
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

	// Sort Filter Options Alphabetically
	industry_options.sort(sortFilterOptions);

	let industries = { id: "industries", name: "Industries", options: industry_options };
	let data = { companies: res.data.companies, roles, filters: [industries] };

	// Set Cache
	await localforage.setItem(CACHE_DATA_KEY, JSON.stringify(data));
	await localforage.setItem(CACHE_LAST_UPDATE_KEY, today_date);

	// Load Saved Filters
	let activeFilters = await loadSavedFilters();
	activeFilters = activeFilters ? activeFilters : [];
	return { ...data, activeFilters };
}

export async function loadData() {
	let today_date = moment().format("YYYY-MM-DD");
	let last_update = await localforage.getItem(CACHE_LAST_UPDATE_KEY);
	return today_date === last_update ? await loadFromCache() : await loadFromApi(today_date);
}

export async function saveInCache(activeFilters) {
	await localforage.setItem(CACHE_ACTIVE_FILTERS, JSON.stringify(activeFilters));
}
