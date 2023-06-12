// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [companies, setCompanies] = useState([]);

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
		fetch("/api/v1/companies/").then((res) =>
			res.json().then((data) => {
				// Setting a data from api
				setCompanies(data.companies);
			})
		);
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="text-3xl font-bold underline">React and flask</h1>
				{/* Calling a data from setdata for showing */}
				<ul>
					{companies.length > 0 &&
						companies.map((company) => {
							return <li key={company._id}>{company.name}</li>;
						})}
				</ul>
			</header>
		</div>
	);
}

export default App;
