import React from "react";

const stats = [
	{ label: "Vacation days left", value: 12 },
	{ label: "Sick days left", value: 4 },
	{ label: "Personal days left", value: 2 },
];

export default function CompanyHeader({ company }) {
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow mb-5">
			<h2 className="sr-only" id="profile-overview-title">
				Profile Overview
			</h2>
			<div className="bg-white p-6">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div className="sm:flex sm:space-x-5">
						<div className="flex-shrink-0">
							<img className="mx-auto h-20 w-20 rounded-full" src={company.logo} alt="" />
						</div>
						<div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
							<p className="text-xl font-bold text-gray-900 sm:text-3xl">{company.name}</p>
							<dd className="mt-3">
								{company.industries.map((industry) => {
									return (
										<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 mx-1 my-0.5">
											{industry}
										</span>
									);
								})}
							</dd>
						</div>
					</div>
					<div className="mt-5 flex justify-center sm:mt-0">
						<a
							href={company.company_link}
							target="_blank"
							className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>
							Company Website
						</a>
					</div>
				</div>
			</div>
			<div className="px-6 py-5 text-center text-sm font-medium divide-gray-200 border-t border-gray-200 bg-gray-50">
				<span className="text-gray-900">{company.open_roles.length}</span> <span className="text-gray-600">Open Roles</span>
			</div>
		</div>
	);
}
