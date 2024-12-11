"use client";
import { useEffect, useState } from "react";
import { Connection, QueryResult, type Schema } from "jsforce";

interface Invoice {

    NinePositionsDocumentNumber__c: string;
    EnderecoEntrega__c: string;
    Neighborhood__c: string;
    NameOne__c: string;
    Referencia__c: string;
    CidadeEstadoEntrega__c: string;
    CepEntrega__c: string;
}

export default function Home() {
    const [result, setResult] = useState<Invoice[]>([]);
    const [nf, setNf] = useState<string>("");
    const [connection, setConnection] = useState<Connection<Schema> | null>(null);

    const conn = async () => {
        const newConnection = new Connection({
            loginUrl:
                "https://cors-anywhere.herokuapp.com/https://bemoldigital.my.salesforce.com",
        });

        try {
            await newConnection.login(
                "wendelcordova@bemol.com.br",
                "Reflexo@2024UQvmKdhsgEupPZs22Q6AAnE1",
            );
            console.log("Conectado com sucesso!");
            setConnection(newConnection);
        } catch (error) {
            console.error("Erro na conexão ou consulta:", error);
        }
    };

    const getDataByNF = async () => {
        setResult([]);

        if (!connection) {
            console.log("Conexão não estabelecida");
            return;
        }
        connection.instanceUrl =
            "https://cors-anywhere.herokuapp.com/https://bemoldigital.lightning.force.com";
        try {
            const res = await connection.query<Invoice>(
                `SELECT NinePositionsDocumentNumber__c, EnderecoEntrega__c, Neighborhood__c, NameOne__c, Referencia__c, CidadeEstadoEntrega__c, CepEntrega__c FROM Invoice__c WHERE Name = '${nf}'`,
            );

            if (res?.records) {
                console.log("Resultados da consulta:", res.records);
                setResult(res.records); // Armazena os resultados no estado
            } else {
                console.log("A consulta não retornou resultados:", res);
            }
        } catch (error) {
            console.error("Erro na execução da consulta:", error);
        }
    };

    useEffect(() => {
        conn();
    }, []);

    return (
        <div className="max-w-96 w-full">
            <h1 className="font-bold text-2xl mb-3">Consulta de Nota</h1>

            <form className="flex flex-col gap-4 mb-5">
                <label htmlFor="nf">NotaFiscal</label>
                <input
                    id="nf"
                    placeholder="00505050"
                    className="p-2 bg-neutral-800 rounded-lg"
                    maxLength={9}
                    onChange={(e) => setNf(e.target.value)}
                />
                <button
                    type="button"
                    className="p-2 rounded-lg bg-blue-200 text-blue-950 font-bold"
                    onClick={getDataByNF}
                >
                    Pesquisar
                </button>
            </form>
            {result.length > 0 ? (
                <ul>
                    {result.map((record) => (
                        <li key={record.NameOne__c}>
                            <p>
                                <strong>Documento:</strong> {record.NinePositionsDocumentNumber__c}
                            </p>
                            <p>
                                <strong>Endereço de Entrega:</strong> {record.EnderecoEntrega__c}
                            </p>
                            <p>
                                <strong>Bairro:</strong> {record.Neighborhood__c}
                            </p>
                            <p>
                                <strong>Nome:</strong> {record.NameOne__c}
                            </p>
                            <p>
                                <strong>Referência:</strong> {record.Referencia__c}
                            </p>
                            <p>
                                <strong>Cidade/Estado:</strong> {record.CidadeEstadoEntrega__c}
                            </p>
                            <p>
                                <strong>CEP:</strong> {record.CepEntrega__c}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}
