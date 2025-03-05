import { useRouter } from "next/navigation";
import { useInvoiceStore } from "../hooks/stores/dataStore";
import Block from "./block";
import Item from "./Item";
import { NotepadText } from "lucide-react";
import Button from "./button";
import { useConnection } from "../hooks/useConnection";
import type { UseQueryResult } from "@tanstack/react-query";
import type {
	InvoiceWithHistoryObject,
	NfProducts,
	setSearchParamsProps,
	User,
} from "../types/Invoice";

type NFDataProps = {
	nfData: {
		invoice: UseQueryResult<InvoiceWithHistoryObject[], Error>;
		userData: UseQueryResult<User[], Error>;
		userProductsData: UseQueryResult<NfProducts[], Error>;
		searchParams: setSearchParamsProps;
	};
};
export default function NFData({ nfData }: NFDataProps) {
	const router = useRouter();

	const { data: invoice, isLoading, isFetching } = nfData.invoice;
	const { data: user, isFetched: userFetched } = nfData.userData;
	const {
		data: NfProducts,
		isFetched: NfProductsFetched,
		status,
	} = nfData.userProductsData;
	const { nf, serie } = nfData.searchParams;

	const invoiceData = invoice?.[0];
	const userData = user?.[0];
	const userProductsData = NfProducts?.[0];

	console.log(user, invoice);
	return (
		<>
			<Block>
				{isFetching ? (
					<ul>
						<li key={invoiceData?.Id} className="flex gap-2 flex-wrap">
							<div className="flex gap-2 flex-wrap">
								<Item
									title="NotaFiscal"
									dataInfo={invoiceData?.NinePositionsDocumentNumber__c}
									isLoading={isLoading}
								/>
								<Item title="Nome" dataInfo={invoiceData?.NameOne__c} />
								<Item
									title="Endereço de Entrega"
									dataInfo={invoiceData?.EnderecoEntrega__c}
								/>
								<Item title="Bairro" dataInfo={invoiceData?.BairroEntrega__c} />
								<Item
									title="Cidade/Estado"
									dataInfo={invoiceData?.CidadeEstadoEntrega__c}
								/>
								<Item title="CEP" dataInfo={invoiceData?.CepEntrega__c} />
								<Item
									title="Referência"
									dataInfo={invoiceData?.Referencia__c}
								/>
							</div>
						</li>
					</ul>
				) : (
					<p>Carregando...</p>
				)}
			</Block>
			<Block>
				{user ? (
					<ul className="flex gap-2 flex-wrap" key={user[0].Id}>
						{user.map((u) => (
							<li key={u.Id} className="flex gap-5 flex-wrap">
								<Item title="Contato Principal" dataInfo={u.DDDPhone__c} />
								<Item title="Contato Secundário" dataInfo={u.DDDPhoneTwo__c} />
							</li>
						))}
					</ul>
				) : (
					<li className="flex gap-5 flex-wrap">
						<Item title="Contato Principal" isLoading={isLoading} />
						<Item title="Contato Secundário" isLoading={isLoading} />
					</li>
				)}
			</Block>
			<Block>
				<div className="flex justify-between mb-3">
					<h4 className="text-xl">Produto</h4>{" "}
					<p className="text-lg">
						<span className="text-neutral-500">Itens:</span>{" "}
						{NfProducts?.length}
					</p>
				</div>
				{NfProducts ? (
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
			{userFetched && NfProductsFetched && (
				<div>
					<Button
						title="Gerar Formulário"
						type="button"
						onClick={() => router.push(`RCForm?nf=${nf}&serie=${serie}`)}
					>
						<NotepadText />
					</Button>
				</div>
			)}
		</>
	);
}
