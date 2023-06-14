import React from "react";
import { Routes, Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
// Page Elements
import Companies, { loader as companiesLoader } from "./routes/Companies";
import Roles from "./routes/Roles";
import Company from "./routes/Companies/Company";
import Layout from "./components/Layout";
import ErrorPage from "./error-page";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />} errorElement={<ErrorPage />}>
			<Route path="/" element={<Companies />} loader={companiesLoader} />
			<Route path="/companies" element={<Companies />} loader={companiesLoader} />
			<Route path="/companies/:companyId:" element={<Company />} />
			<Route path="/roles" element={<Roles />} />
		</Route>
	)
);

export default router;
