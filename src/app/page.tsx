"use client";
import { useEffect, useState } from "react";
import { Connection, type Schema } from "jsforce";
import type { Invoice, NfProducts, User } from "./types/Invoice";
import Input from "./components/input";
import Item from "./components/Item";
import { useInvoiceStore } from "./hooks/stores/dataStore";
import { NotepadText } from "lucide-react";
import {useRouter} from 'next/navigation'

export default function Home() {
	const router = useRouter()
	const { invoice, NfProducts, user, connection,setUser,setNfPRoducts,setConnection,setInvoice } = useInvoiceStore();
	const [nf, setNf] = useState<string>("");
	const [serie, setSerie] = useState<string>("104");

	const getDataByNF = async () => {
		if (!connection) {
			console.log("Conexão não estabelecida");
			return;
		}
		connection.instanceUrl =
			"https://cors-anywhere.herokuapp.com/https://bemoldigital.lightning.force.com";

		try {
			const res = await connection.query<Invoice>(
				`SELECT NinePositionsDocumentNumber__c , EnderecoEntrega__c, Neighborhood__c, NameOne__c, Referencia__c, CidadeEstadoEntrega__c, CepEntrega__c, AccountLookup__c, Id, CacHistory__c 
				FROM Invoice__c 
				WHERE NinePositionsDocumentNumber__c = '${nf}'
				AND Serie__c = '${serie}'
				`,
			);

			if (res?.records) {
				const parsedRecords = res.records.map((record) => ({
					...record,
					CacHistory__c: JSON.parse(record.CacHistory__c),
				}));
				setInvoice(parsedRecords);
				console.log("Resultados da consulta:", parsedRecords[0]);
			} else {
				console.log("A consulta não retornou resultados:", res);
			}
		} catch (error) {
			console.error("Erro na execução da consulta:", error);
		}
	};

	const getNfProducts = async (id: string) => {
		if (!connection) {
			console.log("Conexão não estabelecida");
			return;
		}

		connection.instanceUrl =
			"https://cors-anywhere.herokuapp.com/https://bemoldigital.lightning.force.com";
		try {
			const res = await connection.query<NfProducts>(
				`SELECT Name , Id, MaterialNumber__c,Amount__c  FROM InvoiceItems__c WHERE InvoiceId__c = '${id}'`,
			);
			if (res?.records) {
				console.log("Resultados da consulta:");
				setNfPRoducts(res.records);
			} else {
				console.log("A consulta não retornou resultados:", res);
			}
		} catch (error) {
			console.error("Erro na execução da consulta:", error);
		}
	};
	const getUser = async (id: string) => {
		if (!connection) {
			console.log("Conexão não estabelecida");
			return;
		}
		connection.instanceUrl =
			"https://cors-anywhere.herokuapp.com/https://bemoldigital.lightning.force.com";
		try {
			const res = await connection.query<User>(
				`SELECT DDDPhone__c, DDDPhoneTwo__c, Email__c,ExternalId__c FROM Account WHERE Id = '${id}'`,
			);
			if (res?.records) {
				console.log("Resultados da consulta:");
				setUser(res.records);
			} else {
				console.log("A consulta não retornou resultados:", res);
			}
		} catch (error) {
			console.error("Erro na execução da consulta:", error);
		}
	};

	useEffect(() => {
		const conn = async () => {
			const newConnection = new Connection({
				loginUrl:
					"https://cors-anywhere.herokuapp.com/https://bemoldigital.my.salesforce.com",
			});

			try {
				await newConnection.login(
					"wendelcordova@bemol.com.br",
					"Reflexo@2024UQvmKdhsgEupPZs22Q6AAnE1",
				);
				console.log("Conectado com sucesso!");
				setConnection(newConnection);
			} catch (error) {
				console.error("Erro na conexão ou consulta:", error);
			}
		};
		if (invoice.length === 0) {
			conn();
		}
	}, []);

	// Trigger getUser whenever result changes
	useEffect(() => {
		if (invoice.length > 0) {
			getUser(invoice[0].AccountLookup__c);
			getNfProducts(invoice[0].Id);
		}
	}, [invoice]);

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
						className="p-2 rounded-lg bg-blue-600 text-blue-100 font-bold flex-1"
						onClick={getDataByNF}
					>
						Buscar
					</button>
				</form>
				<div></div>
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
									<Item title="Bairro" dataInfo={record.Neighborhood__c} />
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
				<div className="flex justify-between mb-3"><h4 className="text-xl">Produto</h4> <p className="text-lg"><span className="text-neutral-500">Itens:</span> {NfProducts.length}</p></div>
				{NfProducts.length > 0 ? (
					<ul className="flex gap-2 flex-wrap">
						{NfProducts.map((u) => (
							<li key={u.Id} className="flex gap-5 flex-wrap flex-auto">
								<Item title="Código do Produto" dataInfo={u.MaterialNumber__c} className="flex" />
								<Item title="Produto" dataInfo={u.Name}  className="!flex-[10]"/>
								<Item title="Quantidade" dataInfo={u.Amount__c}  />
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
						onClick={() => router.push('/RCForm')}
					>
						<NotepadText /> Gerar formulario
					</button>
				</div>
			)}
		</div>
	);
}
