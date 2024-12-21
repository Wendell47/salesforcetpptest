import type { Invoice, InvoiceWithHistoryObject, NfProducts, User } from "@/app/types/Invoice";
import { create } from "zustand";

type dataStoreProps = {
	invoice: InvoiceWithHistoryObject[];
	user: User[];
	NfProducts: NfProducts[];
	setUser: (users: User[]) => void;
	setNfPRoducts: (products: NfProducts[]) => void;
	setInvoice: (invoices: InvoiceWithHistoryObject[]) => void; 
	addInvoice: (invoice: InvoiceWithHistoryObject) => void
};

const useInvoiceStore = create<dataStoreProps>((set) => ({
	invoice: [],
	user: [],
	NfProducts: [],
	setUser: (users) => set(({ user: users })),
	setNfPRoducts: (products) => set({ NfProducts: products }),
	setInvoice: (invoices) => set({ invoice: invoices }), 
	addInvoice: (invoice) => set((state) => ({ invoice: [...state.invoice, invoice] })),
}));

export { useInvoiceStore };
