import { PageProps } from '@/.next/types/app/(root)/page'
import Chat from '@/components/Chat'
import { hit } from '@/utils/api'
import React from 'react'

export default async function page({ params }: PageProps) {


    const chatId: string = params.id;

    const chatDetails: Chat = await hit('http:localhost:4000/api/chat/' + chatId, { method: "GET" });
    console.log("first")

    return (
        <Chat chatDetails={chatDetails} />
    )
}
