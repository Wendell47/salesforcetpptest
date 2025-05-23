import type { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
	title: string;
	dataInfo?: string;
	isLoading?: boolean;
};

export default function Item({
	title,
	dataInfo,
	isLoading = false,
	className,
}: Props) {
	return (
		<div className={`flex gap-2 flex-col flex-auto ${className}`}>
			<span className="text-sm text-neutral-400 dark:text-neutral-500  text-medium">
				{title}
			</span>
			<div
				className={`bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/30 p-3 rounded-lg ${isLoading ? "animate-pulse" : ""}`}
			>
				{!isLoading && dataInfo}
			</div>
		</div>
	);
}
