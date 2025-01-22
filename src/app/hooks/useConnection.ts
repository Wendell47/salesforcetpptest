import { use, useEffect,useState } from "react";
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
			const data = await getDataByNF({ connection, nf, serie });
			if (data && data.length > 0) {
				setInvoice(data);
				userData(data[0].AccountLookup__c);
				NfProductsData(data[0].Id);
			}else{
				setNotFound(true);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
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
	return { getData, Cases,notFound };
};

export { useConnection };
