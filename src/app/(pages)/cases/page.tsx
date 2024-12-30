"use client";
import Item from "@/app/components/Item";
import { useInvoiceStore } from "@/app/hooks/stores/dataStore";
import { useConnection } from "@/app/hooks/useConnection";
import { useEffect } from "react";

export default function Cases() {
	const { invoice, cases } = useInvoiceStore();
	const { Cases } = useConnection();

	useEffect(() => {
		Cases("00GHY000000NGti2AG");
	}, [Cases]);
	return (
		<div>
			{cases.map((record) => (
				<div key={record.Id} className="flex gap-2 flex-wrap">
					<div className="flex gap-2 flex-wrap">
						<Item title="Nome" dataInfo={record.ClientName__c} />
						<Item title="Status" dataInfo={record.CLI__c} />
						<Item title="Tipo" dataInfo={record.Divisao__c} />
						<Item title="Descrição" dataInfo={record.Serie_Nf__c} />
						<Item title="Descrição" dataInfo={record.CaseNumber} />
						<Item title="Descrição" dataInfo={record.CreatedDate} />
					</div>
				</div>
			))}
		</div>
	);
}
