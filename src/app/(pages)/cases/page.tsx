"use client";
import Table from "@/app/components/table";
import { useInvoiceStore } from "@/app/hooks/stores/dataStore";
import { useConnection } from "@/app/hooks/useConnection";
import titles from "@/app/utils/table";
import { useEffect, useState } from "react";

export default function Cases() {
	const { getCases } = useConnection();
	const [isGrouped, setGrouped] = useState(false);

	const { data: cases } = getCases("012HY0000004HnPYAU");

	const groupedCases = () =>
		cases ? Object.groupBy(cases, ({ Divisao__c }) => Divisao__c) : [];
	
	return (
		<Table>
			<Table.Thead>
				<tr>
					<Table.Th title={titles.CaseNumber} />
					<Table.Th title={titles.ClientName__c} />
					<Table.Th title={titles.SAC_Responsavel__c} />
					<Table.Th title={titles.Invoice__r.NinePositionsDocumentNumber__c} />
					<Table.Th title={titles.Serie_Nf__c} />
					<Table.Th title={titles.InvoiceItemsId__r.Name} />
					<Table.Th title={titles.Invoice__r.BairroEntrega__c} />
					<Table.Th title={titles.PriorityTxt__c} />
					<Table.Th title={titles.StatusTxt__c} />
					<Table.Th title={titles.CLI__c} />
					<Table.Th title={titles.CreatedDate} />
					<Table.Th title={titles.Id} />
					<Table.Th title={titles.Reason} />
					<Table.Th title={titles.OwnerId} />
					<Table.Th title={titles.Invoice__r.CidadeEstadoEntrega__c} />

				</tr>
			</Table.Thead>
			<Table.Tbody>
				{cases?.map((record) => (
					<tr key={record.Id} className="hover:bg-sky-950 transition">
						{Object.entries(record).map(([key, value]) => (
							 <Table.Th key={key} title={value} />
						))}
						
					</tr>
				))}
			</Table.Tbody>
		</Table>
	);
}
