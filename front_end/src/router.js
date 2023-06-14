import React from "react";
import { Routes, Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
// Page Elements
import Companies, { loader as companiesLoader } from "./routes/Companies";
import Roles, { loader as rolesLoader } from "./routes/Roles";
import Company from "./routes/Companies/Company";
import NavLayout from "./components/Layout/NavLayout";
import ErrorPage from "./error-page";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<NavLayout />} errorElement={<ErrorPage />}>
			<Route path="/" element={<Companies />} loader={companiesLoader} />
			<Route path="/companies" element={<Companies />} loader={companiesLoader} />
			<Route path="/companies/:companyId" element={<Company />} />
			<Route path="/roles" loader={rolesLoader} element={<Roles />} />
		</Route>
	)
);

export default router;
