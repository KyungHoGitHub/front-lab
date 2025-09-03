import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import ScheduleFormContainer from "@/features/schedule/components/ScheduleFormContainer.tsx";

const ScheduleTaskAddButton =()=>{

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">일정추가</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px]">

                    {/*<DialogDescription>*/}
                    {/*    Make changes to your profile here. Click save when you&apos;re done.*/}
                    {/*</DialogDescription>*/}

              <ScheduleFormContainer onDataUpdate={null}/>

            </DialogContent>

        </Dialog>
    );
};
export default ScheduleTaskAddButton;