import React from "react";
import CompanyItem from "./CompanyItem";

export default function CompanyList({ companies }) {
	return (
		<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 bg-gray-100">
			{companies &&
				companies.map((company) => {
					return <CompanyItem company={company} />;
				})}
		</ul>
	);
}
