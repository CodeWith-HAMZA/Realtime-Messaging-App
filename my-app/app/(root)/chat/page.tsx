import Chat from '@/components/Chat'
import UserService from '@/services/userServices'
import { cookies } from 'next/headers'
import React from 'react'

export default async function page() {
  const userServices = new UserService(cookies().get("Authorization")?.value)
  const res = await userServices.getProfile()
  console.log(res)
  return <Chat userData={res.user} />
}
