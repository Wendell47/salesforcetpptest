import type { ComponentProps } from "react";

export default function Block({
	className,
	children,
	...rest
}: ComponentProps<"div">) {
	return (
		<div
			className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl ${className}`}
			{...rest}
		>
			{children}
		</div>
	);
}
