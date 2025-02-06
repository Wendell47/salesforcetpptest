"use client";
import Button from "@/app/components/button";
import { useInvoiceStore } from "@/app/hooks/stores/dataStore";
import { ArrowLeft, ArrowRight, ChevronDown, PenLine } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function RCForm() {
	const { invoice, user, NfProducts } = useInvoiceStore();
	const [Text, setText] = useState("");
	const [textHeight, setHeight] = useState(28);
	const [hide, setHide] = useState(false);
	const [hideOptions, setHideOptions] = useState(false);
	const [index, setIndex] = useState(0);

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setText(e.target.value);
		setHeight(e.target.scrollHeight);
	}
	function handleOptions(e: number) {
		setIndex(e);
		setHideOptions(!hideOptions);
	}
	const router = useRouter();
	const [signature, setSignature] = useState<string>(
		"AOS CUIDADOS DO GUILHERME TRINDADE",
	);
	useEffect(() => {
		// Carregar o valor do localStorage quando a página for carregada
		const savedSignature = localStorage.getItem("signature");
		if (savedSignature) {
			setSignature(savedSignature);
		}
	}, []);

	useEffect(() => {
		// Salvar o valor no localStorage sempre que ele for alterado
		localStorage.setItem("signature", signature);
	}, [signature]);

	useEffect(() => {
		invoice.length === 0 && router.push("/");
	}, [invoice.length, router]);

	console.log(invoice[0]);
	return (
		<div className="flex gap-4 items-start">
			<Button
				btnType="secondary"
				className="print:hidden"
				onClick={() => router.push("/")}
			>
				<ArrowLeft />
			</Button>
			{invoice.length > 0 ? (
				invoice.map((data) => (
					<div
						key={data.Id}
						id="RCForm"
						className="p-10 w-[210mm] h-[297mm] rounded-md border border-solid bg-white border-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 print:border-transparent"
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
								<div
									className="flex items-end mb-5"
									onFocus={() => setHide(true)}
								>
									<label htmlFor="description" className="!hidden">
										description
									</label>
									<textarea
										id="description"
										className="text-center w-full text-lg font-bold  bg-transparent resize-none"
										defaultValue="POR GENTILEZA, REALIZAR ENTREGA DO ITEM FALTANTE"
										style={{ height: textHeight }}
										onChange={(e) => handleChange(e)}
									/>
									<PenLine style={{ opacity: hide ? 0 : 1 }} />
								</div>

								<div className="flex flex-wrap border">
									<div className="flex-1 basis-[20%] border-r  p-2">
										<h3>
											<span className="opacity-65">NF:</span>{" "}
											{data.NinePositionsDocumentNumber__c} - {data.Serie__c}
										</h3>
									</div>
									<div className="flex-[1] basis-[60%]  p-2">
										<p>
											<span className="opacity-65">CLIENTE:</span>{" "}
											{user[0].ExternalId__c} - {data.NameOne__c}
										</p>
									</div>
								</div>

								<div className="flex flex-wrap border">
									<div className="!basis-full border-b p-2">
										<h1 className="font-bold uppercase text-center">
											Endereço do Cliente
										</h1>
									</div>

									<div className="flex-1 basis-1/3 border-r  p-2">
										<label className="opacity-65" htmlFor="BairroEntrega__c">
											Bairro
										</label>
										<input
											id="BairroEntrega__c"
											defaultValue={data.BairroEntrega__c}
										/>
									</div>
									<div className="flex-1 basis-1/3 border-r   p-2">
										<label className="opacity-65" htmlFor="CepEntrega__c">
											CEP
										</label>
										<input
											id="CepEntrega__c"
											defaultValue={data.CepEntrega__c}
										/>
									</div>
									<div className="flex-1 basis-1/3   p-2">
										<label
											className="opacity-65"
											htmlFor="CidadeEstadoEntrega__c"
										>
											Cidade/Estado
										</label>
										<input
											id="CidadeEstadoEntrega__c"
											defaultValue={data.CidadeEstadoEntrega__c}
										/>
									</div>
									<div className="flex-1 basis-full  border-t p-2">
										<label className="opacity-65" htmlFor="EnderecoEntrega__c">
											Endereço de Entrega
										</label>
										<input
											id="EnderecoEntrega__c"
											defaultValue={data.EnderecoEntrega__c}
										/>
									</div>
									<div className="flex-1 basis-full  border-t p-2">
										<label className="opacity-65" htmlFor="EnderecoEntrega__c">
											Referência
										</label>
										<input
											id="EnderecoEntrega__c"
											defaultValue={data.Referencia__c}
										/>
									</div>
								</div>

								<div className="flex flex-wrap border">
									<div className="!basis-full  border-b   p-2">
										<h1 className="font-bold uppercase text-center">Contato</h1>
									</div>
									<div className="flex-1 basis-1/2   p-2">
										<span className="opacity-65">Telefone Principal</span>
										<p>{user[0].DDDPhone__c}</p>
									</div>
									<div className="flex-1 basis-1/2 border-l   p-2">
										<span className="opacity-65">Secundário</span>
										<p>{user[0].DDDPhoneTwo__c}</p>
									</div>
								</div>
								<div className="flex flex-wrap border relative">
									<div className="!basis-full  border-b p-2 flex justify-center">
										<button
											type="button"
											className="font-bold uppercase flex gap-1"
											onClick={() => setHideOptions(false)}
										>
											Produto <ChevronDown />
										</button>
									</div>
									<div className="flex-1 basis-1/1   p-2">
										<span className="opacity-65">Código</span>
										<p>{NfProducts[index].MaterialNumber__c}</p>
									</div>
									<div className="flex-1 basis-1/2 border-l   p-2">
										<span className="opacity-65">Item</span>
										<p>{NfProducts[index].Name}</p>
									</div>
									<div className="flex-1 basis-1/1 border-l   p-2">
										<span className="opacity-65">Quantidade</span>
										<p>{NfProducts[index].Amount__c}</p>
									</div>

									<div
										className={`absolute  inset-x-0 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 mt-12 mx-2 flex flex-col overflow-hidden ${hideOptions ? "hidden" : "show"}`}
									>
										{NfProducts.map((product, index) => (
											<button
												key={product.Id}
												type="button"
												className="text-left p-2  hover:bg-neutral-200 dark:hover:bg-neutral-500	focus:bg-neutral-500 focus:outline-none"
												onClick={() => handleOptions(index)}
											>
												{product.MaterialNumber__c} - {product.Name}
											</button>
										))}
									</div>
								</div>
							</section>
							<section className="w-full ">
								<div className="flex-1 pb-8 border-b ">
									<label className="opacity-65 !hidden" htmlFor="Signature">
										Endereço de Entrega
									</label>
									<input
										id="Signature"
										className="text-center mb-5 w-full"
										defaultValue={signature}
										onChange={(e) => setSignature(e.target.value)}
									/>
									<p className="text-center text-neutral-400">Assinatura:</p>
								</div>
							</section>
						</div>
					</div>
				))
			) : (
				<p className="text-2xl white ">carregando</p>
			)}
		</div>
	);
}
