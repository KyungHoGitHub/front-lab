import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Field, FieldContent, FieldLabel} from "@/components/ui/field";
import {TiArrowBackOutline} from "react-icons/ti";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import React, {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {FaAngleDown, FaAngleRight} from "react-icons/fa6";
import {AnimatePresence, motion} from "framer-motion";
import {Label} from "@/components/ui/label.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getAllTermsList, termsForm} from "@/features/login/api/login.ts";

interface TermsItem {
    id : string;
    key: string;          // React key 또는 유니크 ID
    title: string;        // 약관 제목
    description?: string; // 요약/설명
    required?: boolean;   // 필수 여부
}

interface TermsFormValues {
    terms: Record<string,boolean>;
}

const TermsModal = () => {
    const form = useForm({});
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // 모달에 사용하는 문자열 목록
    const textList = {
        cardTitle: "약관동의",
        cardDescriptions: `
        서비스 이용을 위한 최초 1회의 약관 동의와 개인정보 수집에 대한 
        동의가 필요합니다.
        `,
        cardFooterButtonTitle: "동의하고 계속하기",
        tooltipTitle: "뒤로가기",
        agreeAllTitle: "이용약관,개인정보 수집에 모두 동의합니다. (선택동의 포함)",
    };

    // const termsList: TermsItem[] = [
    //     {
    //         key: "privacy",
    //         title: "개인정보 수집 및 이용",
    //         description: "당사는 회원가입 및 서비스 이용 과정에서 개인정보를 수집합니다...",
    //         required: true,
    //     },
    //     {
    //         key: "public",
    //         title: "자사 서비스 개인 정보 사용 동의 및 이용",
    //         description: "당사는 회원가입 및 서비스 이용 과정에서 개인정보를 수집합니다...",
    //         required: true,
    //     },
    //     {
    //         key: "marketing",
    //         title: "마케팅 정보 수신 동의",
    //         description: "서비스 관련 정보 및 이벤트 안내를 받는 것에 동의합니다.",
    //         required: false,
    //     },
    //     {
    //         key: "advertisement",
    //         title: "광고 정보 동의",
    //         description: "서비스 관련 정보 및 이벤트 안내를 받는 것에 동의합니다.",
    //         required: false,
    //     },
    // ];

    const getTermsList = async () => {
        const res = await getAllTermsList();
        return  res.data;
    };

    const {data , isLoading, isError} = useQuery({
        queryKey: ["TermsList"],
        queryFn : getTermsList,
        staleTime : 1000 * 60 * 10,
    });

    const submitTerms = async  (payload: { id: string; agreed: boolean }[])  =>{
        const res = await termsForm(payload);
        return res.data;
    }

    const mutation = useMutation({
        mutationFn: submitTerms,
        onSuccess: (data) =>{
            console.log('서버응답', data)
        },
        onError: (error)=>{
            console.error('서버 에러', error)
        }
    })

    const onSubmit = (formValues: TermsFormValues) => {
        // RHF에서 얻은 값 (terms.privacy, terms.public ...)
        console.log("약관동의 폼 데이터 확인", formValues);

        // 서버에 전송할 형태로 변환
        const payload = {
            terms: data.map(item => ({
                id: item.id,
                agreed: formValues.terms?.[item.key] ?? false,
            }))
        };
        mutation.mutate(payload); // ← 서버로 전송
        console.log("서버 전송 데이터", payload);
    };

    if (isLoading) return <p>약관 정보 불러오는중~~~</p>
    if (isError) return  <p>약관 정보 불러오기 실패</p>

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="p-7">
                    <div className="flex items-center mb-15">
                        <div className="w-5/6">
                            <CardHeader className="p-0">
                                <CardTitle className="text-lg">{textList.cardTitle}</CardTitle>
                                <CardDescription className="whitespace-pre-line">{textList.cardDescriptions}</CardDescription>
                            </CardHeader>
                        </div>
                        <div className="w-1/6 flex justify-end">
                            <Tooltip>
                                <TooltipTrigger>
                                    <CardAction>
                                        <div className="group">
                                            <Button onClick={(e)=>{
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setIsOpen(false);
                                            }} variant="outline" size="icon"
                                                    className="rounded-full hover:bg-red-100 transition-colors">
                                                <TiArrowBackOutline
                                                    className="group-hover:text-red-500 transition-colors"
                                                    size={24}/>
                                            </Button>
                                        </div>
                                    </CardAction>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    {textList.tooltipTitle}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="agreeAll"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex items-center gap-9 mb-3">
                                            <Checkbox
                                                id="agreeAll"
                                                checked={field.value}
                                                onCheckedChange={(v) => {
                                                    field.onChange(v);
                                                    data.forEach((item) => {
                                                        form.setValue(`terms.${item.key}`, v);
                                                    });
                                                }}
                                                className="w-5 h-5  data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 col-span-1"
                                            />
                                            <Label className="text-medium font-semibold text-gray-800" htmlFor="terms">
                                                {textList.agreeAllTitle}
                                            </Label>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Separator className="my-2"/>
                        {data.map((item) => (
                            <FormField
                                key={item.key}
                                control={form.control}
                                name={`terms.${item.key}`}
                                render={({field}) => (
                                    <TermsAgreementFiledItem
                                        key={item.key}
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        required={item.required}
                                        checked={field.value ?? false}
                                        onChange={(field.onChange)}
                                    />
                                )}
                            />
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            {textList.cardFooterButtonTitle}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}
export default TermsModal;

interface TermsAgreementFiledItemProps {
    title: string;
    required?: boolean;
    description?: string;
    id: string;
    onChange: (checked: boolean) => void; // 체크 상태 변경 콜백
    checked?: boolean;
}

const TermsAgreementFiledItem: React.FC<TermsAgreementFiledItemProps> = ({
                                                                             title,
                                                                             description,
                                                                             required = false,
                                                                             id,
                                                                             onChange,
                                                                             checked = false,
                                                                         }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Field orientation="horizontal" className="block">
            <div className="grid grid-cols-10 items-center w-full mb-1">
                <Checkbox
                    className="w-5 h-5  data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 col-span-1"
                    id={id}
                    checked={checked}
                    onCheckedChange={(v) => onChange(!!v)}
                />
                <div className="col-span-8">
                    <FieldContent>
                        <FieldLabel htmlFor="finder-pref-9k2-sync-folders-nep">
                            <FieldLabelTitle title={title} required={required}/>
                        </FieldLabel>
                    </FieldContent>
                </div>
                <div className="col-span-1 flex justify-end">
                    <Button type="button" variant="outline" size="icon" className="rounded-full border-0"
                            onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaAngleDown/> : <FaAngleRight/>}
                    </Button>
                </div>
            </div>
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: "auto", opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            className="overflow-hidden"
                        >
                            <ScrollArea className="h-72 w-136 rounded-md border">
                                <div className="p-4">
                                    <div>{description}</div>
                                </div>
                            </ScrollArea>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </Field>
    )
}

const FieldLabelTitle = ({
                             title,
                             required,
                         }: {
    title: string;
    required?: boolean;
}) => (
    <FieldLabel>
    <span className={required ? "text-red-600 font-bold" : "text-gray-500"}>
      {required ? "(필수) " : "(선택) "}
    </span>
        {title}
    </FieldLabel>
);