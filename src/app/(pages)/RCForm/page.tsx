"use client";
import { PenLine } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";

export default function RCForm() {
	const [Text, setText] = useState("");
	const [textHeight, setHeight] = useState(25);
	const [hide, setHide] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setText(e.target.value);
		setHeight(e.target.scrollHeight);
	}

	return (
		<div className="p-10 w-[210mm] h-[297mm] rounded-md border border-solid border-neutral-800 bg-neutral-900 print:border-transparent">
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
						<div className="flex-1 basis-[30%] border-r  p-2">
							<h3>
								<span className="opacity-65">NF:</span> 008492035 - 104
							</h3>
						</div>
						<div className="flex-[1] basis-[60%]  p-2">
							<p>
								<span className="opacity-65">CLIENTE:</span> 199830 - MARLY DAS
								CHAGAS CIRINO
							</p>
						</div>

						<div className="flex-1 basis-[100%] border-t  p-2">
							<p>
								<span className="opacity-65">PRODUTO:</span> 00251458 - CJ 2P
								CADEIRAS SEAT&CO KAYLA GARDEN PT
							</p>
						</div>
					</div>

					<div className="flex flex-wrap border">
						<div className="!basis-full border-b p-2">
							<h1 className="font-bold uppercase text-center">
								Endereço do Cliente
							</h1>
						</div>
						<div className="flex-1 basis-1/2 border-r border-b  p-2">
							<span className="opacity-65">Endereço de Entrega</span>
							<p>Rua</p>
						</div>
						<div className="flex-1 basis-1/2 border-r border-b p-2">
							<span className="opacity-65">Bairro</span>
							<p>Rua</p>
						</div>
						<div className="flex-1 basis-1/2 border-r   p-2">
							<span className="opacity-65">CEP</span>
							<p>Rua</p>
						</div>
						<div className="flex-1 basis-1/2   p-2">
							<span className="opacity-65">Cidade/Estado</span>
							<p>Rua</p>
						</div>
					</div>

					<div className="flex flex-wrap border">
						<div className="!basis-full  border-b   p-2">
							<h1 className="font-bold uppercase text-center">Contato</h1>
						</div>
						<div className="flex-1 basis-1/2   p-2">
							<span className="opacity-65">Telefone Principal</span>
							<p>Rua</p>
						</div>
						<div className="flex-1 basis-1/2 border-l   p-2">
							<span className="opacity-65">Secundário</span>
							<p>Rua</p>
						</div>
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
	);
}
