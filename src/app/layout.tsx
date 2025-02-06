import type { Metadata } from "next";
import { Sarabun } from "next/font/google";

import localFont from "next/font/local";
import "./globals.css";

const sarabun = Sarabun({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
});
const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
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
			<body className={`${sarabun.className} antialiased print:p-0`}>
				{children}
			</body>
		</html>
	);
}
