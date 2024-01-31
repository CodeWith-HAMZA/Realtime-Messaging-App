'use client'
import React, { useState } from 'react';
import UserContact from './cards/UserCard';
import { Chat } from '@/utils/types';
import { useRouter } from 'next/navigation';

export default function ChatsList({ chats }: { chats: Chat[] }) {
    const router = useRouter()


    return (
        <div>
            {chats.map((chat) => (
                <div key={chat._id} onClick={() => router.push(`http://localhost:3000/chat/${chat._id}`)}>
                    <UserContact chat={chat} />
                </div>
            ))}

        </div>
    );
}