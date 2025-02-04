import { useEffect, useState } from "react";
import { useInvoiceStore } from "./stores/dataStore";
import type {
	Cases,
	InvoiceWithHistoryObject,
	NfProducts,
	User,
} from "../types/Invoice";
import type { Connection, Schema } from "jsforce";
import apiClient from "../services/apiClient";

const useConnection = () => {
	const {
		invoice,
		setUser,
		setIsLoading,
		setCases,
		setNfPRoducts,
		setConnection,
		setInvoice,
	} = useInvoiceStore();
	const [notFound, setNotFound] = useState(false);

	const getData = async (nf: string, serie: string) => {
		try {
			setIsLoading(true);
			const { data } = await apiClient.get<InvoiceWithHistoryObject[]>(
				"/clientNf",
				{ params: { nf, serie } },
			);
			if (data && data.length > 0) {
				setIsLoading(false);
				setInvoice(data);
				userData(data[0].AccountLookup__c);
				NfProductsData(data[0].Id);
			} else {
				setNotFound(true);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const userData = async (id: string) => {
		try {
			const { data } = await apiClient.get<User[]>("/user", {
				params: { id },
			});
			if (data) {
				setUser(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const NfProductsData = async (id: string) => {
		try {
			const { data } = await apiClient.get<NfProducts[]>("/nfproducts", {
				params: { id },
			});
			if (data) {
				setNfPRoducts(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const Cases = async (id: string) => {
		try {
			const { data } = await apiClient.get<Cases[]>("/cases", {
				params: { id },
			});
			if (data) {
				setCases(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (invoice.length === 0) {
			const fetchData = async () => {
				try {
					const { data } = await apiClient.get<Connection<Schema>>("/");
					if (data) {
						setConnection(data);
						console.log("Connected to Salesforce");
					}
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
		}
	}, [invoice.length, setConnection]);

	return { getData, Cases, notFound };
};

export { useConnection };
