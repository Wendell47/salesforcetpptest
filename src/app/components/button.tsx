import { Loader, Loader2 } from "lucide-react";
import { ComponentProps } from "react";

export default function Button({title,isLoading=true,...rest}:ComponentProps<"button">&{title:string,isLoading?:boolean}) {
    return(
        <button
        type="button"
        className="p-2 rounded-lg bg-blue-600 text-white font-bold flex-1 flex items-center justify-center  disabled:bg-neutral-400 dark:disabled:bg-neutral-500"
        {...rest}
    >
        {isLoading?<Loader2 size={24} className="animate-spin"/>:title}
    </button>
    )
}