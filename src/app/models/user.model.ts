export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    isEdit?: boolean;
}