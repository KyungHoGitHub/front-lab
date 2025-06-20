import React from "react";

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}

                 onClick={onClose}>
            </div>
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                minWidth: '300px',
            }} onClick={e => e.stopPropagation()}>
            </div>
            <button onClick={onClose}>X</button>
            {children}

        </>
    )
}
export default BaseModal