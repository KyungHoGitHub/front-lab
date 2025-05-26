export interface TodoFormData {
    title: string;
    descriptions: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}