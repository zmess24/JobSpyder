import React from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

export default function JobItem({ job }) {
	return (
		<li key={job.link} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
			<div className="flex w-full items-center justify-between space-x-6 p-6">
				<div className="flex-1 truncate ">
					<div className="flex items-center space-x-3">
						<h3 className="truncate text-sm font-medium text-gray-900">{job.title}</h3>
					</div>
					<p className="mt-1 truncate text-sm text-gray-500">{job.location}</p>
					<span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
						{job.department}
					</span>
				</div>
			</div>
			<div>
				<div className="-mt-px flex divide-x divide-gray-200">
					<div className="-ml-px flex w-0 flex-1">
						<a
							href={job.link}
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
