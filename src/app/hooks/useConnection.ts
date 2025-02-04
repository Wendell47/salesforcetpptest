import { useEffect } from "react";
import { useInvoiceStore } from "./stores/dataStore";
import axios from "axios";
import type {
	Cases,
	InvoiceWithHistoryObject,
	NfProducts,
	User,
} from "../types/Invoice";
import type { Connection, Schema } from "jsforce";

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

	const getData = async (nf: string, serie: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<InvoiceWithHistoryObject[]>(
				"http://localhost:3000/clientNf",
				{ params: { nf, serie } },
			);
			if (data) {
				setIsLoading(false);
				setInvoice(data);
				userData(data[0].AccountLookup__c);
				NfProductsData(data[0].Id);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const userData = async (id: string) => {
		try {
			const { data } = await axios.get<User[]>("http://localhost:3000/user", {
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
			const { data } = await axios.get<NfProducts[]>(
				"http://localhost:3000/nfproducts",
				{
					params: { id },
				},
			);
			if (data) {
				setNfPRoducts(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const Cases = async (id: string) => {
		try {
			const { data } = await axios.get<Cases[]>("http://localhost:3000/cases", {
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
					const { data } = await axios.get<Connection<Schema>>(
						"http://localhost:3000/",
					);
					if (data) {
						setConnection(data);
					}
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
		}
	}, [invoice.length, setConnection]);

	return { getData, Cases };
};

export { useConnection };
