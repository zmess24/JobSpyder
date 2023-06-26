/**
|--------------------------------------------------
| Helper Functions
|--------------------------------------------------
*/

const splitFiltersByType = (filters) => {
	let departments = [];
	let industries = [];

	filters.forEach((filterObj) => {
		filterObj.type === "departments" ? departments.push(filterObj) : industries.push(filterObj);
	});

	return { departments, industries };
};

/**
|--------------------------------------------------
| Main Utility Functions
|--------------------------------------------------
*/

export function filterResults({ searchTerm, searchKey, filters, dataSet }) {
	// Slicing Function
	let sliceIntoChunks = (arr, chunkSize) => {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			let chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	};

	let arrays = sliceIntoChunks(dataSet, 100);
	let arrayRef = [];
	let { departments, industries } = splitFiltersByType(filters);

	arrays.forEach((array) => {
		let results = array.filter((data) => {
			let formatted_role = data[searchKey].toLowerCase().replace(/ /g, "");
			if (filters.length > 0) {
				let industryFound = industries.length > 0 ? industries.find(({ value }) => data.industries.indexOf(value) > -1) : true;
				let departmentFound = departments.length > 0 ? departments.find(({ value }) => data.department === value) : true;

				return industryFound && departmentFound ? formatted_role.indexOf(searchTerm) > -1 : false;
			} else {
				return formatted_role.indexOf(searchTerm) > -1;
			}
		});

		arrayRef = arrayRef.concat(results);
	});

	return arrayRef;
}
