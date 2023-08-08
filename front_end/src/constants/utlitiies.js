/**
|--------------------------------------------------
| Helper Functions
|--------------------------------------------------
*/

const splitFiltersByType = (filters) => {
	let searchTerms = [];
	let industries = [];

	filters.forEach((filterObj) => {
		switch (filterObj.type) {
			case "industries":
				industries.push(filterObj);
				break;
			case "search":
				searchTerms.push(filterObj);
				break;
			default:
				break;
		}
	});

	return { searchTerms, industries };
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
	let { industries, searchTerms } = splitFiltersByType(filters);

	arrays.forEach((array) => {
		let results = array.filter((data) => {
			let formatted_role = data[searchKey].toLowerCase().replace(/ /g, "");
			if (industries.length > 0) {
				let industryFound = industries.length > 0 ? industries.find(({ value }) => data.industries.indexOf(value) > -1) : true;
				return industryFound ? searchTerms.find(({ value }) => formatted_role.indexOf(value) > -1) : false;
			} else {
				return searchTerms.find(({ value }) => formatted_role.indexOf(value) > -1);
			}
		});

		arrayRef = arrayRef.concat(results);
	});

	return arrayRef;
}

export const updateFilters = ({ activeFilters, allFilters }) => {
	// Create Deep Copy of Filters Object
	let copiedFilters = JSON.parse(JSON.stringify(allFilters));

	activeFilters.forEach((f) => {
		if (f.type !== "search") {
			let industryIndex = copiedFilters.findIndex((o) => o.id === f.type);
			let optionIndex = copiedFilters[industryIndex].options.findIndex((o) => o.value === f.value);
			copiedFilters[industryIndex].options[optionIndex].checked = !copiedFilters[industryIndex].options[optionIndex].checked;
		}
	});

	return copiedFilters;
};
