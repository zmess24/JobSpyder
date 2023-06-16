// Importing modules
import React, { Suspense } from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import RoleItem from "./RoleItem";
import LoadingItem from "./LoadingItem";
import ListLayout from "../../components/Layout/ListLayout";
import { loadRoles } from "../../api";

export async function loader() {
	let rolesPromise = loadRoles();

	return defer({
		rolesData: rolesPromise,
	});
}

export default function Roles() {
	const data = useLoaderData();
	const layoutCSS = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 pb-10";
	return (
		<Suspense fallback={<>...</>}>
			<Await resolve={data.rolesData}>
				{(rolesData) => (
					<ListLayout
						data={rolesData.roles}
						filters={rolesData.industry_categories}
						ListItemComponent={RoleItem}
						layoutCSS={layoutCSS}
						searchKey={"title"}
					/>
				)}
			</Await>
		</Suspense>
	);
}
