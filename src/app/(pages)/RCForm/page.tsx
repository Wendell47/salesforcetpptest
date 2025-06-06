"use client";
import Button from "@/app/components/button";
import FormInput from "@/app/components/formInput";
import { useInvoiceStore } from "@/app/hooks/stores/dataStore";
import { useConnection } from "@/app/hooks/useConnection";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Intinerarios } from "@/app/utils/intinerarios";
import { ArrowLeft, ArrowRight, ChevronDown, PenLine } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function RCForm() {
	const { invoice, setSearchParams } = useConnection();
	const { data, isLoading } = invoice;
	const { invoice_c, user, userNfProducts } = data ?? {};

	const [index, setIndex] = useState(0);
	const [Text, setText] = useState("");
	const [textHeight, setHeight] = useState(60);
	const [hideOptions, setHideOptions] = useState(true);

	const params = useSearchParams();
	const nf = params.get("nf") as string;
	const serie = params.get("serie") as string;

	useEffect(() => {
		if (nf && serie) {
			setSearchParams({ nf, serie });
		}
		setHideOptions(isLoading);
	}, [nf, serie]);

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setHeight(e.target.scrollHeight);
	}
	function handleOptions(e: number) {
		setIndex(e);
		setHideOptions(!hideOptions);
	}
	const router = useRouter();
	const { storage, setStorage } = useLocalStorage("signature");

	useEffect(() => {
		!nf && !serie && router.push("/");
	}, [router, nf, serie]);
	const getInt = () => {
		const bairro = Intinerarios.find(
			(item) => item.bairro === invoice_c?.BairroEntrega__c,
		);
		return bairro ? `DOCA ${bairro.doca} - INT ${bairro.itinerario}` : "";
	};

	return (
		<div className="flex gap-4 items-start">
			<Button
				btnType="secondary"
				className="print:hidden"
				onClick={() => router.push("/")}
			>
				<ArrowLeft />
			</Button>
			<div
				id="RCForm"
				className="p-10 w-[210mm] h-[297mm] rounded-md border bg-white dark:border-neutral-800 dark:bg-neutral-900 print:border-transparent dark:[&_div]:border-neutral-600 [&_div]:border-neutral-300"
			>
				<div className="flex flex-col items-center gap-2 h-full">
					<section className="flex flex-1 p-3 flex-col gap-3 ">
						<Image
							className="self-center"
							alt="logo"
							src={"/bemolLogo.png"}
							width={150}
							height={150}
							quality={100}
						/>
						<h1 className="text-4xl font-bold text-red-600 text-center">
							Prioridade!
						</h1>
						<div className="flex items-end mb-5">
							<label htmlFor="description" className="!hidden">
								description
							</label>
							<textarea
								id="description"
								className="text-center w-full text-lg font-bold bg-transparent resize-none"
								defaultValue={`POR GENTILEZA, REALIZAR ENTREGA DO ITEM FALTANTE \n ${invoice_c?.BairroEntrega__c && getInt()}`}
								style={{ height: textHeight }}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className="flex flex-wrap border">
							<div className="flex-1 basis-[20%] border-r p-2">
								<FormInput
									title="Nota Fiscal"
									data={`${invoice_c?.NinePositionsDocumentNumber__c} - ${invoice_c?.Serie__c}`}
									isLoading={isLoading}
								/>
							</div>
							<div className="flex-[1] basis-[60%] p-2">
								<FormInput
									title="Cliente"
									data={`${user?.ExternalId__c} - ${invoice_c?.NameOne__c}`}
									isLoading={isLoading}
								/>
							</div>
						</div>
						<div className="flex flex-wrap border">
							<div className="!basis-full border-b p-2">
								<h1 className="font-bold uppercase text-center">
									Endereço do Cliente
								</h1>
							</div>
							<div className="flex-1 basis-1/3 border-r p-2">
								<FormInput
									title="Bairro"
									data={invoice_c?.BairroEntrega__c}
									isLoading={isLoading}
								/>
							</div>
							<div className="flex-1 basis-1/3 border-r p-2">
								<FormInput
									title="CEP"
									data={invoice_c?.CepEntrega__c}
									isLoading={isLoading}
								/>
							</div>
							<div className="flex-1 basis-1/3 p-2">
								<FormInput
									title="Cidade/Estado"
									data={invoice_c?.CidadeEstadoEntrega__c}
									isLoading={isLoading}
								/>
							</div>
							<div className="flex-1 basis-full border-t p-2">
								<FormInput
									title="Endereço de Entrega"
									data={invoice_c?.EnderecoEntrega__c}
									isLoading={isLoading}
								/>
							</div>
							<div className="flex-1 basis-full border-t p-2">
								<FormInput
									title="Referência"
									data={invoice_c?.Referencia__c}
									isLoading={isLoading}
								/>
							</div>
						</div>
						<div className="flex flex-wrap border">
							<div className="!basis-full border-b p-2">
								<h1 className="font-bold uppercase text-center">Contato</h1>
							</div>
							<div className="flex-1 basis-1/2 p-2">
								<FormInput
									title="Telefone Principal"
									data={user?.DDDPhone__c}
									isLoading={isLoading}
								/>
							</div>
							<div className="flex-1 basis-1/2 border-l p-2">
								<FormInput
									title="Secundário"
									data={user?.DDDPhoneTwo__c}
									isLoading={isLoading}
								/>
							</div>
						</div>
						<div className="flex flex-wrap border relative">
							<div className="!basis-full border-b p-2 flex justify-center">
								<button
									type="button"
									className="font-bold uppercase flex gap-1"
									onClick={() => setHideOptions(!hideOptions)}
								>
									Produto <ChevronDown />
								</button>
							</div>
							<div className="flex-1 basis-1/1 p-2">
								<FormInput
									title="Código"
									data={userNfProducts?.[index].MaterialNumber__c.slice(10, 20)}
									isLoading={isLoading}
								/>
							</div>
							<div className="flex-1 basis-1/2 border-l p-2">
								<FormInput
									title="Item"
									data={userNfProducts?.[index].Name}
									isLoading={isLoading}
								/>
							</div>
							<div className="flex-1 basis-1/1 border-l p-2">
								<FormInput
									title="Quantidade"
									data={userNfProducts?.[index].Amount__c.slice(0, 1)}
									isLoading={isLoading}
								/>
							</div>

							<div
								className={`absolute inset-x-0 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 mt-12 mx-2 flex flex-col overflow-hidden ${hideOptions ? "hidden" : "show"}`}
							>
								{userNfProducts?.map((product, index) => (
									<button
										key={product.Id}
										type="button"
										className="text-left p-2 hover:bg-neutral-200 dark:hover:bg-neutral-500 focus:bg-neutral-500 focus:outline-none justify-between flex"
										onClick={() => handleOptions(index)}
									>
										<span>
											{product.MaterialNumber__c.slice(10, 20)} - {product.Name}
										</span>
										<span>Quant: {product.Amount__c.slice(0, 1)}</span>
									</button>
								))}
							</div>
						</div>
					</section>
					<section className="w-full ">
						<div className="flex-1 pb-8 border-b">
							<label className="opacity-65 !hidden" htmlFor="Signature">
								Assinatura
							</label>
							<input
								id="Signature"
								className="text-center mb-5 w-full"
								defaultValue={storage ?? ""}
								onChange={(e) => setStorage(e.target.value)}
							/>
							<p className="text-center text-neutral-400">Assinatura:</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
