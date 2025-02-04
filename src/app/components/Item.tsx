import type { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
	title: string;
	dataInfo: string | Date;
};

export default function Item({ title, dataInfo, className }: Props) {
	const formattedDataInfo =
		typeof dataInfo === "string"
			? dataInfo
			: dataInfo.toLocaleDateString("pt-BR");

	return (
		<div className={`flex gap-2 flex-col flex-auto ${className}`}>
			<span className="text-sm text-neutral-400 dark:text-neutral-500 text-medium">
				{title}
			</span>
			<div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
				{formattedDataInfo}
			</div>
		</div>
	);
}
