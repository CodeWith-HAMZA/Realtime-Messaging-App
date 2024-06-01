"use client";
import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

import AllUsers from "./AllUsers";
import { MdAdd } from "react-icons/md";
interface Props {
  triggerElem: ReactNode;
}
export default function CreateNewChat({ triggerElem }: Props) {
  return (
    <>
      <Drawer>
        <DrawerTrigger>{triggerElem}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Connect The Whole World</DrawerTitle>
            <DrawerDescription>The Place, Where You All Can Connect And Share Moments</DrawerDescription>
          </DrawerHeader>
          <div className="flex dark:bg-black bg-white dark:text-white flex-col h-full">
            <AllUsers />
          </div>

          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
