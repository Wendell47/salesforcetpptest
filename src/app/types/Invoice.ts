export interface Invoice {
	NinePositionsDocumentNumber__c: string;
	EnderecoEntrega__c: string;
	Neighborhood__c: string;
	NameOne__c: string;
	Referencia__c: string;
	CidadeEstadoEntrega__c: string;
	CepEntrega__c: string;
	AccountLookup__c: string;
	Id: string;
	CacHistory__c: string;
}

export interface HistoricoCac {
	OCORRENCIA: string;
	LOJA: string;
	ID_CONTATO: string;
	HORA: string;
	DESCRICAO: string;
	DATA: string;
	AUTOR: string;
}
export interface User {
	Id: string;
	ExternalId__c:string;
	DDDPhone__c: string;
	DDDPhoneTwo__c: string;
	Email__c: string;
}

export interface NfProducts{
	Id:string;
	Name:string;
	Amount__c: string;
	MaterialNumber__c: string;
}
export interface UserContacts {
	Name: string;
	Phone: string;
}

export type InvoiceWithHistoryObject = Invoice & {
	CacHistory__c: HistoricoCac[];
};
