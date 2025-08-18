interface TypographyH2Props {
    title: string;
    className?: string;
}

export function TypographyH2({title, className=""}: Readonly<TypographyH2Props>) {
    return (
        <h3 className={`scroll-m-20 text-3xl font-semibold tracking-tight ${className}`}>
            {title}
        </h3>
    )
}