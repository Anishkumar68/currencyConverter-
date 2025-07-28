import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DatePicker } from "antd";
import "./App.css";

function App() {
	const [id, setId] = useState(1);
	const { data, isPending } = useQuery({
		queryKey: ["todos", id],
		queryFn: () => getTodos(id),
	});

	return (
		<>
			<div className="card">
				<h1>React Query + Ant Desgin</h1>
				<h2>Todos</h2>
				<p>Current ID: {id}</p>
				<p>Data:</p>
				{isPending ? "loading..." : JSON.stringify(data)} <br />
				<button
					onClick={() => setId((prev) => prev + 1)}
					style={{ margin: "10px" }}
				>
					+ id
				</button>
				<br />
				{/* example of ant desgin */}
				<p>Ant Desgin</p>
				<DatePicker />
			</div>
		</>
	);
}

const getTodos = async (id) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
		.then((res) => res.json())
		.then((data) => data);
};

export default App;
