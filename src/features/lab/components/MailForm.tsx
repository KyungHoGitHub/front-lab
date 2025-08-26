import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';
import {Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {FormField} from "@/components/ui/form.tsx";

import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Input} from "@/components/ui/input.tsx";
import {LuHighlighter, LuMailPlus, LuSend, LuUserRound, LuUserRoundPen} from "react-icons/lu";
import confetti from "canvas-confetti";

const formSchema = z.object({
    name: z.string().min(2, {message: '이름은 최소 2자 이상이어야 합니다.'}),
    email: z.string().email({message: '유효한 이메일 주소를 입력하세요.'}),

});

// 추론된 타입 (TypeScript 안전성)
type FormValues = z.infer<typeof formSchema>

const MailForm: React.FC = () => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    const onSubmit = async (values: FormValues) => {
        console.log("들어옴>")
        try {
            // EmailJS send 메서드 호출 (템플릿 파라미터 직접 전달)
            const response = await emailjs.send(
                "service_qhnasqn", // SERVICE_ID (환경 변수)
                "template_0r6b0g1", // TEMPLATE_ID
                {
                    name: values.name, // 템플릿 플레이스홀더와 맞춤
                    email: values.email,
                    message: values.message | null,
                },
                {
                    publicKey: "NIMmFpznMmIFIJ3G8", // PUBLIC_KEY
                }
            );

            console.log('이메일 전송 성공!', response.status, response.text);
            alert('이메일이 성공적으로 전송되었습니다.');

            confetti({
                particleCount: 150,
                spread: 70,
                origin: {y: 0.6},
            });
            form.reset(); // 폼 초기화
        } catch (error) {
            console.error('전송 실패:', error);
            alert('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="flex justify-center ">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 bg-white p-6  w-full max-w-md"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem className="flex flex-col space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-700"><LuUserRoundPen/>이름</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="이름을 입력하세요"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className="flex flex-col space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-700"><LuMailPlus/>이메일</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="example@email.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({field}) => (
                            <FormItem className="flex flex-col space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-700"><LuHighlighter/>메시지</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                                        placeholder="메시지를 입력하세요"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-blue-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                    >
                        <LuSend/>보내기
                    </Button>
                </form>
            </Form>
        </div>
    );
}
export default MailForm;