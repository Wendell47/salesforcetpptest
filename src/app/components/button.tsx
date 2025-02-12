import { Loader, Loader2 } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
	title?: string;
	isLoading?: boolean;
	link?: string;
	children?: React.ReactNode;
	btnType?: "primary" | "secondary";
};
export default function Button({
	title,
	link,
	children,
	btnType = "primary",
	isLoading = false,
	className,
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
			className={`p-3 rounded-lg  dark:text-white font-bold flex-1 flex items-center gap-2 justify-center border  ${btnType === "primary" && "bg-blue-600 disabled:bg-neutral-400 disabled:border-neutral-500/20 dark:disabled:bg-neutral-500 dark:disabled:border-neutral-400/50 disabled:shadow-none border-blue-500/40 shadow-lg shadow-blue-600/40 hover:bg-blue-700 hover:border-blue-600/50"}  ${btnType === "secondary" && "bg-white text-black dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-900/60"} ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
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
