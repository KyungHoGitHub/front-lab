export interface TodoFormData {
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

type file = {
    idx : number;
    title : string;
}
export interface Todo extends TodoFormData{
    id : string;
    createdAt: string;
    updatedAt : string;
    fileMetaData?: file;
}