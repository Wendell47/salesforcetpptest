import { useEffect, useState } from "react";

export const useLocalStorage = (Name: string) => {
	const [storage, setStorage] = useState<string>("");
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const savedSignature = localStorage.getItem(Name);
		if (savedSignature) {
			setStorage(savedSignature);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(Name, storage);
	}, [storage, Name]);

	return { storage, setStorage };
};
