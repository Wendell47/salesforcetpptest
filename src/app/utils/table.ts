import type { Cases } from "../types/Invoice";

const titles: Record<keyof Cases, string> = {
	ClientName__c: "Nome",
	CLI__c: "CLI",
	Divisao__c: "Divisão",
	Serie_Nf__c: "Série",
	CaseNumber: "Caso",
	CreatedDate: "Data de Criação",
	CheckIn__c: "",
	Id: "",
	Description: "Descrição",
};

export default titles;
