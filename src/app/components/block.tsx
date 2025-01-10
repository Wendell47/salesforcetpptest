import { ComponentProps } from "react"

export default function Block({className,children,...rest}:ComponentProps<"div">) {
    return(
        <div className={`bg-white dark:bg-neutral-900  p-6 rounded-2xl ${className}`} {...rest}>
            {children}
        </div>
    )
}