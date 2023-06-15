import React, { Fragment } from "react";
import { LinkIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

export default function RoleItem({ data, keyValue }) {
	return (
		<li key={keyValue} className="col-span-1 rounded-lg bg-white shadow">
			<div className="flex items-center gap-x-4 bg-white px-6 pt-6 pb-3">
				<img src={data.logo} alt={data.title} className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
				<div className="flex flex-col truncate">
					<div className="truncate text-sm font-medium leading-6 text-gray-900 ">{data.title}</div>
					<div className="mt-1 truncate text-sm text-gray-500">{data.company}</div>
					<div className="mt-1 truncate text-sm text-gray-500">{data.location}</div>
				</div>
			</div>
			<div className="flex items-center gap-x-4 divide-y divide-gray-200 border-b border-gray-900/7 bg-white px-6">
				<dl className="mt-1 flex flex-grow flex-col justify-between">
					<dt className="sr-only">Industries</dt>
					<dd className="mb-3">
						{data.industries.map((industry) => {
							return (
								<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 mx-0.5 my-0.5">
									{industry}
								</span>
							);
						})}
					</dd>
				</dl>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-gray-200">
					<div className="-ml-px flex w-0 flex-1">
						<a
							href={data.link}
							target="_blank"
							className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
						>
							<LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							Job Description
						</a>
					</div>
				</div>
			</div>
		</li>
	);
}
