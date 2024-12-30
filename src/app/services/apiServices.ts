import { Connection } from "jsforce";
import type {
	Cases,
	InvoiceWithHistoryObject,
	NfProducts,
	User,
} from "../types/Invoice";

type connProps = {
	connection: Connection | null;
};
export type getDataByNFProps = connProps & {
	serie: string;
	nf: string;
};
export type getByIdProps = connProps & {
	id?: string;
};

const instanceUrl = ({ connection }: connProps) => {
	if (connection) {
		connection.instanceUrl =
			"https://cors-anywhere.herokuapp.com/https://bemoldigital.lightning.force.com";
	}
};

export const getDataByNF = async ({
	connection,
	serie,
	nf,
}: getDataByNFProps) => {
	if (!connection) {
		console.log("Conexão não estabelecida");
		return;
	}
	instanceUrl({ connection });

	try {
		const res = await connection.query<InvoiceWithHistoryObject>(
			`SELECT NinePositionsDocumentNumber__c , EnderecoEntrega__c, BairroEntrega__c, NameOne__c, Referencia__c, CidadeEstadoEntrega__c, CepEntrega__c, AccountLookup__c, Id, CacHistory__c 
            FROM Invoice__c 
            WHERE NinePositionsDocumentNumber__c = '${nf}'
            AND Serie__c = '${serie}'
            `,
		);

		if (res.records) {
			const parsedRecords = res.records.map((record) => ({
				...record,
				CacHistory__c: JSON.parse(record.CacHistory__c),
			}));
			return res.records;
		}
		console.log("A consulta não retornou resultados:", res);
	} catch (error) {
		console.error("Erro na execução da consulta:", error);
	}
};

export const getNfProducts = async ({ connection, id }: getByIdProps) => {
	if (!connection) {
		console.log("Conexão não estabelecida");
		return;
	}
	instanceUrl({ connection });
	try {
		const res = await connection.query<NfProducts>(
			`SELECT Name , Id, MaterialNumber__c,Amount__c  FROM InvoiceItems__c WHERE InvoiceId__c = '${id}'`,
		);
		if (res?.records) {
			return res.records;
		}
		console.log("A consulta não retornou resultados:", res);
	} catch (error) {
		console.error("Erro na execução da consulta:", error);
	}
};
export const getUser = async ({ connection, id }: getByIdProps) => {
	if (!connection) {
		console.log("Conexão não estabelecida");
		return;
	}
	instanceUrl({ connection });
	try {
		const res = await connection.query<User>(
			`SELECT DDDPhone__c, DDDPhoneTwo__c, Email__c,ExternalId__c FROM Account WHERE Id = '${id}'`,
		);
		if (res.records) {
			return res.records;
		}
		console.log("A consulta não retornou resultados:", res);
	} catch (error) {
		console.error("Erro na execução da consulta:", error);
	}
};

export const getCases = async ({ connection, id }: getByIdProps) => {
	if (!connection) {
		console.log("Conexão não estabelecida");
		return;
	}
	instanceUrl({ connection });
	try {
		const res = await connection.query<Cases>(
			`SELECT Id, CaseNumber, Serie_Nf__c, CLI__c,  ClientName__c , CreatedDate, CheckIn__c FROM Case where RecordTypeId = '012HY0000004HnQYAU' and IsClosed = false  and OwnerId = '${id}'`,
		);
		if (res.records) {
			return res.records;
		}
		console.log("A consulta não retornou resultados:", res);
	} catch (error) {
		console.error("Erro na execução da consulta:", error);
	}
};

export const conn = async () => {
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
		return newConnection;
	} catch (error) {
		console.error("Erro na conexão ou consulta:", error);
	}
};
