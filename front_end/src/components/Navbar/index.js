import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex px-2 lg:px-0">
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
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									<a
										href="#"
										className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
									>
										Dashboard
									</a>
									<a
										href="#"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
									>
										All Roles
									</a>
									<a
										href="#"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
									>
										All Companies
									</a>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="lg:hidden">
						<div className="space-y-1 pb-3 pt-2">
							{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
							<Disclosure.Button
								as="a"
								href="#"
								className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
							>
								Dashboard
							</Disclosure.Button>
							<Disclosure.Button
								as="a"
								href="#"
								className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
							>
								Team
							</Disclosure.Button>
							<Disclosure.Button
								as="a"
								href="#"
								className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
							>
								Projects
							</Disclosure.Button>
							<Disclosure.Button
								as="a"
								href="#"
								className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
							>
								Calendar
							</Disclosure.Button>
						</div>
						<div className="border-t border-gray-200 pb-3 pt-4">
							<div className="mt-3 space-y-1">
								<Disclosure.Button
									as="a"
									href="#"
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
								>
									Your Profile
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									href="#"
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
								>
									Settings
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									href="#"
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
								>
									Sign out
								</Disclosure.Button>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
