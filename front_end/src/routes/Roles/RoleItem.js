import React, { Fragment } from "react";
import { LinkIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

export default function RoleItem({ role }) {
	return (
		<li key={role.link} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
			<div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-white p-6">
				<img src={role.logo} alt={role.title} className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
				<div className="flex flex-col truncate">
					<div className="truncate text-sm font-medium leading-6 text-gray-900 ">{role.title}</div>
					<div className="mt-1 truncate text-sm text-gray-500">{role.company}</div>
				</div>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-gray-200">
					<div className="-ml-px flex w-0 flex-1">
						<a
							href={role.link}
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
		// <li key={role.link} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
		// 	<div className="flex w-full items-center justify-between space-x-6 p-6">
		// 		<div className="flex-1 truncate ">
		// 			<div className="flex items-center space-x-3">
		// 				<h3 className="truncate text-sm font-medium text-gray-900">{role.title}</h3>
		// 			</div>
		// 			<p className="mt-1 truncate text-sm text-gray-500">{role.location}</p>
		// 			<span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
		// 				{role.department}
		// 			</span>
		// 		</div>
		// 	</div>
		// <div>
		// 	<div className="-mt-px flex divide-x divide-gray-200">
		// 		<div className="-ml-px flex w-0 flex-1">
		// 			<a
		// 				href={role.link}
		// 				target="_blank"
		// 				className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
		// 			>
		// 				<LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
		// 				Role Description
		// 			</a>
		// 		</div>
		// 	</div>
		// </div>
		// </li>
	);
}
