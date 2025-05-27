export interface TodoFormData {
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}