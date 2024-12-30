export interface Invoice {
	NinePositionsDocumentNumber__c: string;
	EnderecoEntrega__c: string;
	BairroEntrega__c: string;
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
export interface cacHistoryC{
	E_DATA_PROV_ENTREGA: string
	E_DATA_PROV_MONTAGEM: string
	E_MESSAGE: string
	E_STATUS: string
	T_HISTORICO_CAC: HistoricoCac[]
	T_INFO:string 
	T_NF_HEADER: string
	T_NF_ITEM: string
	T_STATUS_TRANSPORTE: string
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


export interface Cases{
	Id:string;
	ClientName__c:string
	CaseNumber:string
	Serie_Nf__c:string
	CLI__c:string
	CreatedDate:Date
	CheckIn__c:Date
	Divisao__c:string
}
export type InvoiceWithHistoryObject = Invoice & {
	CacHistory__c: cacHistoryC;
};
