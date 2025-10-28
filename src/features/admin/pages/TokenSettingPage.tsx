import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {LuSend, LuUserRoundPen} from "react-icons/lu";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {postTokenPolicy} from "@/features/admin/api/admin.ts";

const formSchema = z.object({
    accessTokenExp:  z.coerce.number().min(1, {message: "유효시간을 입력해주세요"}),
    refreshTokenExp:  z.coerce.number().min(1, {message: "유효시간을 입력해주세요"}),
});

type FormValues = z.infer<typeof formSchema>

const TokenSettingPage:React.FC =()=>{

    const form  = useForm<FormValues>({
       resolver: zodResolver(formSchema),
       defaultValues:{
           accessTokenExp: 0,
           refreshTokenExp: 0,
       },
    });

    const onSubmit = async (formData)=>{
        const data ={
            accessTokenExp : formData.accessTokenExp * 600000,
            refreshTokenExp : formData.refreshTokenExp * 600000
        }
        try{
            const res = await postTokenPolicy(data)
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div className="flex justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 bg-white p-6  w-full max-w-md"
                >
                    <FormField
                        control={form.control}
                        name="accessTokenExp"
                        render={({field}) => (
                            <FormItem className="flex flex-col space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-700">엑세스 토큰 유효시간 (분)</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="시간을 입력하세요"
                                        {...field}
                                    />

                                </FormControl>
                                <FormMessage className="text-xs text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="refreshTokenExp"
                        render={({field}) => (
                            <FormItem className="flex flex-col space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-700">리프레쉬 토큰 유효시간 (분)</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="시간을 입력하세요"
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
                        등록
                    </Button>
                </form>
            </Form>
        </div>
    )
}
export default  TokenSettingPage;