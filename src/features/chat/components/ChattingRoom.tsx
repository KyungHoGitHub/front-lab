import {
    InputGroup,
    InputGroupAddon, InputGroupButton,
} from '@/components/ui/input-group';
import TextareaAutosize from "react-textarea-autosize"
import {LuSendHorizontal} from "react-icons/lu";
import {useAuth} from "@/features/contexts/components/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";
const ChattingRoom = ({sendMessage, chattingRoomOnChangeSendMessage, chattingRoomOnClickSendMessage}) => {
    const {token} = useAuth();
    const decoded = jwtDecode(token);

    return (
        <div className="bottom-0 left-0 right-0 bg-background border-t shadow-sm p-3">
            <div className="grid w-full max-w-sm gap-6">
                <InputGroup>
                    <TextareaAutosize
                        value={sendMessage}
                        onChange={(e) => chattingRoomOnChangeSendMessage(e.target.value)}
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                        placeholder="Autoresize textarea..."
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupButton className="ml-auto" size="sm" onClick={() => chattingRoomOnClickSendMessage(decoded.userIdx)}
                                          variant="default">
                            <LuSendHorizontal/>
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    );
};

export default ChattingRoom;