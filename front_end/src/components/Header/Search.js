import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Search({ handleChange, searchTerm, placeholder }) {
	return (
		<div className="flex lg:flex-row justify-start sm:flex-row md:w-1/2 ">
			<div className="w-4/5 max-w-lg lg:max-w-xs">
				<label htmlFor="search" className="sr-only">
					Search
				</label>
				<div className="relative">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
					<input
						id="search"
						name="search"
						className="block w-full rounded-md border-0 bg-white pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						placeholder={placeholder}
						type="search"
						onChange={handleChange}
						value={searchTerm}
					/>
				</div>
			</div>
			<button
				href="#"
				className="w-1/5 ml-6 justify-center inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Save Search
			</button>
		</div>
	);
}
