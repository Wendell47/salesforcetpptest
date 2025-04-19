type Props = {
	title: string;
	data?: string;
	isLoading?: boolean;
};
export default function FormInput({ title, data, isLoading }: Props) {
	return (
		<>
			<label className="opacity-65" htmlFor={data}>
				{title}
			</label>
			<input
				id={data}
				defaultValue={isLoading ? "" : data}
				disabled={isLoading}
				className={` ${isLoading ? "animate-pulse bg-neutral-800 rounded-md" : ""}`}
			/>
		</>
	);
}
