import type { ComponentProps } from "react";

type props = ComponentProps<"input"> & {
	title: string;
};

export default function Input({ title, className, ...rest }: props) {
	return (
		<label
			className={`flex gap-2 items-center focus-within:outline outline-2 outline-cyan-100 rounded-lg p-3 bg-neutral-700 w-full ${className}`}
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
