type props = {
	title: string;
	dataInfo: string;
};
export default function Item({ title, dataInfo }: props) {
	return (
		<div className="flex gap-2 flex-col  flex-auto">
			<span className="text-sm text-neutral-500 text-medium">{title}</span>
			<div className="bg-neutral-700 p-3  rounded-lg">{dataInfo}</div>
		</div>
	);
}