'use client'
import React, { useState } from 'react';
import UserContact from './cards/ChatCard';
import { Chat } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserProvider';

export default function ChatsList({ chats }: { chats: Chat[] }) {
    const router = useRouter()
    const u = useUser()


    return (
        <div>
            {u.user.isLoggedIn && chats.map((chat) => (
                <div key={chat._id} onClick={() => router.push(`http://localhost:3000/chat/${chat._id}`)}>
                    <UserContact chat={chat} />
                </div>
            ))}

        </div>
    );
}