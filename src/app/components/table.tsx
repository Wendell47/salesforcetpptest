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
	return <thead className="bg-neutral-900 custom-thead">{children}</thead>;
}
function Tbody({ children }: Props) {
	return <tbody className="custom-tbody  ">{children}</tbody>;
}

function Table({ children }: Props) {
	return (
		<div className="overflow-hidden rounded-lg bg-neutral-800 max-w-5xl w-full border border-neutral-700">
			<table className="min-w-full divide-y divide-neutral-700 text-left">
				{children}
			</table>
		</div>
	);
}

Table.Th = Th;
Table.Td = Td;
Table.Thead = Thead;
Table.Tbody = Tbody;

export default Table;
