
import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';


export default function AllUsers() {
    return (
        <>

            <Drawer>
                <DrawerTrigger>
                    <Button className='w-full'>New</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col h-full">
                        <div className="px-4 py-2">
                            <Input className="w-full" placeholder="Search contacts..." />
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-4 py-2">
                                <h2 className="text-lg font-semibold">Contacts</h2>
                            </div>
                            <div className="px-4 py-2 border-t">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage alt="@johndoe" src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-sm font-medium truncate">John Doe</h2>
                                        <p className="text-sm text-gray-500 truncate">Online</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 border-t">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-sm font-medium truncate">Jane Doe</h2>
                                        <p className="text-sm text-gray-500 truncate">Offline</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 border-t">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage alt="@alexsmith" src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>AS</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-sm font-medium truncate">Alex Smith</h2>
                                        <p className="text-sm text-gray-500 truncate">Online</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-2 border-t">
                            <Button className="w-full">New Chat</Button>
                        </div>
                    </div>

                    <DrawerFooter>
                        {/* <Button>Submit</Button> */}
                        <DrawerClose>
                            <Button variant="outline" className='w-full'>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
    )
}
