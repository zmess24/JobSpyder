import React from "react";
import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
// Page Elements
import Companies from "./routes/Companies";
import Dashboard from "./routes/Dashboard";
import Roles from "./routes/Roles";
import Company from "./routes/Companies/Company";
import NavLayout, { loader as rootLoader } from "./components/Layout/NavLayout";
import ErrorPage from "./error-page";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<NavLayout />} errorElement={<ErrorPage />} loader={rootLoader}>
			<Route path="/" element={<Dashboard />} />
			<Route path="/companies" element={<Companies />} />
			<Route path="/companies/:companyId" element={<Company />} />
			<Route path="/roles" element={<Roles />} />
		</Route>
	)
);

export default router;
