import type {
	Cases,
	InvoiceWithHistoryObject,
	NfProducts,
	setSearchParamsProps,
	User,
} from "@/app/types/Invoice";
import { create } from "zustand";
import type { Connection, Schema } from "jsforce";

type dataStoreProps = {
	invoice: InvoiceWithHistoryObject[];
	user: User[];
	isLoading: boolean;
	connection: Connection<Schema> | null;
	NfProducts: NfProducts[];
	cases: Cases[];
	searchParams: setSearchParamsProps;
	setSearchParams: (searchParams: setSearchParamsProps) => void;
	setUser: (users: User[]) => void;
	setCases: (users: Cases[]) => void;
	setIsLoading: (loading: boolean) => void;
	setConnection: (connection: Connection<Schema> | null) => void;
	setNfPRoducts: (products: NfProducts[]) => void;
	setInvoice: (invoices: InvoiceWithHistoryObject[]) => void;
	addInvoice: (invoice: InvoiceWithHistoryObject) => void;
};

const useInvoiceStore = create<dataStoreProps>((set) => ({
	invoice: [],
	user: [],
	isLoading: false,
	connection: null,
	NfProducts: [],
	cases: [],
	searchParams: {},
	setSearchParams: (searchParams) => set({ searchParams: searchParams }),
	setIsLoading: (loading) => set({ isLoading: loading }),
	setCases: (cases) => set({ cases: cases }),
	setConnection: (con) => set({ connection: con }),
	setUser: (users) => set({ user: users }),
	setNfPRoducts: (products) => set({ NfProducts: products }),
	setInvoice: (invoices) => set({ invoice: invoices }),
	addInvoice: (invoice) =>
		set((state) => ({ invoice: [...state.invoice, invoice] })),
}));

export { useInvoiceStore };
