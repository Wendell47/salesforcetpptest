"use client";
import Table from "@/app/components/table";
import { useInvoiceStore } from "@/app/hooks/stores/dataStore";
import { useConnection } from "@/app/hooks/useConnection";
import titles from "@/app/utils/table";
import { useEffect } from "react";

export default function Cases() {
	const { cases } = useInvoiceStore();
	const { getCases } = useConnection();

	useEffect(() => {
		getCases("00GHY000000NGti2AG");
	}, []);

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
					<Table.Th title={titles.Description} />
				</tr>
			</Table.Thead>
			<Table.Tbody>
				{cases.map((record) => (
					<tr key={record.Id} className="hover:bg-sky-950 transition">
						<Table.Th title={record.ClientName__c} />
						<Table.Th title={record.CLI__c} />
						<Table.Th title={record.Divisao__c} />
						<Table.Th title={record.Serie_Nf__c} />
						<Table.Th title={record.CaseNumber} />
						<Table.Th
							title={new Date(record.CreatedDate).toLocaleDateString("pt-BR")}
						/>
						<Table.Th title={record.Description} />
					</tr>
				))}
			</Table.Tbody>
		</Table>
	);
}
