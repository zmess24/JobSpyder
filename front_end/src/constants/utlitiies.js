export function filterResults({ searchTerm, searchKey, filters, filterKey, dataSet }) {
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

	arrays.forEach((array) => {
		let results = array.filter((data) => {
			let formatted_role = data[searchKey].toLowerCase().replace(/ /g, "");

			if (filters.length > 0) {
				let filterFound = filters.find(({ value }) => data[filterKey].indexOf(value) > -1);
				return filterFound ? formatted_role.indexOf(searchTerm) > -1 : false;
			} else {
				return formatted_role.indexOf(searchTerm) > -1;
			}
		});

		console.log(results);
		arrayRef = arrayRef.concat(results);
	});

	return arrayRef;
}
