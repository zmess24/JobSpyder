import React from "react";

export default function ListPreference() {
	return (
		<div class="flex space-x-1 rounded-lg bg-slate-100 p-0.5" role="tablist" aria-orientation="horizontal">
			<button
				class="flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 bg-white shadow"
				id="headlessui-tabs-tab-182"
				role="tab"
				type="button"
				aria-selected="true"
				tabindex="0"
				data-headlessui-state="selected"
				aria-controls="headlessui-tabs-panel-184"
			>
				<svg
					class="h-5 w-5 flex-none stroke-sky-500"
					fill="none"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M17.25 10c0 1-1.75 6.25-7.25 6.25S2.75 11 2.75 10 4.5 3.75 10 3.75 17.25 9 17.25 10Z"></path>
					<circle cx="10" cy="10" r="2.25"></circle>
				</svg>
				<span class="sr-only lg:not-sr-only lg:ml-2 text-slate-900">Preview</span>
			</button>
			<button
				class="flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3"
				id="headlessui-tabs-tab-183"
				role="tab"
				type="button"
				aria-selected="false"
				tabindex="-1"
				data-headlessui-state=""
				aria-controls="headlessui-tabs-panel-185"
			>
				<svg
					class="h-5 w-5 flex-none stroke-slate-600"
					fill="none"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="m13.75 6.75 3.5 3.25-3.5 3.25M6.25 13.25 2.75 10l3.5-3.25"></path>
				</svg>
				<span class="sr-only lg:not-sr-only lg:ml-2 text-slate-600">Code</span>
			</button>
		</div>
	);
}
