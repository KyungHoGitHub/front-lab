import React from "react";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import InputCopyButton from "@/shared/component/common/InputCopyButton.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postUrlShort} from "@/features/lab/api/urlShort.ts";


const urlFormSchema = z.object({
    urlString: z.string().min(2, {message: '이름은 최소 1자 이상이어야 합니다.'}),
});

type UrlFormType = z.infer<typeof urlFormSchema>;

const UrlShort: React.FC = () => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof urlFormSchema>>({
        resolver: zodResolver(urlFormSchema),
        defaultValues: {
            urlString: "",
        }
    });

    const mutation = useMutation({
        mutationFn: (payload: UrlFormType) => postUrlShort(payload),
        onSuccess: (data) =>{
            queryClient.invalidateQueries({ queryKey: ['shorten'] });
            form.reset();
        }
        }
    )

    const onSubmit = (values: UrlFormType) => {
        mutation.mutate(values);
    };



    return (
        <div className="flex flex-col space-y-5">
            <Form {...form}>
                <div className="flex flex-row">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="urlString"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-3 flex-1">
                                    <FormLabel>URL 정보</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-row gap-2 w-[800px]">
                                            <Input className="w-3/4" placeholder="줄이려는 URL 경로 입력" {...field} />
                                            <Button type="submit" className="w-1/4">줄이기</Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </form>
                </div>
            </Form>

            <div>
                <InputCopyButton data={mutation.data?.data}/>
            </div>


        </div>
    )
}
export default UrlShort;