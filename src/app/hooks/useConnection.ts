import { useState } from "react";

import type { Connection } from "jsforce";
import { fetchData } from "./util/fetchData";
import type {
	Cases,
	data,
	InvoiceWithHistoryObject,
	NfProducts,
	setSearchParamsProps,
	User,
} from "../types/Invoice";
import { useQuery } from "@tanstack/react-query";
import { useInvoiceStore } from "./stores/dataStore";

const useConnection = () => {
	const [notFound, setNotFound] = useState(false);
	const { searchParams, setSearchParams } = useInvoiceStore();

	const invoice = useQuery({
		queryKey: ["invoice", searchParams],
		queryFn: async () => {
			const data = await fetchData<data>({
				url: "/clientNf",
				params: searchParams,
			});
			if (!data) {
				setNotFound(true);
			}
			return data;
		},
		enabled: !!searchParams.nf || !!searchParams.serie,
	});

	const getCases = (id: string) =>
		useQuery({
			queryKey: ["getcases"],
			queryFn: () =>
				fetchData<Cases[]>({
					url: "/cases",
					params: { id: id },
				}),
		});

	const Connection = useQuery({
		queryKey: ["Connection"],
		queryFn: () =>
			fetchData<Connection[]>({
				url: "/",
			}),
		enabled: !!setSearchParams,
	});

	return {
		getCases,
		setSearchParams,
		invoice,
		//userData,
		searchParams,
		//userProductsData,
		Connection,
		notFound,
	};
};

export { useConnection };
