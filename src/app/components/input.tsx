import type { ComponentProps } from "react";

type props = ComponentProps<"input"> & {
	title: string;
};

export default function Input({ title, className, ...rest }: props) {
	return (
		<label
			className={`flex gap-2 items-center focus-within:outline outline-2 outline-blue-300 dark:outline-blue-100 rounded-lg p-3 dark:bg-neutral-800 bg-neutral-100 w-full border border-neutral-200 dark:border-neutral-700/30 ${className}`}
		>
			<span className="font-bold text-neutral-400">{title}</span>

			<input
				id={title}
				{...rest}
				className="border-none bg-transparent outline-none w-full"
			/>
		</label>
	);
}
