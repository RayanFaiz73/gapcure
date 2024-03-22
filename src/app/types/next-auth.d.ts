import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user:{
            firstName: string;
            lastName: string;
            id: number;
            name: string;
            email: string;
            image:string;
            address: string;
            zip: string;
            role: string;
            accessToken: string;
            refreshToken: string;
        }
        accessToken: string;
        refreshToken: string;
    }

    interface User{
        firstName: string;
        lastName: string;
        id: number;
        name: string;
        email: string;
        image:string;
        role:{
            id: number;
            name: string;
            permissions: Array;
        }
    }

    interface Message{
        id: number;
        sender_delete: boolean;
        receiver_delete: boolean;
        message: string;
        type: string;
        status: string;
        file_type: string | null;
        file:  string | null;
        read_at:  string | null;
        created_at:  string | null;
        updated_at:  string | null;
        deleted_at:  string | null;
        receiver: User;
        sender: User;
        self: boolean;
    }
    interface Room{
        messages: Message[];
        id: number;
        receiver: User;
        sender: User;
        lastMessage:Message;
        created_at:  string | null;
        updated_at:  string | null;
        unreadMessages: number;
    }
}