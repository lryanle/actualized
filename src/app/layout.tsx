import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";

const opensans = Open_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "AIAIO",
	description: "Turning designs and simple logic into prototypes, quickly.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<JotaiProvider>
			<html lang="en">
				<body className={`${opensans.className} antialiased`}>{children}</body>
			</html>
		</JotaiProvider>
	);
}
