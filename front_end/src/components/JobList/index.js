import React from "react";
import JobItem from "./JobItem";

export default function JobList({ roles }) {
	return (
		<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{roles &&
				roles.map((job) => {
					return <JobItem job={job} />;
				})}
		</ul>
	);
}
