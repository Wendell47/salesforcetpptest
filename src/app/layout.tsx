import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import Provider from "./services/provider";
import { Analytics } from "@vercel/analytics/next";

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
		<html lang="pt-BR">
			<Provider>
				<body className={`${sarabun.className} antialiased print:p-0`}>
					{children}
					<Analytics />
				</body>
			</Provider>
		</html>
	);
}
