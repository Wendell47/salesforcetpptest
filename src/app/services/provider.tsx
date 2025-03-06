"use client";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	type Persister,
	PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

export default function Provider({ children }: PropsWithChildren) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				gcTime: 1000 * 60 * 60 * 24, // 24 hours
			},
		},
	});

	const [persister, setPersister] = useState<Persister>();

	useEffect(() => {
		if (typeof window !== "undefined") {
			setPersister(
				createSyncStoragePersister({
					storage: window.localStorage,
				}),
			);
		}
	}, []);

	if (!persister) {
		return null; // Retorna null ou um carregamento enquanto o persister é configurado
	}

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			{children}
		</PersistQueryClientProvider>
	);
}
