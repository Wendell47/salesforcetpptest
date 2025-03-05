
import type { Metadata } from "next";
import { Sarabun } from "next/font/google";

import "./globals.css";

import Provider from "./services/provider";

const sarabun = Sarabun({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "NF - Consulta",
	description: "Consultar NF de forma simples",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
		<Provider>
		<body className={`${sarabun.className} antialiased print:p-0`}>
				{children}
			</body>
			</Provider>
		</html>
	);
}
