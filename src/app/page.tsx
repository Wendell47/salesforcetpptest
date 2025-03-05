"use client";
import { useState } from "react";
import Input from "./components/input";
import { useConnection } from "./hooks/useConnection";
import Block from "./components/block";
import Button from "./components/button";

import NFData from "./components/NFData";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";

export default function Home() {
	const [nf, setNf] = useState<string>("");
	const [serie, setSerie] = useState<string>("104");
	const {
		Connection,
		invoice,
		searchParams,
		setSearchParams,
		userData,
		userProductsData,
		notFound,
	} = useConnection();
	const { data, isLoading } = invoice;
	const { isFetching } = Connection;

	const nfData = {
		userData,
		userProductsData,
		invoice,
		searchParams,
	};
	console.log(data);
	return (
		<div className="max-w-4xl w-full flex gap-2 flex-col">
			<Block>
				<h1 className="font-bold text-2xl mb-3">Consultar NF</h1>

				<form className="flex gap-3 flex-wrap">
					<Input
						title="NF"
						onChange={(e) => setNf(e.target.value)}
						maxLength={9}
						className="flex-[4]"
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
						onClick={() => setSearchParams({ nf, serie })}
						disabled={!(nf && serie)}
						isLoading={isLoading}
					/>
				</form>
			</Block>
			{data && data?.length > 0 ? (
				<NFData nfData={nfData} />
			) : (
				<>
					<Image
						alt=""
						src={"/ilustr.svg"}
						width={500}
						height={500}
						className="w-full"
					/>

					{isFetching ? (
						<>
							<h1 className="text-xl text-center">CONECTANDO</h1>
							<div className="text-center">
								<Loader2Icon
									className="text-2xl mx-auto text-blue-500 animate-spin"
									size={30}
								/>
							</div>
						</>
					) : (
						<>
							{notFound && (
								<>
									<h1 className="text-2xl text-center">
										Não encontramos dados para essa nota!{" "}
									</h1>
									<p className="text-center">
										Verifique se inseriu corretamente a nota ou se já foi
										consultada no SalesForce.
									</p>
								</>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
}
