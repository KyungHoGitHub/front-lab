import React from "react";
import './Statistic.css'
import GenericFormModal from "../../test/components/GenericFormModal.tsx";
import TestForm from "../../test/components/TestForm.tsx";
// Statistic 컴포넌트의 Props 타입 정의
interface StatisticProps {
    title: string;               // 제목
    value: number | string;      // 표시할 값
    prefix?: React.ReactNode;    // 값 앞에 붙는 요소 (선택적)
    suffix?: React.ReactNode;    // 값 뒤에 붙는 요소 (선택적)
    precision?: number;          // 소수점 자리수 (선택적)
    className?: string;          // 추가적인 CSS 클래스 (선택적)
}

const Statistic:React.FC<StatisticProps> = ({title,
                                                value,
                                                prefix,
                                                suffix,
                                                precision,
                                                className = '',})=>{
    const formatValue = (val: number | string): string => {
        if (typeof val === 'number' && precision !== undefined) {
            return val.toFixed(precision);
        }
        return val.toString();
    };

    return (
        <>        <div className={`custom-statistic ${className}`}>
            <div className="custom-statistic-title">{title}</div>
            <div className="custom-statistic-content">
                {prefix && <span className="custom-statistic-prefix">{prefix}</span>}
                <span className="custom-statistic-value">{formatValue(value)}</span>
                {suffix && <span className="custom-statistic-suffix">{suffix}</span>}
            </div>

        </div>
    {/*<GenericFormModal*/}
    {/*    title="test"*/}
    {/*    isOpen={true}*/}
    {/*    FormComponent={TestForm}*/}
    {/*    onClose={() => console.log('닫기')}*/}
    {/*/>*/}
        </>

    );
};

export default Statistic