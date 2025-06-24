import React from "react";

import "./BaseModal.css";

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-postit" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} >X</button>
                {children}
            </div>
        </div>
    );
};
export default BaseModal