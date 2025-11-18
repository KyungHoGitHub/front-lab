import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";


const ChatContainer = () => {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[1000px] max-w-md rounded-lg border md:min-w-[680px]"
        >
            <ResizablePanel defaultSize={340}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Sidebar</span>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={340}>
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Content</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default ChatContainer;