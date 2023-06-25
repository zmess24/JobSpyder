import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";

export default function MobileMenu() {
	const ActiveLink = "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700";
	const InactiveLink =
		"block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700";
	return (
		<Disclosure.Panel className="sm:hidden">
			<div className="space-y-1 pb-3 pt-2">
				<NavLink to={"/"} className={({ isActive, isPending }) => (isPending ? InactiveLink : isActive ? ActiveLink : InactiveLink)}>
					Dashboard
				</NavLink>
				<NavLink to={"/companies"} className={({ isActive, isPending }) => (isPending ? InactiveLink : isActive ? ActiveLink : InactiveLink)}>
					All Companies
				</NavLink>
				<NavLink to={"/roles"} className={({ isActive, isPending }) => (isPending ? InactiveLink : isActive ? ActiveLink : InactiveLink)}>
					All Roles
				</NavLink>
			</div>
		</Disclosure.Panel>
	);
}
