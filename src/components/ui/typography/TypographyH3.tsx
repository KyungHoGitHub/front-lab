interface TypographyH3Props {
    title: string;
    className?: string;
}

export function TypographyH3({title, className=""}: Readonly<TypographyH3Props>) {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
            {title}
        </h3>
    )
}
