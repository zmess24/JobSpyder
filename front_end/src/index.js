import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// Routes
import Companies, { loader as companiesLoader } from "./routes/Companies";
import Roles from "./routes/Roles";
import Company from "./routes/Companies/Company";
import Layout from "./components/Layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Companies />,
		errorElement: <ErrorPage />,
		loader: companiesLoader,
	},
	{
		path: "/companies",
		element: <Companies />,
		errorElement: <ErrorPage />,
		loader: companiesLoader,
	},
	{
		path: "/companies/:companyId",
		element: <Company />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/roles",
		element: <Roles />,
		errorElement: <ErrorPage />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Layout>
		<RouterProvider router={router} />
	</Layout>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
