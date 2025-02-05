"use client";
import Item from "@/app/components/Item";
import Table from "@/app/components/table";
import { useInvoiceStore } from "@/app/hooks/stores/dataStore";
import { useConnection } from "@/app/hooks/useConnection";
import { useEffect } from "react";

export default function Cases() {
	const { cases } = useInvoiceStore();
	const { Cases } = useConnection();

	useEffect(() => {
		Cases("00GHY000000NGti2AG");
	}, []);

	const titles = {
		ClientName__c: "Nome",
		CLI__c: "CLI",
		Divisao__c: "Divisão",
		Serie_Nf__c: "Série",
		CaseNumber: "Caso",
		CreatedDate: "Data de Criação",
	};
	return (
		<Table>
			<Table.Thead>
				<tr>
					<Table.Th title={titles.ClientName__c} />
					<Table.Th title={titles.CLI__c} />
					<Table.Th title={titles.Divisao__c} />
					<Table.Th title={titles.Serie_Nf__c} />
					<Table.Th title={titles.CaseNumber} />
					<Table.Th title={titles.CreatedDate} />
				</tr>
			</Table.Thead>
			<Table.Tbody>
				{cases.map((record) => (
					<tr key={record.Id}>
						<Table.Th title={record.ClientName__c} />
						<Table.Th title={record.CLI__c} />
						<Table.Th title={record.Divisao__c} />
						<Table.Th title={record.Serie_Nf__c} />
						<Table.Th title={record.CaseNumber} />
						<Table.Th
							title={new Date(record.CreatedDate).toLocaleDateString("pt-BR")}
						/>
					</tr>
				))}
			</Table.Tbody>
		</Table>
	);
}
