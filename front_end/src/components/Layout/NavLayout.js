import React, { Suspense } from "react";
import Navbar from "../Navbar";
import { useLoaderData, Await, defer, Outlet } from "react-router-dom";
import { loadData } from "../../api";
import LoadingItem from "./LoadingItem";
import ListLayout from "./ListLayout";

export async function loader() {
	let data = loadData();

	return defer({
		JobSpyderData: data,
	});
}

export default function NavLayout() {
	const data = useLoaderData();
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 pb-10";
	const fakeArray = Array(24).fill(0);
	const fakeIndustyData = { id: "industries", name: "Industries", options: fakeArray };

	return (
		<div className="bg-gray-100 min-h-screen">
			<Navbar />
			<main className="container mx-auto mt-6">
				<Suspense
					fallback={
						<ListLayout
							data={fakeArray}
							filters={{ industries: fakeIndustyData, departments: fakeArray }}
							ListItemComponent={LoadingItem}
							layoutCSS={layoutCSS}
							searchKey={"title"}
						/>
					}
				>
					<Await resolve={data.JobSpyderData}>{(JobSpyderData) => <Outlet context={{ JobSpyderData }} />}</Await>
				</Suspense>
			</main>
		</div>
	);
}
