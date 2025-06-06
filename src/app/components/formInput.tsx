import type{ ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
	title: string;
	data?: string;
	isLoading?: boolean;
};
export default function FormInput({
	title,
	data,
	isLoading,
	className,
	...rest
}: Props) {
	return (
		<>
			<label className="opacity-65" htmlFor={data}>
				{title}
			</label>
			<input
				id={data}
				defaultValue={isLoading ? "" : data}
				disabled={isLoading}
				className={` ${isLoading ? "animate-pulse  w-full dark:bg-neutral-800 bg-neutral-200 rounded-md" : ""} ${className}`}
				{...rest}
			/>
		</>
	);
}
