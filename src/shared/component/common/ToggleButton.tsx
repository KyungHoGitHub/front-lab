import React from "react";

interface ToggleButtonProps{
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
    classElement : string;
}
const ToggleButton: React.FC<ToggleButtonProps> = ({isOpen,setIsOpen,classElement})=>{
    const handleOnclick = () =>{
        setIsOpen((prev)=> !prev);
    };

    return(
        <button
            className={classElement}
            onClick={handleOnclick}
            >
            {isOpen? 'x':'☰'}
        </button>
    )
}
export default ToggleButton;