import apiClient from "@/app/services/apiClient";
import type{ Cases, InvoiceWithHistoryObject, NfProducts, User } from "@/app/types/Invoice";

import type { Connection,Schema } from "jsforce";

type fetchDataProps<
	T extends
		| User[]
		| Cases[]
		| NfProducts[]
		| InvoiceWithHistoryObject[]
		| Connection<Schema>,
> = {
	params?: Record<string, string>;
	url: "/clientNf" | "/user" | "/nfproducts" | "/cases" | "/";
	setData: (data: T) => void;
};

const fetchData = async <
		T extends
			| User[]
			| Cases[]
			| NfProducts[]
			| InvoiceWithHistoryObject[]
			| Connection<Schema>,
	>({
		params,
		url,
		setData,
	}: fetchDataProps<T>) => {
		try {
			const { data } = await apiClient.get<T>(url, {
				params,
			});
			if (data) {
				setData(data);
				return data;
			}
		} catch (error) {
			console.log(error);
		}
	};

    export { fetchData };