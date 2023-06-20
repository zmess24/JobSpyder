import React from "react";

export default function Results({ total }) {
	return (
		<p className="text-sm text-gray-500 mt-3">
			Showing <strong>{total}</strong> results
		</p>
	);
}
