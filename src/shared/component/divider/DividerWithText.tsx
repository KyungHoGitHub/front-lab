import React, {ReactNode} from "react";

interface DividerWithTextProps {
    children?: ReactNode;
}

const DividerWithText =({children}:DividerWithTextProps) =>{
    return (
        <div className="flex items-center gap-3 text-gray-400 my-4">
            <div className="flex-1 border-t border-gray-300" />
            {children && <span className="whitespace-nowrap">{children}</span>}
            <div className="flex-1 border-t border-gray-300" />
        </div>
    );
};
export default DividerWithText;