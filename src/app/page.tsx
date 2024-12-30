"use client";
import { useState } from "react";
import Input from "./components/input";
import Item from "./components/Item";
import { useInvoiceStore } from "./hooks/stores/dataStore";
import { NotepadText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConnection } from "./hooks/useConnection";

export default function Home() {
	const router = useRouter();
	const { invoice, NfProducts, user, connection } = useInvoiceStore();
	const [nf, setNf] = useState<string>("");
	const [serie, setSerie] = useState<string>("104");
	const { getData } = useConnection();

	return (
		<div className="max-w-4xl w-full flex gap-2 flex-col">
			<div className="p-6 bg-neutral-800 rounded-lg">
				<h1 className="font-bold text-2xl mb-3">Consulta de NF</h1>

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

					<button
						type="button"
						className="p-2 rounded-lg bg-blue-600 text-white-100 font-bold flex-1  disabled:bg-neutral-500"
						onClick={() => getData(nf, serie)}
						disabled={!(nf && serie)}
					>
						Buscar
					</button>
				</form>
			</div>
			<div className="p-6 bg-neutral-800 rounded-lg">
				{invoice.length > 0 ? (
					<ul>
						{invoice.map((record) => (
							<li key={record.Id} className="flex gap-2 flex-wrap">
								<div className="flex gap-2 flex-wrap">
									<Item
										title="NotaFiscal"
										dataInfo={record.NinePositionsDocumentNumber__c}
									/>
									<Item title="Nome" dataInfo={record.NameOne__c} />
									<Item
										title="Endereço de Entrega"
										dataInfo={record.EnderecoEntrega__c}
									/>
									<Item title="Bairro" dataInfo={record.BairroEntrega__c} />
									<Item
										title="Cidade/Estado"
										dataInfo={record.CidadeEstadoEntrega__c}
									/>
									<Item title="CEP" dataInfo={record.CepEntrega__c} />
									<Item title="Referência" dataInfo={record.Referencia__c} />
								</div>
							</li>
						))}
					</ul>
				) : (
					<p>Carregando...</p>
				)}
			</div>
			<div className="p-6 bg-neutral-800 rounded-lg">
				{user.length > 0 ? (
					<ul className="flex gap-2 flex-wrap">
						{user.map((u) => (
							<li key={u.Id} className="flex gap-5 flex-wrap">
								<Item title="Contato Principal" dataInfo={u.DDDPhone__c} />
								<Item title="Contato Secundário" dataInfo={u.DDDPhoneTwo__c} />
							</li>
						))}
					</ul>
				) : (
					<p>Carregando...</p>
				)}
			</div>
			<div className="p-6 bg-neutral-800 rounded-lg">
				<div className="flex justify-between mb-3">
					<h4 className="text-xl">Produto</h4>{" "}
					<p className="text-lg">
						<span className="text-neutral-500">Itens:</span> {NfProducts.length}
					</p>
				</div>
				{NfProducts.length > 0 ? (
					<ul className="flex gap-2 flex-wrap">
						{NfProducts.map((u) => (
							<li key={u.Id} className="flex gap-5 flex-wrap flex-auto">
								<Item
									title="Código do Produto"
									dataInfo={u.MaterialNumber__c}
									className="flex"
								/>
								<Item
									title="Produto"
									dataInfo={u.Name}
									className="!flex-[10]"
								/>
								<Item title="Quantidade" dataInfo={u.Amount__c} />
							</li>
						))}
					</ul>
				) : (
					<p>Carregando...</p>
				)}
			</div>
			{invoice.length > 0 && (
				<div>
					<button
						type="button"
						className="flex gap-2 p-3 rounded-lg bg-blue-600 text-blue-100 font-bold flex-1"
						onClick={() => router.push("/RCForm")}
					>
						<NotepadText /> Gerar formulario
					</button>
				</div>
			)}
		</div>
	);
}
