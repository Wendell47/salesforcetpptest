import type { ComponentProps } from "react";

type props = ComponentProps<"div"> & {
	title: string;
	dataInfo: string | Date;
};
export default function Item({ title, dataInfo, className }: props) {
	return (
		<div className={`flex gap-2 flex-col  flex-auto ${className}`}>
			<span className="text-sm text-neutral-500 text-medium">{title}</span>
			<div className="bg-neutral-700 p-3  rounded-lg">
				{typeof dataInfo === "string"
					? dataInfo
					: dataInfo.toLocaleDateString()}
			</div>
		</div>
	);
}
