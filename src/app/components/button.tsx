import { Loader, Loader2 } from "lucide-react";
import { ComponentProps } from "react";

type Props = ComponentProps<"button">&{
    title:string,
    isLoading?:boolean,
    link?:string
}
export default function Button({title,link,isLoading=true,...rest}:Props) {

    const Link = <a href={link} target="_blank">{title}</a>
    return(
        <button
        type="button"
        className="p-2 rounded-lg bg-blue-600 text-white font-bold flex-1 flex items-center justify-center  disabled:bg-neutral-400 dark:disabled:bg-neutral-500"
        {...rest}
    >
        {link ? Link:isLoading?<Loader2 size={24} className="animate-spin"/>:title}

    </button>
    )
}