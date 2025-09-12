import React from "react";
import MailForm from "@/features/lab/components/MailForm.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ShineBorder} from "@/components/magicui/shine-border.tsx";

const MailPage:React.FC = () => {

    return(
        <div>
            <Popover>
                <PopoverTrigger>
                    <Button variant="outline">메일 팝업 열기</Button>
                </PopoverTrigger>
                <PopoverContent className="w-120">
                    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                    <MailForm/>
                </PopoverContent>
            </Popover>
        </div>
    )
}
export default MailPage;