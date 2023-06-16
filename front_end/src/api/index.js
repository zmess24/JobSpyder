import moment from "moment";
import localforage from "localforage";
import axios from "axios";

export async function loadRoles() {
	let today_date = moment().format("YYYY-MM-DD");
	let last_update = await localforage.getItem("jobspyder_last_update");

	try {
		if (today_date === last_update) {
			let roles = await localforage.getItem("jobspyder_roles");
			let industry_categories = await localforage.getItem("jobspyder_industry_categories");
			let departments = await localforage.getItem("jobspyder_role_departments");
			return { roles, industry_categories, departments };
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

			await localforage.setItem("jobspyder_roles", roles);
			await localforage.setItem("jobspyder_industry_categories", industry_categories);
			await localforage.setItem("jobspyder_role_departments", departments);
			return { roles, industry_categories, departments };
		}
	} catch (err) {
		console.error(err);
	}
}
