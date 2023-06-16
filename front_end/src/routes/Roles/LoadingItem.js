import React, { Fragment } from "react";

export default function LoadingItem({ data, keyValue }) {
	return (
		<li class="shadow rounded-md p-4 max-w-sm w-full mx-auto bg-white">
			<div class="animate-pulse flex space-x-4">
				<div class="rounded-full bg-slate-200 h-10 w-10"></div>
				<div class="flex-1 space-y-6 py-1">
					<div class="h-2 bg-slate-200 rounded"></div>
					<div class="space-y-3">
						<div class="grid grid-cols-3 gap-4">
							<div class="h-2 bg-slate-200 rounded col-span-2"></div>
							<div class="h-2 bg-slate-200 rounded col-span-1"></div>
						</div>
						<div class="h-2 bg-slate-200 rounded"></div>
					</div>
				</div>
			</div>
		</li>
		// <li key={keyValue} className="col-span-1 rounded-lg bg-white shadow">
		// 	<div className="flex items-center gap-x-4 bg-white px-6 pt-6 pb-3 animate-pulse">
		// 		<div className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"></div>
		// 		<div className="flex flex-col truncate">
		// 			<div className="h-2 bg-slate-200 rounded"></div>
		// 			<div className="h-2 bg-slate-200 rounded"></div>
		// 			<div className="h-2 bg-slate-200 rounded"> </div>
		// 		</div>
		// 	</div>
		// 	<div className="flex items-center gap-x-4 mb-1 bg-white px-6">
		// 		<span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
		// 			{/* {data.department} */}
		// 		</span>
		// 	</div>
		// 	<div className="flex items-center gap-x-4 divide-y divide-gray-200 border-b border-gray-900/7 bg-white px-6">
		// 		<dl className="mt-1 flex flex-grow flex-col justify-between">
		// 			<dt className="sr-only">Industries</dt>
		// 			<dd className="mb-3">
		// 				{/* {data.industries.map((industry) => {
		// 					return (
		// 						<span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 mx-0.5 my-0.5">
		// 							{industry}
		// 						</span>
		// 					);
		// 				})} */}
		// 			</dd>
		// 		</dl>
		// 	</div>
		// 	<div>
		// 		<div className="-mt-px flex divide-x divide-gray-200">
		// 			<div className="-ml-px flex w-0 flex-1">
		// 				{/* <a
		// 					href={data.link}
		// 					target="_blank"
		// 					className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
		// 				>
		// 					<LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
		// 					Job Description
		// 				</a> */}
		// 			</div>
		// 		</div>
		// 	</div>
		// </li>
	);
}
