"use client";
import { useInvoiceStore } from "@/app/hooks/stores/dataStore";
import { ChevronDown, PenLine } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";

export default function RCForm() {
	const { invoice, user,NfProducts} = useInvoiceStore();
	const [Text, setText] = useState("");
	const [textHeight, setHeight] = useState(28);
	const [hide, setHide] = useState(false);
	const [hideOptions, setHideOptions] = useState(false);
	const[index,setIndex]=useState(0);

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setText(e.target.value);
		setHeight(e.target.scrollHeight);
	}
	function handleOptions(e:number){
		setIndex(e)
		setHideOptions(!hideOptions)	
	}
	console.log(invoice[0]);
	return invoice.length > 0 ? (
		invoice.map((data) => (
			<div
				key={data.Id}
				className="p-10 w-[210mm] h-[297mm] rounded-md border border-solid border-neutral-800 bg-neutral-900 print:border-transparent"
			>
				<div className="flex flex-col items-center gap-2 h-full">
					<section className="flex flex-1 p-3 flex-col gap-3">
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
						<div className="flex items-end mb-5" onFocus={() => setHide(true)}>
							<textarea
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
									{data.NinePositionsDocumentNumber__c} - 104
								</h3>
							</div>
							<div className="flex-[1] basis-[60%]  p-2">
								<p>
									<span className="opacity-65">CLIENTE:</span> {user[0].ExternalId__c} - {data.NameOne__c}
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
								<span className="opacity-65">Bairro</span>
								<p>{data.Neighborhood__c}</p>
							</div>
							<div className="flex-1 basis-1/3 border-r   p-2">
								<span className="opacity-65">CEP</span>
								<p>{data.CepEntrega__c}</p>
							</div>
							<div className="flex-1 basis-1/3   p-2">
								<span className="opacity-65">Cidade/Estado</span>
								<p>{data.CidadeEstadoEntrega__c}</p>
							</div>
							<div className="flex-1 basis-full border-b border-t p-2">
								<span className="opacity-65">Endereço de Entrega</span>
								<p>{data.EnderecoEntrega__c}</p>
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
								<button className="font-bold uppercase flex gap-1" onClick={()=>setHideOptions(false)}>Produto <ChevronDown /></button>
								
							</div>
							<div className="flex-1 basis-1/4   p-2">
								<span className="opacity-65">Código</span>
								<p>{NfProducts[index].MaterialNumber__c}</p>
							</div>
							<div className="flex-1 basis-1/2 border-l   p-2">
								<span className="opacity-65">Item</span>
								<p>{NfProducts[index].Name}</p>
							
							</div>

							<div className={`absolute w-full  rounded-lg border-neutral-700 bg-neutral-600 mt-12 flex flex-col overflow-hidden ${hideOptions ? "hidden" : "show"}`}>{
								NfProducts.map((product, index)=>(
									<button key={product.Id} className={`text-left p-2 hover:bg-neutral-500	focus:bg-neutral-500 focus:outline-none`}onClick={()=>handleOptions(index)}>{product.MaterialNumber__c} - {product.Name}</button>
								))
								}</div>
						</div>
					</section>
					<section className="w-full ">
						<div className="flex-1 pb-8 border-b ">
							<p className="text-center mb-5">
								AOS CUIDADOS DO GUILHERME TRINDADE
							</p>
							<p className="text-center text-neutral-400">Assinatura:</p>
						</div>
					</section>
				</div>
			</div>
		))
	) : (
		<p className="text-2xl white ">carregando</p>
	);
}
