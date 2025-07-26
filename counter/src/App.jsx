// https://v6.exchangerate-api.com/v6/75fa2117d0fd644ebdb26b7e/latest/USD
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [amount, setAmount] = useState(1);
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("INR");
	const [exchangerate, setExchangeRate] = useState(null);
	const [converted, setConverted] = useState(null);

	const currencies = ["USD", "INR"];

	useEffect(() => {
		if (fromCurrency && toCurrency) {
			fetch(
				`https://v6.exchangerate-api.com/v6/75fa2117d0fd644ebdb26b7e/latest/${fromCurrency}`
			)
				.then((res) => res.json())
				.then((data) => {
					setExchangeRate(data.conversion_rates[toCurrency]);
				});
		}
	}, [fromCurrency, toCurrency]);

	const convert = () => {
		if (exchangerate) {
			setConverted((amount * exchangerate).toFixed(2));
		}
	};

	return (
		<>
			<div className="card">
				<h1>Currerncy</h1>

				<input
					type="number"
					value={amount}
					placeholder="amount"
					style={{ margin: "10px", padding: "10px" }}
					onChange={(e) => setAmount(Number(e.target.value))}
				/>

				<select
					value={fromCurrency}
					onChange={(e) => setFromCurrency(e.target.value)}
				>
					{currencies.map((cur) => (
						<option key={cur} value={cur}>
							{cur}
						</option>
					))}
				</select>

				<button onClick={convert}>convert</button>

				{converted && (
					<div>
						{amount} {fromCurrency} = {converted} {toCurrency}
					</div>
				)}
			</div>
		</>
	);
}

export default App;
