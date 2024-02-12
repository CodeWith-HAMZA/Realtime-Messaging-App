import { PageProps } from "@/.next/types/app/(root)/page";
import Chat from "@/components/Chat";
import UserService from "@/services/userServices";
import { hit } from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: PageProps) {
  const chatId: string = params.id;
  let chatDetails; 
  const userServices = new UserService(cookies().get("Authorization")?.value);
  const res = await userServices.getProfile();
  console.log(res);

  return <Chat chatDetails={null} userData={res.user} />;
}
