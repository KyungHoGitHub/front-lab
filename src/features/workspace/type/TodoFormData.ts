export interface TodoFormData {
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export interface Todo extends TodoFormData{
    id : string;
    createdAt: string;
    updatedAt : string;
}