import { use, useEffect } from "react";
import {
	conn,
	getCases,
	getDataByNF,
	getNfProducts,
	getUser,
} from "../services/apiServices";
import { useInvoiceStore } from "./stores/dataStore";

const useConnection = () => {
	const {
		invoice,
		connection,
		setUser,
		setCases,
		setNfPRoducts,
		setConnection,
		setInvoice,
	} = useInvoiceStore();

	const getData = async (nf: string, serie: string) => {
		try {
			const data = await getDataByNF({ connection, nf, serie });
			if (data) {
				setInvoice(data);
				userData(data[0].AccountLookup__c);
				NfProductsData(data[0].Id);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const userData = async (id: string) => {
		try {
			const data = await getUser({ connection, id });
			if (data) {
				setUser(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const NfProductsData = async (id: string) => {
		try {
			const data = await getNfProducts({ connection, id });
			if (data) {
				setNfPRoducts(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const Cases = async (id: string) => {
		try {
			const data = await getCases({ connection, id });
			if (data) {
				setCases(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (invoice.length === 0) {
			conn()
				.then((connection) => {
					if (connection) {
						setConnection(connection);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [invoice.length, setConnection]);
	return { getData, Cases };
};

export { useConnection };
