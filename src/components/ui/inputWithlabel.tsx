import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel({label,inputType,id,placeholder}) {
    return (
        <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">{label}</Label>
            <Input type={inputType} id={id} placeholder={placeholder} />
        </div>
    )
}
