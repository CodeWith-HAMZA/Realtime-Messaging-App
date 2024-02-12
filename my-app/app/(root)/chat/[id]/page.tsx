import { PageProps } from '@/.next/types/app/(root)/page'
import Chat from '@/components/Chat'
import { hit } from '@/utils/api'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page({ params }: PageProps) {


    const chatId: string = params.id;
    let chatDetails;

    try {
        chatDetails = await hit('http:localhost:4000/api/chat/' + chatId, { method: "GET" });

    } catch (error) {

    }


    return (
        <Chat chatDetails={chatDetails ? chatDetails.data : null} />
    )
}
