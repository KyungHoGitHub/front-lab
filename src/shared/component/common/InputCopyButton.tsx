import React from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Copy} from "lucide-react";
import {toast} from "react-toastify";

const InputCopyButton: React.FC = ({data}: string) => {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(data);
            toast.success("복사되었습니다.");
        } catch (error) {
            console.error(error);
            toast.error("실패 하였습니다.")
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Input className="text-blue-600" value={data} readOnly/>
            <Button className="hover:bg-green-300 transition-colors" variant="outline" onClick={handleCopy}>
                <Copy className="h-4 w-4"/> 복사하기
            </Button>
        </div>
    )
}

export default InputCopyButton;