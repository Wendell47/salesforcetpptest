import { useState } from "react";

import type { Connection } from "jsforce";
import { fetchData } from "./util/fetchData";
import type {
	Cases,
	InvoiceWithHistoryObject,
	NfProducts,
	setSearchParamsProps,
	User,
} from "../types/Invoice";
import { useQuery } from "@tanstack/react-query";

const useConnection = () => {
	const [notFound, setNotFound] = useState(false);
	const [invoiceID, setInvoiceID] = useState("");
	const [accountLookupID, setAccountLookupID] = useState("");
	const [searchParams, setSearchParams] = useState<setSearchParamsProps>({});

	const invoice = useQuery({
		queryKey: ["invoice", searchParams],
		queryFn: async () => {
			const data = await fetchData<InvoiceWithHistoryObject[]>({
				url: "/clientNf",
				params: searchParams,
			});
			if (data && data.length > 0) {
				setInvoiceID(data[0].Id);
				setAccountLookupID(data[0].AccountLookup__c);
			} else {
				setNotFound(true);
			}
			return data;
		},
		enabled: !!searchParams.nf || !!searchParams.serie,
	});

	const userData = useQuery({
		queryKey: ["user", { id: accountLookupID }],
		queryFn: () =>
			fetchData<User[]>({
				url: "/user",
				params: { id: invoice.data?.[0]?.AccountLookup__c as string },
			}),
		enabled: !!invoice.data && !!invoice.data[0].AccountLookup__c,
	});

	const userProductsData = useQuery({
		queryKey: ["nfproducts", { id: invoiceID }],
		queryFn: () =>
			fetchData<NfProducts[]>({
				url: "/nfproducts",
				params: { id: invoice.data?.[0]?.Id as string },
			}),
		enabled: !!invoice.data && !!invoice.data[0]?.Id,
	});

	const getCases = (id: string) =>
		fetchData<Cases[]>({
			url: "/cases",
			params: { id: id },
		});

	const Connection = useQuery({
		queryKey: ["Connection"],
		queryFn: () =>
			fetchData<Connection[]>({
				url: "/",
			}),
	});

	return {
		getCases,
		setSearchParams,
		invoice,
		userData,
		searchParams,
		userProductsData,
		Connection,
		notFound,
	};
};

export { useConnection };
