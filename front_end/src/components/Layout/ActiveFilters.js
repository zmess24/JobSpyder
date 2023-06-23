import React from "react";
import styles from "../../constants/styles";

export default function ActiveFilters({ activeOptions, removeFilter }) {
	debugger;
	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-7xl px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
				<p className="text-sm font-medium text-gray-500">
					Filters
					<span className="sr-only">, active</span>
				</p>

				<div aria-hidden="true" className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

				<div className="sm:ml-4 sm:mt-0">
					<div className="flex flex-wrap items-center">
						{activeOptions.map((activeFilter) => (
							<span
								key={activeFilter.value}
								className={`m-1 inline-flex items-center rounded-full border py-1.5 pl-3 pr-2 text-sm font-medium ${
									activeFilter.type === "industries" ? styles.industryTagColors : styles.departmentTagColors
								}`}
							>
								<span>{activeFilter.label}</span>
								<button
									type="button"
									onClick={() => removeFilter(activeFilter.value)}
									className={`ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 ${
										activeFilter.type === "industries" ? styles.industryTagExitColors : styles.departmentTagExitColors
									}`}
								>
									<span className="sr-only">Remove filter for {activeFilter.label}</span>
									<svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
										<path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
									</svg>
								</button>
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
