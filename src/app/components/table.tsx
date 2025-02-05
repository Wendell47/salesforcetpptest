import type { ReactNode } from "react";
import "../styles/componentsStyles.css";

type Props = {
	children: ReactNode;
};
const Th = ({ title }: { title: string }) => {
	return <th>{title}</th>;
};

const Td = ({ content }: { content: string }) => {
	return (
		<td className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
			{content}
		</td>
	);
};
function Thead({ children }: Props) {
	return <thead className="bg-neutral-800 [&_th]:custom-th">{children}</thead>;
}
function Tbody({ children }: Props) {
	return <tbody className="[&_td]:custom-td">{children}</tbody>;
}

function Table({ children }: Props) {
	return (
		<div className="overflow-hidden rounded-lg bg-neutral-600">
			<table className="min-w-full divide-y divide-gray-200">{children}</table>
		</div>
	);
}

Table.Th = Th;
Table.Td = Td;
Table.Thead = Thead;
Table.Tbody = Tbody;

export default Table;
