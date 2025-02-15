import { useEffect, useState } from "react";
import { useInvoiceStore } from "./stores/dataStore";
import type { Connection, Schema } from "jsforce";
import { fetchData } from "./util/fetchData";

const useConnection = () => {
	const {
		invoice,
		setUser,
		connection,
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

			const data = await fetchData({
				params: { nf: nf, serie: serie },
				url: "/clientNf",
				setData: setInvoice,
			});

			if (data && data.length > 0) {
				await Promise.all([
					fetchData({
						params: { id: data[0].AccountLookup__c },
						url: "/user",
						setData: setUser,
					}),
					fetchData({
						params: { id: data[0].Id },
						url: "/nfproducts",
						setData: setNfPRoducts,
					}),
				]);
			} else {
				setNotFound(true);
			}
		} catch (error) {
			console.error("Falha ao buscar dados", error);
		} finally {
			setIsLoading(false);
		}
	};

	const Cases = () =>
		fetchData({
			url: "/cases",
			setData: setCases,
		});

	useEffect(() => {
		if (invoice.length === 0 && connection === null) {
			fetchData({
				url: "/",
				setData: setConnection as (data: Connection<Schema>) => void,
			});
		}
	}, [invoice.length, connection, setConnection]);

	return { getData, Cases, notFound };
};

export { useConnection };
