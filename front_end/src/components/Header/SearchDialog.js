import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import styles from "../../constants/styles";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function SearchDialog({ filters, addFilter, removeFilter }) {
	const [open, setOpen] = useState(false);
	const handleClick = (e, value, type) => {
		e.target.checked === false ? removeFilter(value, type) : addFilter(value, type);
	};

	return (
		<div className="flex flex-col md:flex-col sm:flex-row justify-center">
			{/* Mobile filter dialog */}
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
								<div className="flex items-center justify-between px-4">
									<h2 className="text-lg font-medium text-gray-900">Filters</h2>
									<button
										type="button"
										className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
										onClick={() => setOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								{/* Filters */}
								<form className="mt-4">
									{filters.map((section) => (
										<Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
											{({ open }) => (
												<>
													<h3 className="-mx-2 -my-3 flow-root">
														<Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
															<span className="font-medium text-gray-900">{section.name}</span>
															<span className="ml-6 flex items-center">
																<ChevronDownIcon
																	className={classNames(open ? "-rotate-180" : "rotate-0", "h-5 w-5 transform")}
																	aria-hidden="true"
																/>
															</span>
														</Disclosure.Button>
													</h3>
													<Disclosure.Panel className="pt-6">
														<div className="space-y-6">
															{section.options.map((option, optionIdx) => (
																<div key={option.value} className="flex items-center">
																	<input
																		id={`filter-mobile-${section.id}-${optionIdx}`}
																		name={`${section.id}[]`}
																		defaultValue={option.value}
																		type="checkbox"
																		defaultChecked={option.checked}
																		className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																	/>
																	<label
																		htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																		className="ml-3 text-sm text-gray-500"
																	>
																		{option.label}
																	</label>
																</div>
															))}
														</div>
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									))}
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			{/* Filters */}
			<section aria-labelledby="filter-heading">
				<h2 id="filter-heading" className="sr-only">
					Filters
				</h2>

				<div className="">
					<div className="mx-auto flex max-w-7xl items-center justify-center">
						<div className="sm:block">
							<div className="flow-root">
								<Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200 ">
									{filters.map((section, sectionIdx) => (
										<Popover key={section.name} className="relative inline-block px-4 text-left">
											<Popover.Button
												className={`w-36 inline-flex justify-between items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ${
													section.id === "industries" ? styles.industryFilterColor : styles.departmentFilterColor
												}`}
											>
												<span>{section.name}</span>
												<ChevronDownIcon
													className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
													aria-hidden="true"
												/>
											</Popover.Button>

											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none xs:w-full">
													<form className="space-y-4 overflow-auto pt-1" style={{ maxHeight: "50vh" }}>
														{section.options.map((option, optionIdx) => (
															<div key={option.value} className="flex items-center">
																<input
																	id={`filter-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type="checkbox"
																	defaultChecked={option.checked}
																	className="ml-1 h-4 w-4 rounded border-gray-300 text-indigo-600"
																	onClick={(e) => handleClick(e, option.value, section.id)}
																/>
																<label
																	htmlFor={`filter-${section.id}-${optionIdx}`}
																	className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
																>
																	{option.label}
																</label>
															</div>
														))}
													</form>
												</Popover.Panel>
											</Transition>
										</Popover>
									))}
								</Popover.Group>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
