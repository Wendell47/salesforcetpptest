import { useRouter } from "next/navigation";
import Block from "./block";
import Item from "./Item";
import { NotepadText } from "lucide-react";
import Button from "./button";
import type { UseQueryResult } from "@tanstack/react-query";
import type { data, setSearchParamsProps, User } from "../types/Invoice";

type NFDataProps = {
	nfData: {
		invoice: UseQueryResult<data, Error>;
		searchParams: setSearchParamsProps;
	};
};
export default function NFData({ nfData }: NFDataProps) {
	const router = useRouter();

	const { data: invoice, isLoading, isFetching, isFetched } = nfData.invoice;

	const { nf, serie } = nfData.searchParams;

	const { invoice_c, user, userNfProducts } = invoice as data;

	return (
		<>
			<Block>
				{isFetched ? (
					<ul>
						<li key={invoice_c?.Id} className="flex gap-2 flex-wrap">
							<div className="flex gap-2 flex-wrap">
								<Item
									title="NotaFiscal"
									dataInfo={invoice_c?.NinePositionsDocumentNumber__c}
									isLoading={isLoading}
								/>
								<Item title="Nome" dataInfo={invoice_c?.NameOne__c} />
								<Item
									title="Endereço de Entrega"
									dataInfo={invoice_c?.EnderecoEntrega__c}
								/>
								<Item title="Bairro" dataInfo={invoice_c?.BairroEntrega__c} />
								<Item
									title="Cidade/Estado"
									dataInfo={invoice_c?.CidadeEstadoEntrega__c}
								/>
								<Item title="CEP" dataInfo={invoice_c?.CepEntrega__c} />
								<Item title="Referência" dataInfo={invoice_c?.Referencia__c} />
							</div>
						</li>
					</ul>
				) : (
					<p>Carregando...</p>
				)}
			</Block>
			<Block>
				<ul className="flex gap-2 flex-wrap">
					<li className="flex gap-5 flex-wrap">
						<Item
							title="Contato Principal"
							dataInfo={user?.DDDPhone__c}
							isLoading={isLoading}
						/>
						<Item
							title="Contato Secundário"
							dataInfo={user?.DDDPhoneTwo__c}
							isLoading={isLoading}
						/>
					</li>
				</ul>
			</Block>
			<Block>
				<div className="flex justify-between mb-3">
					<h4 className="text-xl">Produto</h4>{" "}
					<p className="text-lg">
						<span className="text-neutral-500">Itens:</span>{" "}
						{userNfProducts?.length}
					</p>
				</div>
				{userNfProducts ? (
					<ul className="flex gap-2 flex-wrap">
						{userNfProducts.map((u) => (
							<li key={u.Id} className="flex gap-5 flex-wrap flex-auto">
								<Item
									title="Código do Produto"
									dataInfo={u.MaterialNumber__c.slice(10, 20)}
									className="flex"
								/>
								<Item
									title="Produto"
									dataInfo={u.Name}
									className="!flex-[10]"
								/>
								<Item title="Quantidade" dataInfo={u.Amount__c.slice(0, 1)} />
							</li>
						))}
					</ul>
				) : (
					<p>Carregando...</p>
				)}
			</Block>
			{isFetched && (
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
