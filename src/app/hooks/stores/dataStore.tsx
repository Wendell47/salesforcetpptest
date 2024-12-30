import type {
	Cases,
	Invoice,
	InvoiceWithHistoryObject,
	NfProducts,
	User,
} from "@/app/types/Invoice";
import { create } from "zustand";
import type { Connection, Schema } from "jsforce";

type dataStoreProps = {
	invoice: InvoiceWithHistoryObject[];
	user: User[];
	connection: Connection<Schema> | null;
	NfProducts: NfProducts[];
	cases: Cases[];
	setUser: (users: User[]) => void;
	setCases: (users: Cases[]) => void;
	setConnection: (connection: Connection<Schema> | null) => void;
	setNfPRoducts: (products: NfProducts[]) => void;
	setInvoice: (invoices: InvoiceWithHistoryObject[]) => void;
	addInvoice: (invoice: InvoiceWithHistoryObject) => void;
};

const useInvoiceStore = create<dataStoreProps>((set) => ({
	invoice: [],
	user: [],
	connection: null,
	NfProducts: [],
	cases: [],
	setCases: (cases) => set({ cases: cases }),
	setConnection: (con) => set({ connection: con }),
	setUser: (users) => set({ user: users }),
	setNfPRoducts: (products) => set({ NfProducts: products }),
	setInvoice: (invoices) => set({ invoice: invoices }),
	addInvoice: (invoice) =>
		set((state) => ({ invoice: [...state.invoice, invoice] })),
}));

export { useInvoiceStore };
