import React from "react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {SelectValue} from "@radix-ui/react-select";
import {useFileForm} from "@/features/lab/hooks/useFileForm.ts";


const fileFormSchema = z.object({
    fileSize: z.coerce.number().min(1, {message: "파일 크기를 입력해주세요"})
        .max(100, { message: "파일 크기는 최대 100 이하이어야 합니다" }),
    // ✅ 추가
    fileUnit: z
        .string({error: "단위를 선택해주세요"})
        .min(1, {message: "단위를 선택해주세요"}),
});

const FileForm: React.FC = () => {
    const {onSubmit} =useFileForm();
    const emailDomainOptions = [
        {label: "MB", value: "mb"},
        {label: "KB", value: "kb"},
        {label: "Byte", value: "byte"},
    ];

    const form = useForm<z.infer<typeof fileFormSchema>>({
        resolver: zodResolver(fileFormSchema),
        defaultValues: {
            fileSize: 0,
            fileUnit: "",
        },
    })


    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="fileSize"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1 flex-1">
                                    <FormLabel>파일 스펙</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ex: 100 .." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fileUnit"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-1 flex-1">
                                    <FormLabel>&nbsp;</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                console.log("emailDomain selected:", value); // 디버깅 로그
                                                field.onChange(value);
                                            }}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="파일 단위"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {emailDomainOptions.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">생성</Button>
                </form>
            </Form>
        </div>
    )
}
export default FileForm;