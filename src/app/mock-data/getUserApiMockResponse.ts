import { User } from "../models/user.model";

export const getUserApiMockResponse: User[] = [
    {
        id: "a4664973-7f63-4276-a1ec-cc0fd39eb823",
        firstName: "priya",
        lastName: "sharma",
        email: "smtanwar@gmail.com",
        isActive: false
    },
    {
        id: "9706463d-a0b2-48d9-bbb4-89ab354b7fa6",
        firstName: "sandeep",
        lastName: "tanwar",
        email: "psharma@gmail.com",
        isActive: false
    },
    {
        id: "783ff7a5-e59c-48a2-a807-da92909be328",
        firstName: "guddu",
        lastName: "tanwar",
        email: "gtanwar@gmail.com",
        isActive: true
    },
    {
        id: "d59ed7b8-62d7-4d4f-a16e-c4205f2247f7",
        firstName: "kinnu",
        lastName: "tanwar",
        email: "ktanwar@gmail.com",
        isActive: true
    }
];