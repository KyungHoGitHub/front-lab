import {useCallback, useState} from "react";

// 반환 타입
type UseToggleReturn = {
    value: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
}

/* useToggle
*  ON / OFF 토글 처리시 사용
* */
const useToggle = (initialValue = false): UseToggleReturn => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => setValue((prev) => !prev), []);
    const setTrue = useCallback(()=> setValue(true),[]);
    const setFalse = useCallback(()=> setValue(false),[]);

    return {value,toggle,setTrue,setFalse}
};

export default useToggle;