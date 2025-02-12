import { useRouter } from "next/navigation";
import { useInvoiceStore } from "../hooks/stores/dataStore";
import Block from "./block";
import Item from "./Item";
import { NotepadText } from "lucide-react";
import Button from "./button";

export default function NFData() {
	const router = useRouter();
	const { invoice, NfProducts, user } = useInvoiceStore();

	return (
		<>
			<Block>
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
			</Block>
			<Block>
				{user.length > 0 ? (
					<ul className="flex gap-2 flex-wrap" key={user[0].Id}>
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
			</Block>
			<Block>
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
			</Block>
			{NfProducts.length > 0 && user.length > 0 && (
				<div>
					<Button
						title="Gerar Formulário"
						type="button"
						onClick={() => router.push("/RCForm")}
					>
						<NotepadText />
					</Button>
				</div>
			)}
		</>
	);
}
