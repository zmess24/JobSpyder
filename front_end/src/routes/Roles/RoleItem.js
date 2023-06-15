import React, { Fragment } from "react";
import { LinkIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

export default function RoleItem({ data, keyValue }) {
	return (
		<li key={keyValue} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
			<div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-white p-6">
				<img src={data.logo} alt={data.title} className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
				<div className="flex flex-col truncate">
					<div className="truncate text-sm font-medium leading-6 text-gray-900 ">{data.title}</div>
					<div className="mt-1 truncate text-sm text-gray-500">{data.company}</div>
				</div>
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
