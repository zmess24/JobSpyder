import React from "react";
import Navbar from "../Navbar";

export default function Layout({ children }) {
	return (
		<div className="bg-gray-100 h-full">
			<Navbar />
			<main className="container mx-auto mt-6 mb-6">{children}</main>;
		</div>
	);
}
