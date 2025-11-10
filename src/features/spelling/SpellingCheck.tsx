import {InputGroup, InputGroupTextarea, InputGroupButton} from "@/components/ui/input-group";
import React, {useState, useRef, useEffect} from "react";
import {ArrowUp, Copy} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {useMutation} from "@tanstack/react-query";
import {spellingCheck} from "@/features/spelling/api/spellingCheck.ts";
import InputCopyButton from "@/shared/component/common/InputCopyButton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "react-toastify";

const mockGeminiAPI = async (input: string): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(input);
        }, 1000);
    });
};

const SpellingCheck: React.FC = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const animationRef = useRef<NodeJS.Timeout | null>(null);
    const indexRef = useRef(0);
    const fullTextRef = useRef("");

    const stopAnimation = () => {
        if (animationRef.current) {
            clearInterval(animationRef.current);
            animationRef.current = null;
        }
    };

    const animateText = (text: string) => {
        stopAnimation();
        setResult("");
        fullTextRef.current = text;
        indexRef.current = 0;

        const interval = setInterval(() => {
            if (indexRef.current < fullTextRef.current.length) {
                setResult(fullTextRef.current.slice(0, indexRef.current + 1));
                indexRef.current++;
            } else {
                stopAnimation();
            }
        }, 20);

        animationRef.current = interval;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(result);
            toast.success("복사되었습니다.");
        } catch (error) {
            console.error(error);
            toast.error("실패 하였습니다.")
        }
    }


    useEffect(() => {
        return stopAnimation;
    }, []);

    const mutation = useMutation({
        mutationFn: spellingCheck,
        onSuccess: (data) => {
            console.log("API 응답:", data);
            animateText(data.data.correctedText);
        },
        onError: () => setResult("경고: 오류가 발생했습니다."),
    });

    const handleSend = () => {
        if (!text.trim()) return;
        mutation.mutate(text);
        setText("");
    };

    return (
        <div className="grid w-full max-w-sm gap-6">
            <InputGroup>
                <InputGroupTextarea
                    placeholder="수정할 내용을 입력하세요"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />

                <Separator orientation="vertical" className="!h-4"/>

                <InputGroupButton
                    variant="default"
                    className={`rounded-full transition-colors duration-200
                     ${text.trim() && !mutation.isPending ? "bg-black text-white hover:bg-gray-800" : "bg-gray-500 text-gray-100 cursor-not-allowed"}`}

                    size="icon-xs"
                    onClick={handleSend}
                    disabled={!text.trim() || mutation.isPending}
                >
                    <ArrowUp/>
                    <span className="sr-only">Send</span>
                </InputGroupButton>
            </InputGroup>

            <div
                className="mt-4 p-4 border rounded min-h-[5rem] bg-gray-50 text-sm whitespace-pre-wrap font-mono relative">
                {/* 오른쪽 상단 버튼 */}
                <Button
                    className="absolute top-2 right-2 hover:bg-green-100 transition-colors"
                    variant="outline"
                    size="icon-xs"
                    onClick={handleCopy}
                >
                    <Copy className="h-6 w-6"/>
                </Button>

                {/* 텍스트 영역 */}
                <div className="pt-6">
                    {mutation.isPending ? (
                        <span className="text-gray-400">처리중...</span>
                    ) : result ? (
                        result
                    ) : (
                        <span className="text-gray-300">결과가 여기에 표시됩니다.</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpellingCheck;