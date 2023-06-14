import { UserCircleIcon, LinkIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function CompanyItem({ company }) {
	return (
		<li key={company._id} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
			<div className="flex flex-1 flex-col p-8">
				<img className="mx-auto h-20 w-20 flex-shrink-0 rounded-full" src={company.logo} alt="" />
				<h3 className="mt-6 text-sm font-medium text-gray-900">{company.name}</h3>
				<dl className="mt-1 flex flex-grow flex-col justify-between">
					<dt className="sr-only">Industries</dt>
					<dd className="mt-3">
						{company.industries.map((industry) => {
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
					{company.open_roles.length > 0 && (
						<div className="flex w-0 flex-1">
							<Link
								to={`company/${company._id}`}
								state={{ company }}
								className="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
							>
								<UserCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
								Roles
							</Link>
						</div>
					)}
					<div className="-ml-px flex w-0 flex-1">
						<a
							href={company.company_link}
							target="_blank"
							className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
						>
							<LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							Website
						</a>
					</div>
				</div>
			</div>
		</li>
	);
}
