"use client";
import { useState } from "react";
import Input from "./components/input";
import { useConnection } from "./hooks/useConnection";
import Block from "./components/block";
import Button from "./components/button";

import NFData from "./components/NFData";
import Image from "next/image";
import { useInvoiceStore } from "./hooks/stores/dataStore";

export default function Home() {
	const [nf, setNf] = useState<string>("");
	const [serie, setSerie] = useState<string>("104");
	const { getData } = useConnection();
	
	const { invoice,isLoading} = useInvoiceStore();
	console.log(invoice);
	return (
		<div className="max-w-4xl w-full flex gap-2 flex-col">
			<Block >
				<h1 className="font-bold text-2xl mb-3">Consultar NF</h1>

				<form className="flex gap-3">
					<Input
						title="NF"
						onChange={(e) => setNf(e.target.value)}
						maxLength={9}
						className="flex-[2]"
					/>
					<Input
						title="Série"
						maxLength={3}
						defaultValue={104}
						onChange={(e) => setSerie(e.target.value)}
						className="flex-1 appearance-none"
					/>

					<Button
						title="Buscar"
						onClick={() => getData(nf, serie)}
						disabled={!(nf && serie)}
						isLoading={isLoading}
					/>
					
				</form>
			</Block>
				{invoice.length > 0 ? (
					<NFData/>
				):(
					<Image
					alt=""
					src={"/ilustr.svg"}
					width={500}
					height={500}
					className="w-full"
					/>
				)}
		</div>
	);
}
