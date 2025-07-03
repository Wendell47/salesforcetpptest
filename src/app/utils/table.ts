import type { Cases } from "../types/Invoice";

const titles: Cases = {
	ClientName__c: "Nome",
	CLI__c: "CLI",
	Serie_Nf__c: "Série",
	CaseNumber: "Caso",
	CreatedDate: "Data de Criação",
	Id: "Id",
	Description: "Descrição",
	District__c: "Bairro",
	CheckIn__c: "Check-in",
	InvoiceItemsId__r:{
		Name: "Nome"
	},
	SAC_Responsavel__c: "Responsável SAC",
	StatusTxt__c: "Status",
	Reason: "Motivo",
	Invoice__r: {
		BairroEntrega__c: "Bairro Entrega",
		CidadeEstadoEntrega__c: "Cidade/Estado Entrega",
		NinePositionsDocumentNumber__c: "Número do Documento",
	},
	OwnerId: "Proprietário",
	PriorityTxt__c: "Prioridade",
	
};

export default titles;
