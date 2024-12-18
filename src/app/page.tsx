"use client";
import { useEffect, useState } from "react";
import { Connection, type Schema } from "jsforce";
import type { HistoricoCac, Invoice, User } from "./types/Invoice";
import Input from "./components/input";
import Item from "./components/Item";

type InvoiceWithHistory = Invoice & { CacHistory__c: string };
type InvoiceWithHistoryObject = Invoice & { CacHistory__c: HistoricoCac[] };
export default function Home() {
	const [result, setResult] = useState<InvoiceWithHistoryObject[]>([]);
	const [user, setUser] = useState<User[]>([]);
	const [nf, setNf] = useState<string>("");
	const [connection, setConnection] = useState<Connection<Schema> | null>(null);

	const getDataByNF = async () => {
		setResult([]);

		if (!connection) {
			console.log("Conexão não estabelecida");
			return;
		}
		connection.instanceUrl =
			"https://cors-anywhere.herokuapp.com/https://bemoldigital.lightning.force.com";
		try {
			const res = await connection.query<Invoice>(
				`SELECT NinePositionsDocumentNumber__c, EnderecoEntrega__c, Neighborhood__c, NameOne__c, Referencia__c, CidadeEstadoEntrega__c, CepEntrega__c, AccountLookup__c, Id,CacHistory__c FROM Invoice__c WHERE Name = '${nf}'`,
			);

			if (res?.records) {
				const parsedRecords = res.records.map((record) => ({
					...record,
					CacHistory__c: JSON.parse(record.CacHistory__c),
				}));
				setResult(parsedRecords);
				console.log("Resultados da consulta:", parsedRecords[0].CacHistory__c);
			} else {
				console.log("A consulta não retornou resultados:", res);
			}
		} catch (error) {
			console.error("Erro na execução da consulta:", error);
		}
	};

	const getUser = async (id: string) => {
		setUser([]);

		if (!connection) {
			console.log("Conexão não estabelecida");
			return;
		}
		connection.instanceUrl =
			"https://cors-anywhere.herokuapp.com/https://bemoldigital.lightning.force.com";
		try {
			const res = await connection.query<User>(
				`SELECT DDDPhone__c, DDDPhoneTwo__c, Email__c FROM Account WHERE Id = '${id}'`,
			);
			if (res?.records) {
				console.log("Resultados da consulta:", res.records);
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
		conn();
	}, []);

	// Trigger getUser whenever result changes
	useEffect(() => {
		if (result.length > 0) {
			getUser(result[0].AccountLookup__c);
		}
	}, [result]);

	return (
		<div className="max-w-lg w-full flex gap-2 flex-col">
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
						onChange={(e) => setNf(e.target.value)}
						maxLength={9}
						className="flex-1"
					/>

					<button
						type="button"
						className="p-2 rounded-lg bg-blue-600 text-blue-100 font-bold flex-1"
						onClick={getDataByNF}
					>
						Buscar
					</button>
				</form>
			</div>
			<div className="p-6 bg-neutral-800 rounded-lg">
				{result.length > 0 ? (
					<ul>
						{result.map((record) => (
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
					<div className="flex gap-2 flex-wrap">
						<ul>
							{user.map((u) => (
								<li key={u.Id} className="flex gap-5 flex-wrap">
									<Item title="Contato Principal" dataInfo={u.DDDPhone__c} />
									<Item
										title="Contato Secundário"
										dataInfo={u.DDDPhoneTwo__c}
									/>
								</li>
							))}
						</ul>
					</div>
				) : (
					<p>Carregando...</p>
				)}
			</div>
		</div>
	);
}
