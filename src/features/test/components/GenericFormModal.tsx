import React from "react";
import BaseModal from "./BaseModal.tsx";

interface GenericFormModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    defaultValues?: T;
    FormComponent: React.FC<{ onSubmit: (data: T) => void; defaultValues?: T }>;
    onSubmit: (data: T) => void;
}

const GenericFormModal: React.FC = <T, >({
                                             isOpen,
                                             onClose,
                                             title,
                                             FormComponent,
                                             defaultValues,
                                             onSubmit,
                                         }: GenericFormModalProps<T>) => {


    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>{title}</h2>
            <FormComponent onSubmit={(data)=> {onSubmit(data); onClose();}} defaultValues={defaultValues}/>
        </BaseModal>
    )
}
export default GenericFormModal;