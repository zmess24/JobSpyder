// Importing modules
import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

export default function Dashboard() {
	const { companies } = useLoaderData();
	const navigation = useNavigation();

	return <h1>This is the dashboard page!</h1>;
}
