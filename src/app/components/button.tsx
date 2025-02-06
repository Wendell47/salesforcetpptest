import { Loader, Loader2 } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
	title: string;
	isLoading?: boolean;
	link?: string;
	children?: React.ReactNode;
};
export default function Button({
	title,
	link,
	children,
	isLoading = false,
	...rest
}: Props) {
	const Link = (
		<a href={link} target="_blank" rel="noreferrer">
			{title}
		</a>
	);
	return (
		<button
			type="button"
			className="p-3 rounded-lg bg-blue-600 text-white font-bold flex-1 flex items-center gap-2 justify-center  disabled:bg-neutral-400 dark:disabled:bg-neutral-500 hover:bg-blue-700"
			{...rest}
		>
			{children}
			{link ? (
				Link
			) : isLoading ? (
				<Loader2 size={24} className="animate-spin" />
			) : (
				title
			)}
		</button>
	);
}
