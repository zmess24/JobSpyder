import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="bg-gray-100 min-h-screen">
			<Navbar />
			<main className="container mx-auto mt-6 mb-6">
				<Outlet />
			</main>
		</div>
	);
}
