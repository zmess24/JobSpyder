import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	let ActiveLink = "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900";
	let InactiveLink =
		"inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";
	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex">
								<div className="flex flex-shrink-0 items-center">
									<img
										className="block h-8 w-auto lg:hidden"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
										alt="Your Company"
									/>
									<img
										className="hidden h-8 w-auto lg:block"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
										alt="Your Company"
									/>
								</div>
								<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
									<NavLink
										to={"/"}
										className={({ isActive, isPending }) => (isPending ? InactiveLink : isActive ? ActiveLink : InactiveLink)}
									>
										Dashboard
									</NavLink>
									<NavLink
										to={"/companies"}
										className={({ isActive, isPending }) => (isPending ? InactiveLink : isActive ? ActiveLink : InactiveLink)}
									>
										All Companies
									</NavLink>
									<NavLink
										to={"/roles"}
										className={({ isActive, isPending }) => (isPending ? InactiveLink : isActive ? ActiveLink : InactiveLink)}
									>
										All Roles
									</NavLink>
								</div>
							</div>
							<div className="-mr-2 flex items-center sm:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
						</div>
						<MobileMenu />
					</div>
				</>
			)}
		</Disclosure>
	);
}
